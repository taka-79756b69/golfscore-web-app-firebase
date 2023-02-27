import { getAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private authServie: AuthService,
  ){}

  acountDelete() {
    console.log("LOG DELETE USER ACCOUNT: "+getAuth().currentUser?.uid);
    this.authServie.deleteUser()
  }
}
