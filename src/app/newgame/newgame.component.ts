import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user';

export class MyDateAdapter extends NativeDateAdapter {
  override getDateNames(): string[] {
    return [...Array(31).keys()].map((i) => String(i + 1));
  }
}

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.scss']
})
export class NewgameComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('ja-JP');
  }

  //modelの初期化
  user: User = { name1: '', name2: '', name3: '', name4: '', playDate: new Date(), courseName: '', player: 0, inout: 0 };
  //NgFormの作成
  form!: NgForm;
  //保存ダイアログ用のフラグ
  saving: any
  //バリデーション
  validate = true
  //プレイヤー人数
  player = 0

  /**
   * フォーム入力内容で新規作成
   * 空のスコア入力データをDBに作成する。
   * @param form
   */
  onSubmit(form: any) {

    //alert("保存を開始します。「保存完了」が表示されるまで待ってください。")
    this.saving = true
    //MongoDBの仕様で、日付の保存時にISODate型かつUTC保存するため、日付がずれてしまうため
    //9時間プラスして保存する
    form.value.playDate = form.value.playDate.setHours(form.value.playDate.getHours() + 9)

    if(form.value.name1 != ''){
      this.player++
    }
    if(form.value.name2 != ''){
      this.player++
    }
    if(form.value.name3 != ''){
      this.player++
    }
    if(form.value.name4 != ''){
      this.player++
    }

  }

  /**
   * 画面リロード
   * 新規作成したデータを取得してrouterでスコア入力画面に遷移する。
   */
  reload(){

  }

  /**
   * 入力チェックを実施
   * 最低入力人数3人をチェックする。
   * エラーの状態では「プレイ開始」を押せないようにしている。
   * @param name1 お名前1
   * @param name2 お名前2
   * @param name3 お名前3
   */
  inputCheck(name1: any, name2: any, name3: any) {

    this.validate = true
    if(name1 == "" || name2 == "" || name3 == ""){
      //console.log("error")
    } else {
      this.validate = false
    }
  }
}
