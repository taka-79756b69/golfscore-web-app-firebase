import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Injectable, Optional } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { Auth } from '@angular/fire/auth';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { FirebaseAuth } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: FirebaseAuth,
    private auth2: Auth) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    signOut(this.auth);
  }

  getAuthState() {
    return authState(this.auth2);
  }

  createUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
}
