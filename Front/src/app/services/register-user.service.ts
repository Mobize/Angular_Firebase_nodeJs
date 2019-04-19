import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

import {Router} from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  // baseUrl = 'http://localhost:7080/api';
  // users: User[];

  // url = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  // getUsers() {
  //   return this
  //     .http
  //     .get(`${this.url}/users`);
  // }

//   getAll(): Observable<User[]> {
//     return this.http.get(`${this.baseUrl}/list`).pipe(
//       map((res) => {
// // tslint:disable-next-line: no-string-literal
//         this.users = res['data'];
//         return this.users;
//     }),
//     catchError(this.handleError));
//   }

//   private handleError(error: HttpErrorResponse) {
//     console.log(error);

//     // return an observable with a user friendly message
//     return throwError('Error! something went wrong.');
//   }
}
