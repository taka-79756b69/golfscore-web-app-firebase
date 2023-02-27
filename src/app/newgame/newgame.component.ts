import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from "firebase/firestore"
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from './user';
import { getAuth } from '@angular/fire/auth';

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
    private router: Router,
    private firestore: AngularFirestore,
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

  //フォーム
  checkoutForm: any

  //作成後のドキュメントID
  createdDocId: any

  // 購読設定停止用
  private subscriptions = new Subscription();

  /**
   * firestoreからドキュメントを取得
   * ドキュメント内でユーザーID毎にドキュメントIDを割り当てて
   * サブコレクションとしてスコア一覧を取得する想定
   * @param parentDocId ドキュメントID（＝ユーザーID）
   * @param subcollectionName サブコレクション名
   * @returns 取得したサブコレクションの一覧
   */
  getSubcollection(parentDocId: string, subcollectionName: string) {
    return this.firestore
      .collection('members')
      .doc(parentDocId)
      //.collection(subcollectionName, ref => ref.orderBy('timestamp', 'desc'))
      .collection(subcollectionName)
      //.snapshotChanges()
  }

  /**
   * フォーム入力内容で新規作成
   * 空のスコア入力データをDBに作成する。
   * @param form
   */
  onSubmit(form: any) {

    this.saving = true

    //1000で割って日付を保存
    let savePlayDate = form.value.playDate / 1000

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

    // リクエスト送信用にJSON作成
    this.checkoutForm = ({

      name1: form.value.name1,
      name2: form.value.name2,
      name3: form.value.name3,
      name4: form.value.name4,
      courseName: form.value.courseName,
      player: this.player,
      playDate: savePlayDate,
      order1st: [0,0,0,0],
      no: (form.value.inout ?
        ["10th","11th","12th","13th","14th","15th","16th","17th","18th","1st","2nd","3rd","4th","5th","6th","7th","8th","9th"]
        : ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th"]),
      score1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      score2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      score3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      score4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lasvegas1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lasvegas2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lasvegas3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lasvegas4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      olympic1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      olympic2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      olympic3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      olympic4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      timestamp: serverTimestamp()
    });

    this.saving = true
    try {
      this.getSubcollection(getAuth().currentUser?.uid || '', 'scores').add(this.checkoutForm).then(result =>{
        console.log('POST Firestore New Document: ID=' + result.id)
        this.createdDocId = result.id
      })
    } catch (error) {
      this.saving = false
      console.log('POST Error: '+error)
    }
  }

  /**
   * 画面リロード
   * 新規作成したデータを取得してrouterでスコア入力画面に遷移する。
   */
  reload(){
    this.router.navigate(["score/" + this.player + "/"+this.createdDocId])
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
