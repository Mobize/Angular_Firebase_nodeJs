import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) { }

  auth = firebase.auth();

  ngOnInit() {

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // this.dataService.getDataUser(this.auth.currentUser.uid).subscribe((response) => {
        //   this.dataUser = response;
        //   // console.log(this.dataUser);
        // });
      }
    });

  }

}
