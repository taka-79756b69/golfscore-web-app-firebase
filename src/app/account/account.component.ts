import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../common/message/message.service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  //エラーメッセージ
  errorMessage: any

  //ローディング
  loading: any

  //登録しているメールアドレス
  accountEmail: any

  //
  confirm = true

  constructor(private router: Router,
    private authService: AuthService,
    private messageService: MessageService){
  }

  model = {
    email: this.authService.getAccountEmail()
  }

  ngOnInit(): void {
    //ngOninit
  }

  /**
   * 認証処理
   * @param form 画面入力フォーム
   */
  async login(form: NgForm): Promise<void> {

    this.loading = true
    this.confirm = true

    const { email, password } = form.value;
    try {
      await this.authService.login(email, password)
        .then(() =>
          this.loading = false
        )
      this.confirm = false
      this.errorMessage = ""
    } catch (error: any) {
      this.loading = false
      this.errorMessage = this.messageService.getErrorMessageJapanese(error.code)
    }
    this.loading = false
  }

  /**
   * アカウント削除
   * @TODO GCPのFirebaseの拡張機能でユーザー削除に連動してFirestoreのデータを削除している。
   */
  acountDelete() {
    console.log("[log] DELETE USER ACCOUNT: "+getAuth().currentUser?.uid);
    this.authService.deleteUser()
  }
}
