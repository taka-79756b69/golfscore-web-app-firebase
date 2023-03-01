import { getAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(
    private authServie: AuthService,
  ){}

  accountEmail: any

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.accountEmail = this.authServie.getAccountEmail()
  }

  acountDelete() {
    console.log("LOG DELETE USER ACCOUNT: "+getAuth().currentUser?.uid);
    this.authServie.deleteUser()
  }
}
