import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../common/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //エラーメッセージ
  errorMessage: any

  constructor(private router: Router,
    private authService: AuthService,
    private messageService: MessageService){}

    ngOnInit(): void {
    //ngOninit
  }

  async login(form: NgForm): Promise<void> {
    const { email, password } = form.value;
    try {
      await this.authService.login(email, password)
      .then(() => this.router.navigateByUrl('/'));
    } catch (error: any) {
      //alert(error.code)
      this.errorMessage = this.messageService.getErrorMessageJapanese(error.code)
    }
  }
}
