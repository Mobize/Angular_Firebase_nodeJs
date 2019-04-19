import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  durationInSeconds = 2;
  auth = firebase.auth();

  constructor(private snackBar: MatSnackBar, private db: AngularFirestore) {}

  openSnackBar() {
// tslint:disable-next-line: no-use-before-declare
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }

  openSnackBarLogout() {
    // tslint:disable-next-line: no-use-before-declare
        this.snackBar.openFromComponent(SnackBarLogoutComponent, {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'top'
        });
      }

  // getDocs() {
  //   const document: AngularFirestoreDocument<any> = this.db.doc('Users/' + this.auth.currentUser.uid);
  //   const document$: Observable<any> = document.valueChanges();
  //   document$.subscribe((data) => {
  //     this.dataUser = data;
  //     this.emailUser = data.email;
  //     this.displayName = data.displayName;
  //     this.isAdmin = data.isAdmin;
  //     this.isPasswordChanged = data.isPasswordChanged;
  //   });
  // }

  ngOnInit() {
    // this.getDocs();
  }
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackBar.component.html',
  styles: [`
    .example-pizza-party {
      color: white;
      display: flex;
    }
  `],
})
export class SnackBarComponent {

  userName = firebase.auth().currentUser.displayName;

}

@Component({
  selector: 'app-snackbar2',
  templateUrl: './snackBarLogout.component.html',
  styles: [`
    .example-pizza-party {
      color: white;
      display: flex;
    }
  `],
})
export class SnackBarLogoutComponent {

}
