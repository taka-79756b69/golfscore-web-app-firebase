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

  //登録しているメールアドレス
  accountEmail: any

  /**
   * 初期処理
   */
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.accountEmail = this.authServie.getAccountEmail()
  }

  /**
   * アカウント削除
   * @TODO GCPのFirebaseの拡張機能でユーザー削除に連動してFirestoreのデータを削除している。
   */
  acountDelete() {
    console.log("[log] DELETE USER ACCOUNT: "+getAuth().currentUser?.uid);
    this.authServie.deleteUser()
  }
}
