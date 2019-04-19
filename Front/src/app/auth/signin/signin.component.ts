import { RedirectComponent } from './../../redirect/redirect.component';
import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface DialogData {
  emailUser: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;
  errorPasswordResetMessage: string;
  hidePassword = true;
  auth = firebase.auth();
  emailUser: string;
  sendEmail: boolean;
  isAuth: boolean;
  isLoadingCircle = false;
  isWaitingCircle = false;
  UserPassword: boolean;
  dataUsers;
  dataUserFirestore;
  emailUserFirestore;
  displayNameFirestore;
  isAdminFirestore;
  isPasswordChangedFirestore;
  authInfo: Observable<firebase.User>;

  constructor(private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              private redirect: RedirectComponent,
              private db: AngularFirestore) {
                this.authInfo = this.afAuth.authState;
               }

  openDialog(): void {
// tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '450px',
      height: '160px',
      data: {emailUser: this.emailUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.emailUser = result;
      this.isLoadingCircle = true;
      if (this.emailUser != null) {
        this.auth.sendPasswordResetEmail(this.emailUser).then(() => {
          this.isLoadingCircle = false;
          this.sendEmail = true;
        }).catch((error) => {
          this.isLoadingCircle = false;
          this.sendEmail = false;
          console.log(error);
          if (error.code === 'auth/user-not-found') {
            this.errorPasswordResetMessage = 'Aucun compte utilisateur avec l\'adresse email suivante: ' + this.emailUser;
          } else if (error.code === 'auth/invalid-email') {
            this.errorPasswordResetMessage = 'L\'adresse email est incorrecte: ' + this.emailUser;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.initForm();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]]
    });
  }

  getDocs() {
    const document: AngularFirestoreDocument<any> = this.db.doc('Users/' + this.auth.currentUser.uid);
    const document$: Observable<any> = document.valueChanges();
    document$.subscribe((data) => {
      this.dataUserFirestore = data;
      this.emailUserFirestore = data.email;
      this.displayNameFirestore = data.displayName;
      this.isAdminFirestore = data.isAdmin;
      this.isPasswordChangedFirestore = data.isPasswordChanged;
    });
    console.log(this.isPasswordChangedFirestore);
  }

    googleSignIn() {
      this.authService.googleLogin().then(() => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              const document: AngularFirestoreDocument<any> = this.db.doc('Users/' + this.auth.currentUser.uid);
              const document$: Observable<any> = document.valueChanges();
              document$.subscribe((data) => {
                if (data.isPasswordChanged) {
                  if (this.auth) {
                    this.redirect.openSnackBar();
                    this.router.navigate(['/choose-application']);
                  }
                } else {
                    this.router.navigate(['/change-password']);
                }
              });
            }
          }
        );
      });
    }

   onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.isWaitingCircle = true;

    this.authService.signInUser(email, password).then(
      () => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              const document: AngularFirestoreDocument<any> = this.db.doc('Users/' + this.auth.currentUser.uid);
              const document$: Observable<any> = document.valueChanges();
              document$.subscribe((data) => {
                if (data.isPasswordChanged) {
                  if (this.auth) {
                    this.redirect.openSnackBar();
                    this.router.navigate(['/choose-application']);
                  }
                } else {
                    this.router.navigate(['/change-password']);
                }
              });
            }
          }
        );
      },
      (error) => {
        this.isWaitingCircle = false;
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          // tslint:disable-next-line: max-line-length
          this.errorMessage = 'Erreur: Il n\'y a pas d\'enregistrement d\'utilisateur correspondant à cet identifiant. L\'utilisateur peut avoir été supprimé.';
        } else if (error.code === 'auth/wrong-password') {
          this.errorMessage = 'Erreur: Identifiant et/ou mot de passe incorrect';
        } else if (error.code === 'auth/user-disabled') {
          this.errorMessage = 'Erreur: Le compte utilisateur à été désactivé par un administrateur';
        }
      }
    );
  }
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {

  emailToResetPassword = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return this.emailToResetPassword.hasError('required') ? 'Vous devez entrer un email' :
        this.emailToResetPassword.hasError('email') ? 'L\' email n\'est pas valide ' : '';
  }

}
