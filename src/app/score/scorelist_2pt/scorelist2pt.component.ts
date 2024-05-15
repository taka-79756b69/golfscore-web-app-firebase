import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { getAuth } from '@angular/fire/auth';
import { SnackbarService } from 'src/app/common/snackbar/snackbar.service';

@Component({
  selector: 'app-scorelist2pt',
  templateUrl: './scorelist2pt.component.html',
  styleUrls: ['./scorelist2pt.component.scss']
})
export class Scorelist2ptComponent implements OnInit {

  //DBから取得した値のかたまり(ドキュメント)
  score: any

  //各プレーヤーのスコア(ドキュメント)
  score1: any
  score2: any

  //各プレーヤーのパットスコア(ドキュメント)
  putscore1: any
  putscore2: any

  //コースNo(ドキュメント)
  no: any[] = new Array()

  //人数(ドキュメント)
  player: any

  /**
   * 一人目を意味するインデックス
   */
  _index_name1 = 0
  /**
   * 二人目を意味するインデックス
   */
  _index_name2 = 1

  //プレイヤー識別用のインデックスを格納する配列
  playerArray: any[] = new Array()

  //コース番号
  courseIndex: any

  //オーダーバッジ
  order = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  //打順（初回手入力分）
  order1st: any

  //OUTTOTAL
  outTotal1: any
  outTotal2: any

  //INTOTAL
  inTotal1: any
  inTotal2: any

  //TOTAL
  total1: any
  total2: any

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
    this.score2 = data.score2
    this.putscore1 = data.putscore1
    this.putscore2 = data.putscore2
    this.player = data.player
    this.no = data.no
    this.order1st = data.order1st
    this.playerArray.push(this._index_name1, this._index_name2)

