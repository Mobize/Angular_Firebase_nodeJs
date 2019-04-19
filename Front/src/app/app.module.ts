import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent, ResetPasswordComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { ChangePasswordComponent, DialogComponent, DialogInfoComponent } from './user/changePasswordComponent';
import { LoaderComponent } from './loader.component';
import { RedirectComponent, SnackBarComponent, SnackBarLogoutComponent } from './redirect/redirect.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { DataService } from './services/data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'change-password', canActivate: [AuthGuardService], component: ChangePasswordComponent },
  { path: 'choose-application', canActivate: [AuthGuardService], component: RedirectComponent },
  { path: 'user-profile', canActivate: [AuthGuardService], component: UserProfileComponent },
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/signin' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ChangePasswordComponent,
    HeaderComponent,
    DialogComponent,
    DialogInfoComponent,
    ResetPasswordComponent,
    LoaderComponent,
    RedirectComponent,
    SnackBarComponent,
    SnackBarLogoutComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule
  ],
  providers: [AuthService, AuthGuardService, DataService, RedirectComponent],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, DialogInfoComponent, ResetPasswordComponent, SnackBarComponent, SnackBarLogoutComponent]
})
export class AppModule { }
