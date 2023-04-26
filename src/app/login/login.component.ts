import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../common/message/message.service';
import { serverTimestamp } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //エラーメッセージ
  errorMessage: any

  //ローディング
  loading: any

  constructor(private router: Router,
    private authService: AuthService,
    private messageService: MessageService){}

    ngOnInit(): void {
    //ngOninit
  }

  async login(form: NgForm): Promise<void> {
    this.loading = true
    const { email, password } = form.value;
    try {
      await this.authService.login(email, password)
      .then(() => this.router.navigateByUrl('/'));
      console.log("[log] " + new Date() + " LOGIN ACCOUNT: " + email);
    } catch (error: any) {
      this.loading = false
      this.errorMessage = this.messageService.getErrorMessageJapanese(error.code)
    }
    this.loading = false
  }
}
