import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // auth = firebase.auth();
  // userDoc: AngularFirestoreDocument<User>;
  // data: Observable<User>;

  constructor(private afs: AngularFirestore) { }

  // getDataUser(id: any): Observable<User> {
  //   this.userDoc = this.afs.doc<User>('Users/' + id);
  //   this.data = this.userDoc.valueChanges();
  //   return this.data;
  // }
}
