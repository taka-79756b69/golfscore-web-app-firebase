import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { getAuth } from '@angular/fire/auth';
import { SnackbarService } from 'src/app/common/snackbar/snackbar.service';

@Component({
  selector: 'app-scorelist1pt',
  templateUrl: './scorelist1pt.component.html',
  styleUrls: ['./scorelist1pt.component.scss']
})
export class Scorelist1ptComponent implements OnInit {

  //DBから取得した値のかたまり(ドキュメント)
  score: any

  //各プレーヤーのスコア(ドキュメント)
  score1: any

  //各プレーヤーのパットスコア(ドキュメント)
  putscore1: any

  //コースNo(ドキュメント)
  no: any[] = new Array()

  //人数(ドキュメント)
  player: any

  /**
   * 一人目を意味するインデックス
   */
  _index_name1 = 0

  //プレイヤー識別用のインデックスを格納する配列
  playerArray: any[] = new Array()

  //コース番号
  courseIndex: any

  //OUTTOTAL
  outTotal1: any

  //INTOTAL
  inTotal1: any

  //TOTAL
  total1: any

  //フォームデータ
  checkoutForm: any

  //オーダーフラグ
  orderError: any

  // 購読設定停止用
  private subscriptions = new Subscription();

  //ドキュメントID
  _id: any

  //メモ
  memo: any

