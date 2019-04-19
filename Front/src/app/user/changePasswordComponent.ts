import { User } from '../models/user.model';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/custom-validators';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './password-change.html',
  styleUrls: ['./password-change.css']
})
export class ChangePasswordComponent implements OnInit {

  user = firebase.auth().currentUser;
  updatePasswordForm: FormGroup;
  errorMessage: string;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  auth = firebase.auth();


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public dialog1: MatDialog,
              public dialog2: MatDialog) {
                this.openDialogInfo();
              }

  // updatePasswordFirestore() {
  //   this.db.doc('Users/' + this.auth.currentUser.uid).update({isPasswordChanged : true});
  // }

  // Confirmation de changement de mot de passe
  openDialogConfirmation(): void {
  // tslint:disable-next-line: no-use-before-declare
      const dialogRef = this.dialog1.open(DialogComponent, {
        width: '300px',
        position: {top: '330px' }
      });

      dialogRef.afterClosed().subscribe(result => {
        // window.location.href = 'https://lexing.law/registre/login';
        this.router.navigate(['/choose-application']);
      });
  }

  // Information de la necessité de changer le mot de passe
  openDialogInfo() {
    // const document: AngularFirestoreDocument<any> = this.db.doc('Users/' + this.auth.currentUser.uid);
    // const document$: Observable<any> = document.valueChanges();
    // document$.subscribe((data) => {
    //   if (!data.isPasswordChanged) {
    //     const showPopUp = localStorage.getItem('isPopUpShow');
    //     if (showPopUp !== 'oui') {
    //       // tslint:disable-next-line: no-use-before-declare
    //       const dialogRefInfo = this.dialog2.open(DialogInfoComponent, {
    //         width: '300px',
    //         position: {top: '330px' }
    //       });
    //       dialogRefInfo.afterClosed().subscribe(result => {
    //         localStorage.setItem('isPopUpShow', 'oui');
    //       });
    //     }
    //   }
    // });
  }

  initForm() {
    this.updatePasswordForm = this.formBuilder.group({
      password: [ null , Validators.compose([
        // Champs obligatoire
        Validators.required,
        // Verification qu'il s'agit d'un nombre
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // Verification qu'il s'agit dune lettre majuscule
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // Verification qu'il s'agit dune lettre minuscule
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // Caractere speciale
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters: true}),
        // Minimum 8 caractères
        Validators.minLength(8)])
      ],
      confirmPassword: [null, Validators.compose([Validators.required])]
    },
    {
      // Verification de la concordance des deux mots de passe
      validator: CustomValidators.passwordMatchValidator
    });

  }

  updatePassword() {
    const password = this.updatePasswordForm.get('password').value;
    const confirmPassword = this.updatePasswordForm.get('confirmPassword').value;

    if (password === confirmPassword) {
      this.isLoading = true;
      firebase.auth().currentUser.updatePassword(password).then(
        () => {
        // confirmation du changement de mot de passe
        this.openDialogConfirmation();
        // Modification du champ de la bdd firestore
        // this.updatePasswordFirestore();
        this.isLoading = false;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else {
        alert('Vos 2 mot de passes ne sont pas identiques');
    }
  }

  ngOnInit() {
    this.initForm();
    // localStorage.getItem('isPopUpShow');
    const test = localStorage.getItem('isPasswordChanged');
    // console.log(test);
    // this.dataService.getDataUser(this.auth.currentUser.uid).subscribe((response) => {
    //   this.dataUser = response;
    // });
  }

}

@Component({
  selector: 'app-dialog1',
  templateUrl: './dialogConfirmPasswordChanged.html',
})
export class DialogComponent {

  constructor(public dialogRefConfirm: MatDialogRef<DialogComponent>) {}

  onClick(): void {
    this.dialogRefConfirm.close();
  }

}

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialogInfoPassword.html',
})
export class DialogInfoComponent {

  constructor(public dialogRefInfo: MatDialogRef<DialogInfoComponent>) {}

  onClick(): void {
    this.dialogRefInfo.close();
  }

}



