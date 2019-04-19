import { User } from './../models/user.model';
import { UserAuth } from './../models/userAuth.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLocal: User;
  googleUserProfile;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
  }

  //  updateUserData(user) {
  //   user = firebase.auth().currentUser;
  //   user.updateProfile({
  //     photoURL: this.googleUserProfile.picture
  //   });
  // }

  // private oAuthLogin(provider) {
  //   return firebase.auth().signInWithPopup(provider)
  //     .then((credential) => {
  //       this.googleUserProfile = credential.additionalUserInfo.profile;
  //       this.updateUserData(credential.user);
  //     });
  // }

  // googleLogin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   return this.oAuthLogin(provider);
  // }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
    localStorage.removeItem('isPasswordChanged');
  }

}