  //プレイ中のコースインデックス
  nowPlaying = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private snackbarService: SnackbarService
    ){
    }

  /**
   * 初期処理
   */
  ngOnInit(): void {

    //RouterのパラメータからscoreIdを取得
    this.activatedRoute.paramMap.subscribe(params => {
      this._id = params.get("scoreId")!
      this.getScoreDocument(this._id)
    })

    //ページの更新前に確認メッセージを出す
    window.addEventListener("beforeunload", function (e) {
      let confirmationMessage = "\o/";
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
  });
  }

  /**
   * 初期データを設定
   * @param data Firestoreドキュメントデータ
   */
  setInitParam(data: any){

    this.score1 = data.score1
    this.putscore1 = data.putscore1
    this.player = data.player
    this.no = data.no
    this.playerArray.push(this._index_name1)
    this.memo = data.memo ?? ""
    this.displayUpdate()
  }

  /**
   * ダイアログを表示するときの対象を設定する
   * @param val コースNo
   */
  setDialogIndex(val: number){
    this.courseIndex = val
  }

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
   * ドキュメント取得処理
   * FirestoreからドキュメントIDをキーにして取得する
   * @param _id ドキュメントID
   */
  getScoreDocument(_id: string){
    this.subscriptions.add(
      this.getSubcollection(getAuth().currentUser?.uid || '', 'scores').doc(_id).valueChanges().subscribe(data => {
        this.score = data
        this.setInitParam(data)
        //console.log("[log] " + new Date() + " GET Firestore Document: " + "ID=" + _id + " DATA=" + JSON.stringify(data))
        console.log("[log] " + new Date() + " GET Firestore Document: " + "ID=" + _id + " DATA=" + data)
        // unsubscribe
        this.execUnsubscribe()
      })
    )
  }

  /**
   * コンポーネントの破棄
   */
  ngOnDestroy() {
    // unsubscribe
    this.execUnsubscribe()
  }

  /**
   * Subscribeの停止
   */
  execUnsubscribe(){
    // 購読を停止する
    console.log("[log] " + new Date() + " unsubscribe => (scorelist1pt.component)")
    this.subscriptions.unsubscribe()
  }

  /**
   * スコアのカウントアップ(プラス1)
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounter1Up(courseNo: any, playerIndex: any){

    if(this.score1[courseNo] < 15 )
      this.score1[courseNo]++
  }

  /**
   * スコアのカウントアップ(プラス3)
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounter5Up(courseNo: any, playerIndex: any){

    if(this.score1[courseNo] < 15 )
      this.score1[courseNo] = this.score1[courseNo] + 5 > 15 ? 15 : this.score1[courseNo] + 5
  }

  /**
   * スコアのカウントダウン（マイナス1）
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounter1Down(courseNo: any, playerIndex: any){

    if(this.score1[courseNo] > 0 )
      this.score1[courseNo]--
  }

  /**
   * スコアのカウントダウン（マイナス3）
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounter5Down(courseNo: any, playerIndex: any){

    if(this.score1[courseNo] > 0 )
      this.score1[courseNo] = this.score1[courseNo] - 5 < 0 ? 0 : this.score1[courseNo] - 5
  }

  /**
   * パターのカウントアップ(プラス1)
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setPutscoreCounter1Up(courseNo: any, playerIndex: any){

    if(this.putscore1[courseNo] < 15 )
      this.putscore1[courseNo]++
  }

  /**
   * パターのカウントダウン（マイナス1）
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setPutscoreCounter1Down(courseNo: any, playerIndex: any){

    if(this.putscore1[courseNo] > 0 )
      this.putscore1[courseNo]--
  }

  /**
   * ダイアログを閉じるタイミングの処理
   * /トータルスコアの更新/
   * /オリンピックの更新/
   * /ラスベガスの更新/
   * /打順の更新/
   */
  displayUpdate() {
    // changes.prop contains the old and the new value...
    this.outTotal1 = this.setOutTotal1()
    this.inTotal1 = this.setInTotal1()
    this.total1 = this.setTotal1()

    this.setBadgeOrder()
  }

  /**
   * 各ホールのスコア入力ダイアログを閉じた時の処理
   */
  closeInputDialog() {

    this.displayUpdate()
    this.snackbarService.openSnackBar("スコアを一覧に反映しました")
    this.saveScore()
  }

  /**
   * スコアをFirestoreに保存する
   */
  saveScore() {
    this.onSubmit()
  }

  /**
   * 設定画面の内容を反映
   */
  setSettings(){

    this.displayUpdate()
    this.snackbarService.openSnackBar("設定内容を反映しました")
    this.saveScore()
  }

  /**
   * 打順のバッジを表示する処理
   */
  setBadgeOrder() {

    for (let i=0; i<=17; i++) {

      //最初のコースの場合、手入力した値をバッジにセット
      if(i == 0){
        this.nowPlaying = 0
      } else {
        if (this.score1[i-1] != 0) {
          //前のコースが入力済み
          this.nowPlaying = i
        }
      }
    }
  }

  /**
   * プレイヤー1のINとOUTの合計を計算
   * @returns INとOUTの合計スコア
   */
  setTotal1() {
    return this.setOutTotal1() + this.setInTotal1()
  }

  /**
   * プレイヤー1のOUTの合計を計算
   * @returns OUTの合計スコア
   */
  setOutTotal1() {
    let outTotal = 0
    for (let i = 0; i <= 8; i++){
      outTotal += this.score1[i]
    }
    return outTotal
  }

  /**
   * プレイヤー1のINの合計を計算
   * @returns INの合計スコア
   */
  setInTotal1() {
    let inTotal = 0
    for (let i = 9; i <= 17; i++){
      inTotal += this.score1[i]
    }
    return inTotal
  }

  /**
   * フォームsubmit処理
   * 入力内容をFirestoreに上書きする
   * Subscribeできないため、try-catchでエラーをハンドリングする
   */
  onSubmit() {

    // リクエスト送信用にJSON作成
    this.checkoutForm = ({
      score1: this.score1,
      putscore1: this.putscore1,
      memo: this.memo
    });

    try {
      this.getSubcollection(getAuth().currentUser?.uid || '', 'scores').doc(this._id).update(this.checkoutForm)
      console.log("[log] " + new Date() + " POST Firestore Document: " + "scores/" + this._id)
    } catch (error) {
      console.log("[log] " + new Date() + " POST Error: " + error)
      this.snackbarService.openSnackBar("スコアの保存に失敗しました")
    }
  }
}
