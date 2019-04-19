import { User } from './../models/user.model';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  userDoc: AngularFirestoreDocument<User>;
  data: Observable<User>;
  auth = firebase.auth();
  isAdmin: boolean;
  displayAdmin: string;
  isPasswordChanged: boolean;
  displayIsPasswordChanged: string;
  loadingCircle = true;
  displayName: string;
  emailUser: string;
  tokenId: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.data = this.dataService.getDataUser(this.auth.currentUser.uid);
    this.data.subscribe((response) => {
      this.loadingCircle = false;
      this.isAdmin = response.isAdmin;
      this.displayName = response.displayName;
      this.emailUser = response.email;
      this.isPasswordChanged = response.isPasswordChanged;
      if (this.isAdmin) {
        this.displayAdmin = 'Oui';
      } else {
        this.displayAdmin = 'Non';
      }
      if (response.isPasswordChanged) {
        this.displayIsPasswordChanged = 'Oui';
      } else {
        this.displayIsPasswordChanged = 'Non';
      }
    });

    this.auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
      // Send token to your backend via HTTPS
      this.tokenId = idToken;
      console.log(this.tokenId);
    }).catch((error) => {
      // Handle error
    });
  }
}
