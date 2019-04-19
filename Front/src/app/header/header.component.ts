import { DataService } from './../services/data.service';
import { RedirectComponent } from './../redirect/redirect.component';
import { AuthService } from './../services/auth.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  auth = firebase.auth();
  photoUrl;

  constructor(private authService: AuthService,
              private logout: RedirectComponent,
               ) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.photoUrl = this.auth.currentUser.photoURL;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
    this.logout.openSnackBarLogout();
  }

}
