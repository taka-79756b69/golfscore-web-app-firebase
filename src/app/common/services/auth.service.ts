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
    console.log("[log] login complete");
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    console.log("[log] logout complete");
    return this.afAuth.signOut();
  }

  getAuthState() {
    return this.afAuth.authState
  }

  createUser(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  async deleteUser(){
    await getAuth().currentUser?.delete()
  }

  getAccountEmail() {
    return getAuth().currentUser?.email
  }
}
