import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-scorelist3pt',
  templateUrl: './scorelist3pt.component.html',
  styleUrls: ['./scorelist3pt.component.scss']
})
export class Scorelist3ptComponent implements OnInit {

  //DBから取得した値のかたまり(ドキュメント)
  score: any

  //各プレーヤーのスコア(ドキュメント)
  score1: any
  score2: any
  score3: any

  //各プレーヤーのオリンピック(ドキュメント)
  olympic1: any
  olympic2: any
  olympic3: any

  //コースNo(ドキュメント)
  no: any[] = new Array()

  //人数(ドキュメント)
  player: any

  //プレーヤー識別用のインデックス
  _index_name1 = 0
  _index_name2 = 1
  _index_name3 = 2

  //プレイヤー識別用のインデックスを格納する配列
  playerArray: any[] = new Array()

  //コース番号
  courseIndex: any

  //オーダーバッジ
  order = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  //打順（初回手入力分）
  order1st: any

  //OUTTOTAL
  outTotal1: any
  outTotal2: any
  outTotal3: any

  //INTOTAL
  inTotal1: any
  inTotal2: any
  inTotal3: any

  //TOTAL
  total1: any
  total2: any
  total3: any

  //OLYMPIC
  olympicTotal1: any
  olympicTotal2: any
  olympicTotal3: any

  //OLYMPIC（レート反映後）
  olympicTotal1_rated = 0
  olympicTotal2_rated = 0
  olympicTotal3_rated = 0

  //レート
  rateValue = 0

  //フォームデータ
  checkoutForm: any

  //保存確認フラグ
  saving: any

  //オーダーフラグ
  orderError: any

  // 購読設定停止用
  private subscriptions = new Subscription();

  //ドキュメントID
  _id: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore
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
      console.log("log : beforeunload");
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
    this.score3 = data.score3
    this.olympic1 = data.olympic1
    this.olympic2 = data.olympic2
    this.olympic3 = data.olympic3
    this.player = data.player
    this.no = data.no
    this.order1st = data.order1st
    this.playerArray.push(this._index_name1, this._index_name2, this._index_name3)

    this.save()
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
        console.log('GET Firestore Document: ' + 'ID=' + _id + ' DATA=' + JSON.stringify(data))
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
    console.log("scorelist.component: unsubscribe")
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
      case this._index_name3:
        if(this.score3[courseNo] < 15 )
          this.score3[courseNo]++
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
  setScoreCounter3Up(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.score1[courseNo] < 15 )
          this.score1[courseNo] = this.score1[courseNo] + 3 > 15 ? 15 : this.score1[courseNo] + 3
        break
      case this._index_name2:
        if(this.score2[courseNo] < 15 )
          this.score2[courseNo] = this.score2[courseNo] + 3 > 15 ? 15 : this.score2[courseNo] + 3
        break
      case this._index_name3:
        if(this.score3[courseNo] < 15 )
          this.score3[courseNo] = this.score3[courseNo] + 3 > 15 ? 15 : this.score3[courseNo] + 3
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
      case this._index_name3:
        if(this.score3[courseNo] > 0 )
          this.score3[courseNo]--
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
  setScoreCounter3Down(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.score1[courseNo] > 0 )
          this.score1[courseNo] = this.score1[courseNo] - 3 < 0 ? 0 : this.score1[courseNo] - 3
        break
      case this._index_name2:
        if(this.score2[courseNo] > 0 )
          this.score2[courseNo] = this.score2[courseNo] - 3 < 0 ? 0 : this.score2[courseNo] - 3
        break
      case this._index_name3:
        if(this.score3[courseNo] > 0 )
          this.score3[courseNo] = this.score3[courseNo] - 3 < 0 ? 0 : this.score3[courseNo] - 3
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
  save() {
    // changes.prop contains the old and the new value...
    this.outTotal1 = this.setOutTotal1()
    this.inTotal1 = this.setInTotal1()
    this.outTotal2 = this.setOutTotal2()
    this.inTotal2 = this.setInTotal2()
    this.outTotal3 = this.setOutTotal3()
    this.inTotal3 = this.setInTotal3()
    this.total1 = this.setTotal1()
    this.total2 = this.setTotal2()
    this.total3 = this.setTotal3()

    this.setBadgeOrder()
    this.setOlympicTotal()
    this.setOlympicAndLasvegasAfterRate()
  }

