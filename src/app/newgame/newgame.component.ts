import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from "firebase/firestore"
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { SnackbarService } from 'src/app/common/snackbar/snackbar.service';

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.scss']
})
export class NewgameComponent {

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private snackberService: SnackbarService
    ) {
  }

  //ローディング
  loading: any

  //初期化
  name1 = ''
  name2 = ''
  name3 = ''
  name4 = ''
  playDate = ''
  courseName = ''
  player = 0
  inout = 0

  //NgFormの作成
  form!: NgForm;

  //バリデーション
  validate = true

  //フォーム
  checkoutForm: any

  //作成後のドキュメントID
  createdDocId: any

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
      .collection(subcollectionName)
  }

  /**
   * フォーム入力内容で新規作成
   * 空のスコア入力データをDBに作成する。
   */
  async onSubmit() {

    this.loading = true

    //1000で割って日付を保存
    let savePlayDate = this.playDate

    if(this.name1 != ''){
      this.player++
    }
    if(this.name2 != ''){
      this.player++
    }
    if(this.name3 != ''){
      this.player++
    }
    if(this.name4 != ''){
      this.player++
    }

    // リクエスト送信用にJSON作成
    this.checkoutForm = ({

      name1: this.name1,
      name2: this.name2,
      name3: this.name3,
      name4: this.name4,
      courseName: this.courseName,
      player: this.player,
      playDate: savePlayDate,
      order1st: [0,0,0,0],
      no: (this.inout ?
        ["10th","11th","12th","13th","14th","15th","16th","17th","18th","1st","2nd","3rd","4th","5th","6th","7th","8th","9th"]
        : ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th"]),
      score1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      score2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      score3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      score4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      putscore1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      putscore2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      putscore3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      putscore4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lasvegas1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lasvegas2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lasvegas3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lasvegas4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      olympic1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      olympic2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      olympic3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      olympic4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      nearping1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      nearping2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      nearping3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      nearping4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      rate: 100,
      timestamp: serverTimestamp(),
      isOlyNearping: false,
      isLas2stories: false,
      isLasPair: false,
    });

    try {
      await this.getSubcollection(getAuth().currentUser?.uid || '', 'scores').add(this.checkoutForm).then(result =>{
        console.log("[log] " + new Date() + " POST Firestore New Document: ID=" + result.id)
        this.createdDocId = result.id
      })
      this.snackberService.openSnackBar("データを作成しました")
      this.reload()
    } catch (error) {
      console.log("[log] " + new Date() + " POST Error: " + error)
      this.snackberService.openSnackBar("データの作成に失敗しました")
    }
    this.loading = false
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
  inputCheck() {

    this.validate = true
    if(this.name1 == "" || this.playDate == ""){
      //console.log("error")
    } else {
      this.validate = false
    }
  }
}
