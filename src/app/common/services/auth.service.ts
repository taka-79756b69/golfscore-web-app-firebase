import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth
    ) {}

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  getAuthState() {
    return this.afAuth.authState
  }

  createUser(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  deleteUser(){
    return getAuth().currentUser?.delete()
  }

  getAccountEmail() {
    return getAuth().currentUser?.email
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
  }
}