    //2023年3月以降追加分はDBに項目がないためundifinedになる
    //undifinedの場合、初期値を設定する
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
    console.log("[log] " + new Date() + " unsubscribe => (scorelist2pt.component)")
    this.subscriptions.unsubscribe()
  }

  /**
   * スコアのカウントアップ(プラス1)
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounter1Up(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.score1[courseNo] < 15 )
          this.score1[courseNo]++
        break
      case this._index_name2:
        if(this.score2[courseNo] < 15 )
          this.score2[courseNo]++
        break
      default:
        break
    }
  }

  /**
   * スコアのカウントアップ(プラス3)
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounter5Up(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.score1[courseNo] < 15 )
          this.score1[courseNo] = this.score1[courseNo] + 5 > 15 ? 15 : this.score1[courseNo] + 5
        break
      case this._index_name2:
        if(this.score2[courseNo] < 15 )
          this.score2[courseNo] = this.score2[courseNo] + 5 > 15 ? 15 : this.score2[courseNo] + 5
        break
      default:
        break
    }
  }

  /**
   * スコアのカウントダウン（マイナス1）
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounter1Down(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.score1[courseNo] > 0 )
          this.score1[courseNo]--
        break
      case this._index_name2:
        if(this.score2[courseNo] > 0 )
          this.score2[courseNo]--
        break
      default:
        break
    }
  }

  /**
   * スコアのカウントダウン（マイナス3）
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounter5Down(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.score1[courseNo] > 0 )
          this.score1[courseNo] = this.score1[courseNo] - 5 < 0 ? 0 : this.score1[courseNo] - 5
        break
      case this._index_name2:
        if(this.score2[courseNo] > 0 )
          this.score2[courseNo] = this.score2[courseNo] - 5 < 0 ? 0 : this.score2[courseNo] - 5
        break
      default:
        break
    }
  }

  /**
   * パターのカウントアップ(プラス1)
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setPutscoreCounter1Up(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.putscore1[courseNo] < 15 )
          this.putscore1[courseNo]++
        break
      case this._index_name2:
        if(this.putscore2[courseNo] < 15 )
          this.putscore2[courseNo]++
        break
      default:
        break
    }
  }

  /**
   * パターのカウントダウン（マイナス1）
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setPutscoreCounter1Down(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.putscore1[courseNo] > 0 )
          this.putscore1[courseNo]--
        break
      case this._index_name2:
        if(this.putscore2[courseNo] > 0 )
          this.putscore2[courseNo]--
        break
      default:
        break
    }
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
    this.outTotal2 = this.setOutTotal2()
    this.inTotal2 = this.setInTotal2()
    this.total1 = this.setTotal1()
    this.total2 = this.setTotal2()

    //undifinedになる可能性があるものは置き換える
    this.chipsUndefinedReplace()
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
   * プレイヤー1のINとOUTの合計を計算
   * @returns INとOUTの合計スコア
   */
  setTotal1() {
    return this.setOutTotal1() + this.setInTotal1()
  }
  /**
   * プレイヤー2のINとOUTの合計を計算
   * @returns INとOUTの合計スコア
   */
  setTotal2() {
    return this.setOutTotal2() + this.setInTotal2()
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
   * プレイヤー2のOUTの合計を計算
   * @returns OUTの合計スコア
   */
  setOutTotal2() {
    let outTotal = 0
    for (let i = 0; i <= 8; i++){
      outTotal += this.score2[i]
    }
    return outTotal
  }

  /**
   * プレイヤー2のINの合計を計算
   * @returns INの合計スコア
   */
  setInTotal2() {
    let inTotal = 0
    for (let i = 9; i <= 17; i++){
      inTotal += this.score2[i]
    }
    return inTotal
  }

  /**
   * 打順のバッジを表示する処理
   */
  setBadgeOrder() {

    let p1point: any
    let p2point: any

    this.courseIndex = 0

    //最初の打順設定が完了していない場合は、エラーフラグを立てる
    if(this.order1st[this._index_name1] == undefined || this.order1st[this._index_name2] == undefined) {
        this.orderError = true
    } else if (+this.order1st[this._index_name1] + +this.order1st[this._index_name2] != 3) {
        this.orderError = true
    } else {
      this.orderError = false
    }

    //重複除いた配列の長さが3以外はエラーとする
    if (Array.from(new Set(this.order1st)).length != 3) {
      this.orderError = true
    }

    for (let i=0; i<=17; i++) {

      p1point = 0
      p2point = 0

      //先頭からループ
      //処理前に初期化
      this.order[i][this._index_name1] = 0
      this.order[i][this._index_name2] = 0

      //最初のコースの場合、手入力した値をバッジにセット
      if(i == 0){
        if(!this.orderError){
          this.setBagdeOrder(i, this.order1st[this._index_name1], this.order1st[this._index_name2])
          this.nowPlaying = 0
        }
      } else {
        //最初のコース以外の場合、スコアを見て判定する
        if (this.score1[i-1] == 0 || this.score2[i-1] == 0) {
            //前のコースの打数が未入力0の場合は、バッジは出さない
            this.order[i][this._index_name1] = 0
            this.order[i][this._index_name2] = 0
          }

        if (this.score1[i-1] != 0 && this.score2[i-1] != 0) {
            //前のコースが入力済み、かつ
            //前のコースのバッジが表示済みの場合、バッジを表示
            if (this.order[i-1][this._index_name1] != 0 && this.order[i-1][this._index_name2] != 0) {
                //バッジ上書きできるように最初にクリアしておく
                this.order[i][this._index_name1] = 0
                this.order[i][this._index_name2] = 0
                p1point = +this.score1[i-1] * 10 + +this.order[i-1][this._index_name1]
                p2point = +this.score2[i-1] * 10 + +this.order[i-1][this._index_name2]
                this.nowPlaying = i
              }

            this.setBagdeOrder(i, p1point, p2point)
          }
      }
    }
  }

  /**
   * バッジを設定する処理
   * 打順のバッジとラスベガスのチーム色をセットする
   * @param trgt
   * @param p1point
   * @param p2point
   */
  setBagdeOrder(trgt:any, p1point:any, p2point:any) {

    if(p1point < p2point){
      this.order[trgt][this._index_name1] = 1
      this.order[trgt][this._index_name2] = 2
    }else{
      this.order[trgt][this._index_name1] = 2
      this.order[trgt][this._index_name2] = 1
    }
  }

  /**
   * フォームsubmit処理
   * 入力内容をFirestoreに上書きする
   * Subscribeできないため、try-catchでエラーをハンドリングする
   */
  onSubmit() {

    //オーダーが未設定の場合undefinedになるため
    //undifinedの場合は、0に置き換えてから保存する
    for(let i=0; i<=2; i++) {
      if (this.order1st[i] == undefined){
        this.order1st[i] = 0
      }
    }

    // リクエスト送信用にJSON作成
    this.checkoutForm = ({
      order1st: this.order1st,
      score1: this.score1,
      score2: this.score2,
      putscore1: this.putscore1,
      putscore2: this.putscore2,
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

  /**
   * undifinedを初期値に置き換える
   * CHIPSコンポーネントは値未選択にするとundifinedになるため初期値に置き換える
   */
  chipsUndefinedReplace(){
    //オーダーが未設定の場合undefinedになるため
    //undifinedの場合は、0に置き換えてから保存する
    for(let i=0; i<=this.player; i++) {
      if (this.order1st[i] == undefined){
        this.order1st[i] = 0
      }
    }
  }
}
