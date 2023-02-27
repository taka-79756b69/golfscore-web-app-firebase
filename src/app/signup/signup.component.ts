import { getAuth } from '@angular/fire/auth';
import { MessageService } from './../common/message/message.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'ac-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  //エラーメッセージ
  errorMessage: any

  ngOnInit(): void {
    //ngOninit
  }

  async signup(form: NgForm): Promise<void> {
    const { email, password } = form.value;
    try {
      await this.authService.createUser(email, password)
        .then(() => this.router.navigateByUrl('/'))
    } catch (error: any) {
      //alert(error.code)
      this.errorMessage = this.messageService.getErrorMessageJapanese(error.code)
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log("LOG SIGNUP uid: " + getAuth().currentUser?.uid)
  }
}
