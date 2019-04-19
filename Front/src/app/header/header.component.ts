import { DataService } from './../services/data.service';
import { RedirectComponent } from './../redirect/redirect.component';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  photoUrl: string;
  constructor(private authService: AuthService, private logout: RedirectComponent, private dataService: DataService ) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          const idUser = firebase.auth().currentUser;
          const dataUser = this.dataService.getDataUser(idUser.uid);
          dataUser.subscribe((response) => {
            this.photoUrl = response.photoURL;
            console.log(response.photoURL);
          })
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