  /**
   * オリンピックのスコアを計算する
   */
  setOlympicTotal() {

    let tmp1: any
    let tmp2: any
    let tmp3: any

    this.olympicTotal1 = 0
    this.olympicTotal2 = 0
    this.olympicTotal3 = 0

    for (let tmp of this.olympic1){
      this.olympicTotal1 += +tmp
    }
    for (let tmp of this.olympic2){
      this.olympicTotal2 += +tmp
    }
    for (let tmp of this.olympic3){
      this.olympicTotal3 += +tmp
    }

    tmp1 = this.olympicTotal1 * (+this.player-1) - (this.olympicTotal2 + this.olympicTotal3)
    tmp2 = this.olympicTotal2 * (+this.player-1) - (this.olympicTotal1 + this.olympicTotal3)
    tmp3 = this.olympicTotal3 * (+this.player-1) - (this.olympicTotal1 + this.olympicTotal2)

    this.olympicTotal1 = tmp1
    this.olympicTotal2 = tmp2
    this.olympicTotal3 = tmp3
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
   * プレイヤー3のINとOUTの合計を計算
   * @returns INとOUTの合計スコア
   */
  setTotal3() {
    return this.setOutTotal3() + this.setInTotal3()
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
   * プレイヤー3のOUTの合計を計算
   * @returns OUTの合計スコア
   */
  setOutTotal3() {
    let outTotal = 0
    for (let i = 0; i <= 8; i++){
      outTotal += this.score3[i]
    }
    return outTotal
  }

  /**
   * プレイヤー3のINの合計を計算
   * @returns INの合計スコア
   */
  setInTotal3() {
    let inTotal = 0
    for (let i = 9; i <= 17; i++){
      inTotal += this.score3[i]
    }
    return inTotal
  }

  /**
   * レート反映
   * オリンピックとラスベガスのスコアにレートを反映する
   * @param val 入力したレート
   */
  olympicAndLasvegasRateChange(val: any) {
    this.rateValue = val
    this.setOlympicAndLasvegasAfterRate()
  }

  /**
   * オリンピックとラスベガスの再描画
   */
  setOlympicAndLasvegasAfterRate() {
    this.olympicTotal1_rated = this.olympicTotal1 * this.rateValue
    this.olympicTotal2_rated = this.olympicTotal2 * this.rateValue
    this.olympicTotal3_rated = this.olympicTotal3 * this.rateValue
  }

  /**
   * 打順のバッジを表示する処理
   */
  setBadgeOrder() {

    let p1point: any
    let p2point: any
    let p3point: any

    this.courseIndex = 0

    //最初の打順設定が完了していない場合は、エラーフラグを立てる
    if(this.order1st[this._index_name1] == 0 || this.order1st[this._index_name2] == 0
        || this.order1st[this._index_name3] == 0) {
        this.orderError = true
    } else if (+this.order1st[this._index_name1] + +this.order1st[this._index_name2] +
        +this.order1st[this._index_name3] != 6) {
        this.orderError = true
    } else {
      this.orderError = false
    }

    for (let i=0; i<=17; i++) {

      p1point = 0
      p2point = 0
      p3point = 0

      //先頭からループ
      //処理前に初期化
      this.order[i][this._index_name1] = 0
      this.order[i][this._index_name2] = 0
      this.order[i][this._index_name3] = 0

      //最初のコースの場合、手入力した値をバッジにセット
      if(i == 0){
        if(!this.orderError){
          this.setBagdeOrder(i, this.order1st[this._index_name1], this.order1st[this._index_name2]
            , this.order1st[this._index_name3])
        }
      } else {
        //最初のコース以外の場合、スコアを見て判定する
        if (this.score1[i-1] == 0 || this.score2[i-1] == 0
          || this.score3[i-1] == 0) {
            //前のコースの打数が未入力0の場合は、バッジは出さない
            this.order[i][this._index_name1] = 0
            this.order[i][this._index_name2] = 0
            this.order[i][this._index_name3] = 0
          }

        if (this.score1[i-1] != 0 && this.score2[i-1] != 0
          && this.score3[i-1] != 0) {
            //前のコースが入力済み、かつ
            //前のコースのバッジが表示済みの場合、バッジを表示
            if (this.order[i-1][this._index_name1] != 0 && this.order[i-1][this._index_name2] != 0
              && this.order[i-1][this._index_name3] != 0) {
                //バッジ上書きできるように最初にクリアしておく
                this.order[i][this._index_name1] = 0
                this.order[i][this._index_name2] = 0
                this.order[i][this._index_name3] = 0
                p1point = +this.score1[i-1] * 10 + +this.order[i-1][this._index_name1]
                p2point = +this.score2[i-1] * 10 + +this.order[i-1][this._index_name2]
                p3point = +this.score3[i-1] * 10 + +this.order[i-1][this._index_name3]
              }

            this.setBagdeOrder(i, p1point, p2point, p3point)
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
   * @param p3point
   */
  setBagdeOrder(trgt:any, p1point:any, p2point:any, p3point:any) {

    //一人目
    if(p1point < p2point && p1point < p3point){
      this.order[trgt][this._index_name1] = 1
    }
    if(p1point > p2point && p1point > p3point){
      this.order[trgt][this._index_name1] = 3
    }
    if(
      (p1point > p2point && p1point < p3point)
      ||(p1point > p3point && p1point < p2point)){
        this.order[trgt][this._index_name1] = 2
    }

    //二人目
    if(p2point < p1point && p2point < p3point){
      this.order[trgt][this._index_name2] = 1
    }
    if(p2point > p1point && p2point > p3point){
      this.order[trgt][this._index_name2] = 3
    }
    if(
      (p2point > p1point && p2point < p3point)
      ||(p2point > p3point && p2point < p1point)){
        this.order[trgt][this._index_name2] = 2
    }

    //三人目
    if(p3point < p1point && p3point < p2point){
      this.order[trgt][this._index_name3] = 1
    }
    if(p3point > p1point && p3point > p2point){
      this.order[trgt][this._index_name3] = 3
    }
    if(
      (p3point > p1point && p3point < p2point)
      ||(p3point > p2point && p3point < p1point)){
        this.order[trgt][this._index_name3] = 2
    }
  }

  olympicSelect1(courseNo: any, olympic: any){

    if(this.olympic1[courseNo] == olympic){
      this.olympic1[courseNo] = 0
    }else{
      this.olympic1[courseNo] = olympic
    }
  }

  olympicSelect2(courseNo: any, olympic: any){

    if(this.olympic2[courseNo] == olympic){
      this.olympic2[courseNo] = 0
    }else{
      this.olympic2[courseNo] = olympic
    }
  }

  olympicSelect3(courseNo: any, olympic: any){

    if(this.olympic3[courseNo] == olympic){
      this.olympic3[courseNo] = 0
    }else{
      this.olympic3[courseNo] = olympic
    }
  }

  /**
   * フォームsubmit処理
   * 入力内容をFirestoreに上書きする
   * Subscribeできないため、try-catchでエラーをハンドリングする
   */
  onSubmit() {

    // リクエスト送信用にJSON作成
    this.checkoutForm = ({

      order1st: this.order1st,
      score1: this.score1,
      score2: this.score2,
      score3: this.score3,
      olympic1: this.olympic1,
      olympic2: this.olympic2,
      olympic3: this.olympic3,

    });

    this.saving = true
    try {
      this.getSubcollection(getAuth().currentUser?.uid || '', 'scores').doc(this._id).update(this.checkoutForm)
      console.log('POST Firestore Document: '+'scores/'+this._id)
    } catch (error) {
      this.saving = false
      console.log('POST Error: '+error)
    }
  }
}
