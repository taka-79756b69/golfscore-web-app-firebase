import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from '@firebase/util';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

//export interface score1 { score1: Array<number> }

@Component({
  selector: 'app-scorelist',
  templateUrl: './scorelist.component.html',
  styleUrls: ['./scorelist.component.scss']
})
export class ScorelistComponent {

  //DBから取得した値のかたまり(ドキュメント)
  score: any

  //各プレーヤーのスコア(ドキュメント)
  score1: any
  score2: any
  score3: any
  score4: any

  //各プレーヤーのラスベガス(ドキュメント)
  lasvegas1: any
  lasvegas2: any
  lasvegas3: any
  lasvegas4: any

  //各プレーヤーのオリンピック(ドキュメント)
  olympic1: any
  olympic2: any
  olympic3: any
  olympic4: any

  //コースNo(ドキュメント)
  no: any[] = new Array()

  //人数(ドキュメント)
  player: any

  //プレーヤー識別用のインデックス
  _index_name1 = 0
  _index_name2 = 1
  _index_name3 = 2
  _index_name4 = 3

  //プレイヤー識別用のインデックスを格納する配列
  playerArray: any[] = new Array()

  //コース番号
  courseIndex: any

  //オーダーバッジ
  order = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  //打順（初回手入力分）
  order1st: any

  //OUTTOTAL
  outTotal1: any
  outTotal2: any
  outTotal3: any
  outTotal4: any

  //INTOTAL
  inTotal1: any
  inTotal2: any
  inTotal3: any
  inTotal4: any

  //TOTAL
  total1: any
  total2: any
  total3: any
  total4: any

  //OLYMPIC
  olympicTotal1: any
  olympicTotal2: any
  olympicTotal3: any
  olympicTotal4: any

  //OLYMPIC（レート反映後）
  olympicTotal1_rated = 0
  olympicTotal2_rated = 0
  olympicTotal3_rated = 0
  olympicTotal4_rated = 0

  //LASVEGAS
  lasvegasTotal1 = 0
  lasvegasTotal2 = 0
  lasvegasTotal3 = 0
  lasvegasTotal4 = 0

  //LASVEGAS（レート反映後）
  lasvegasTotal1_rated = 0
  lasvegasTotal2_rated = 0
  lasvegasTotal3_rated = 0
  lasvegasTotal4_rated = 0

  //レート
  rateValue = 0

  /////**** ここから上は必要ということで整理済み *****/////
  //フォームデータ
  checkoutForm: any

  //保存ダイアログ用のフラグ
  saving: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private domSanitizer: DomSanitizer,
    ){
    }

  // 購読設定停止用
  private subscriptions = new Subscription();

  /**
   * 初期処理
   */
  ngOnInit(): void {

    //scoreId
    let _id: string

    //RouterのパラメータからscoreIdを取得
    this.activatedRoute.paramMap.subscribe(params => {
      _id = params.get("scoreId")!
      this.getScoreDocument(_id)
    })
  }

  /**
   * 初期データを設定
   * @param data Firestoreドキュメントデータ
   */
  setInitParam(data: any){
    this.score1 = data.score1
    this.score2 = data.score2
    this.score3 = data.score3
    this.score4 = data.score4
    this.lasvegas1 = data.lasvegas1
    this.lasvegas2 = data.lasvegas2
    this.lasvegas3 = data.lasvegas3
    this.lasvegas4 = data.lasvegas4
    this.olympic1 = data.olympic1
    this.olympic2 = data.olympic2
    this.olympic3 = data.olympic3
    this.olympic4 = data.olympic4
    this.player = data.player
    this.no = data.no
    this.order1st = data.course1order
    this.playerArray.push(this._index_name1, this._index_name2, this._index_name3, this._index_name4)

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
   * ドキュメント取得処理
   * FirestoreからドキュメントIDをキーにして取得する
   * @param _id ドキュメントID
   */
  getScoreDocument(_id: string){
    this.subscriptions.add(
      this.afs.doc('scores/'+_id).valueChanges().subscribe(data => {

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
   * スコアのカウントアップ
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounterUp(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.score1[courseNo] !== 15 )
          this.score1[courseNo]++
        break
      case this._index_name2:
        if(this.score2[courseNo] !== 15 )
          this.score2[courseNo]++
        break
      case this._index_name3:
        if(this.score3[courseNo] !== 15 )
          this.score3[courseNo]++
        break
      case this._index_name4:
        if(this.score4[courseNo] !== 15 )
          this.score4[courseNo]++
        break
      default:
        break
    }
  }

  /**
   * スコアのカウントダウン
   * ダイアログ用イベント
   * @param courseNo コースNo
   * @param playerIndex プレイヤー番号
   */
  setScoreCounterDown(courseNo: any, playerIndex: any){
    switch (playerIndex){
      case this._index_name1:
        if(this.score1[courseNo] !== 0 )
          this.score1[courseNo]--
        break
      case this._index_name2:
        if(this.score2[courseNo] !== 0 )
          this.score2[courseNo]--
        break
      case this._index_name3:
        if(this.score3[courseNo] !== 0 )
          this.score3[courseNo]--
        break
      case this._index_name4:
        if(this.score4[courseNo] !== 0 )
          this.score4[courseNo]--
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
    this.outTotal4 = this.setOutTotal4()
    this.inTotal4 = this.setInTotal4()
    this.total1 = this.setTotal1()
    this.total2 = this.setTotal2()
    this.total3 = this.setTotal3()
    this.total4 = this.setTotal4()

    this.setOlympicTotal()
    this.setLasvegasTotal()
    this.setOlympicAndLasvegasAfterRate()
    this.setBadgeOrder()
  }

  /**
   * ラスベガスの合計を計算
   */
  setLasvegasTotal() {

    //初期化しておく
    this.lasvegasTotal1 = 0
    this.lasvegasTotal2 = 0
    this.lasvegasTotal3 = 0
    this.lasvegasTotal4 = 0

    for (let i = 0; i <= 17; i++) {
      let teamA: number[] = new Array()
      let teamB: number[] = new Array()

      if(this.score1[i] != 0 && this.score2[i] != 0 && this.score3[i] != 0 && this.score4[i] != 0){
        if(this.lasvegas1[i] == 0){
          this.score1[i] < 10 ? teamA.push(+this.score1[i]) : teamA.push(9)
        }else{
          this.score1[i] < 10 ? teamB.push(+this.score1[i]) : teamB.push(9)
        }
        if(this.lasvegas2[i] == 0){
          this.score2[i] < 10 ? teamA.push(+this.score2[i]) : teamA.push(9)
        }else{
          this.score2[i] < 10 ? teamB.push(+this.score2[i]) : teamB.push(9)
        }
        if(this.lasvegas3[i] == 0){
          this.score3[i] < 10 ? teamA.push(+this.score3[i]) : teamA.push(9)
        }else{
          this.score3[i] < 10 ? teamB.push(+this.score3[i]) : teamB.push(9)
        }
        if(this.lasvegas4[i] == 0){
          this.score4[i] < 10 ? teamA.push(+this.score4[i]) : teamA.push(9)
        }else{
          this.score4[i] < 10 ? teamB.push(+this.score4[i]) : teamB.push(9)
        }
        this.setLasvegasTotal_set_display(i, teamA, teamB)
      }
    }
  }

  /**
   * 一覧のラスベガスの合計を設定する
   * コース毎に集計し、合計を設定する
   * @param index 判定するコースNo
   * @param teamA チームAのスコア
   * @param teamB チームBのスコア
   */
  setLasvegasTotal_set_display(index: any, teamA: any, teamB: any){
    if(this.lasvegas1[index] == 0){
      this.lasvegasTotal1 = this.lasvegasTotal1 + (this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA))
    }else{
      this.lasvegasTotal1 = this.lasvegasTotal1 + (this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB))
    }

    if(this.lasvegas2[index] == 0){
      this.lasvegasTotal2 = this.lasvegasTotal2 + (this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA))
    }else{
      this.lasvegasTotal2 = this.lasvegasTotal2 + (this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB))
    }

    if(this.lasvegas3[index] == 0){
      this.lasvegasTotal3 = this.lasvegasTotal3 + (this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA))
    }else{
      this.lasvegasTotal3 = this.lasvegasTotal3 + (this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB))
    }

    if(this.lasvegas4[index] == 0){
      this.lasvegasTotal4 = this.lasvegasTotal4 + (this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA))
    }else{
      this.lasvegasTotal4 = this.lasvegasTotal4 + (this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB))
    }
  }

  /**
   * ラスベガスのチームスコアを計算する
   * @param score チームのスコアの配列
   * @returns 計算した結果
   */
  getLasTeamScore(score:any){
    if(score[0] < score[1]){
      return (score[0] * 10 + score[1])
    }else{
      return (score[1] * 10 + score[0])
    }
  }

  /**
   * オリンピックのスコアを計算する
   */
  setOlympicTotal() {

    let tmp1: any
    let tmp2: any
    let tmp3: any
    let tmp4: any

    this.olympicTotal1 = 0
    this.olympicTotal2 = 0
    this.olympicTotal3 = 0
    this.olympicTotal4 = 0

    for (let tmp of this.olympic1){
      this.olympicTotal1 += +tmp
    }
    for (let tmp of this.olympic2){
      this.olympicTotal2 += +tmp
    }
    for (let tmp of this.olympic3){
      this.olympicTotal3 += +tmp
    }
    for (let tmp of this.olympic4){
      this.olympicTotal4 += +tmp
    }

    tmp1 = this.olympicTotal1 * (+this.player-1) - (this.olympicTotal2 + this.olympicTotal3 + this.olympicTotal4)
    tmp2 = this.olympicTotal2 * (+this.player-1) - (this.olympicTotal1 + this.olympicTotal3 + this.olympicTotal4)
    tmp3 = this.olympicTotal3 * (+this.player-1) - (this.olympicTotal1 + this.olympicTotal2 + this.olympicTotal4)
    tmp4 = this.olympicTotal4 * (+this.player-1) - (this.olympicTotal1 + this.olympicTotal2 + this.olympicTotal3)

    this.olympicTotal1 = tmp1
    this.olympicTotal2 = tmp2
    this.olympicTotal3 = tmp3
    this.olympicTotal4 = tmp4
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
   * プレイヤー4のINとOUTの合計を計算
   * @returns INとOUTの合計スコア
   */
  setTotal4() {
    return this.setOutTotal4() + this.setInTotal4()
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
   * プレイヤー4のOUTの合計を計算
   * @returns OUTの合計スコア
   */
  setOutTotal4() {
    let outTotal = 0
    for (let i = 0; i <= 8; i++){
      outTotal += this.score4[i]
    }
    return outTotal
  }

  /**
   * プレイヤー4のINの合計を計算
   * @returns INの合計スコア
   */
  setInTotal4() {
    let inTotal = 0
    for (let i = 9; i <= 17; i++){
      inTotal += this.score4[i]
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
    this.olympicTotal4_rated = this.olympicTotal4 * this.rateValue
    this.lasvegasTotal1_rated = this.lasvegasTotal1 * this.rateValue
    this.lasvegasTotal2_rated = this.lasvegasTotal2 * this.rateValue
    this.lasvegasTotal3_rated = this.lasvegasTotal3 * this.rateValue
    this.lasvegasTotal4_rated = this.lasvegasTotal4 * this.rateValue
  }

  //打順のバッジを表示する処理
  setBadgeOrder() {

    let p1point: any
    let p2point: any
    let p3point: any
    let p4point: any

    this.courseIndex = 0

    for (let i=0; i<=17; i++) {

      p1point = 0
      p2point = 0
      p3point = 0
      p4point = 0

      //先頭からループ
      //処理前に初期化
      this.order[i][this._index_name1] = 0
      this.order[i][this._index_name2] = 0
      this.order[i][this._index_name3] = 0
      this.order[i][this._index_name4] = 0

      //最初のコースの場合、手入力した値をバッジにセット
      if(i == 0){
        this.order[i][this._index_name1] = this.order1st[this._index_name1]
        this.order[i][this._index_name2] = this.order1st[this._index_name2]
        this.order[i][this._index_name3] = this.order1st[this._index_name3]
        this.order[i][this._index_name4] = this.order1st[this._index_name4]
      } else {
        //最初のコース以外の場合、スコアを見て判定する
        if (this.score1[i] == 0 && this.score2[i] == 0
          && this.score3[i] == 0 && this.score4[i] == 0) {
            //前のコースの打数が未入力0の場合は、バッジは出さない
            this.order[i][this._index_name1] = 0
            this.order[i][this._index_name2] = 0
            this.order[i][this._index_name3] = 0
            this.order[i][this._index_name4] = 0
          }

        if (this.score1[i] != 0 && this.score2[i] != 0
          && this.score3[i] != 0 && this.score4[i] != 0) {
            //前のコースが入力済み、かつ
            //前のコースのバッジが表示済みの場合、バッジを表示
            if (this.order[i-1][this._index_name1] != 0 && this.order[i-1][this._index_name2] != 0
              && this.order[i-1][this._index_name3] != 0 && this.order[i-1][this._index_name4] != 0) {
                p1point = +this.score1[i] * 10 + +this.order[i-1][this._index_name1]
                p2point = +this.score2[i] * 10 + +this.order[i-1][this._index_name2]
                p3point = +this.score3[i] * 10 + +this.order[i-1][this._index_name3]
                p4point = +this.score4[i] * 10 + +this.order[i-1][this._index_name4]
              }

            this.setBagdeOrder(i, p1point, p2point, p3point, p4point)
          }
      }
    }
  }

  //バッジを設定する処理
  setBagdeOrder(trgt:any, p1point:any, p2point:any, p3point:any, p4point:any) {

    //一人目
    if(p1point < p2point && p1point < p3point && p1point < p4point){
      this.order[trgt][this._index_name1] = 1
    }
    if(p1point > p2point && p1point > p3point && p1point > p4point){
      this.order[trgt][this._index_name1] = 4
    }
    if(
      (p1point > p2point && p1point < p3point && p1point < p4point)
      ||(p1point > p3point && p1point < p2point && p1point < p4point)
      ||(p1point > p4point && p1point < p2point && p1point < p3point)){
        this.order[trgt][this._index_name1] = 2
    }
    if(
      (p1point < p2point && p1point > p3point && p1point > p4point)
      ||(p1point < p3point && p1point > p2point && p1point > p4point)
      ||(p1point < p4point && p1point > p2point && p1point > p3point)){
        this.order[trgt][this._index_name1] = 3
    }

    //二人目
    if(p2point < p1point && p2point < p3point && p2point < p4point){
      this.order[trgt][this._index_name2] = 1
    }
    if(p2point > p1point && p2point > p3point && p2point > p4point){
      this.order[trgt][this._index_name2] = 4
    }
    if(
      (p2point > p1point && p2point < p3point && p2point < p4point)
      ||(p2point > p3point && p2point < p1point && p2point < p4point)
      ||(p2point > p4point && p2point < p1point && p2point < p3point)){
        this.order[trgt][this._index_name2] = 2
    }
    if(
      (p2point < p1point && p2point > p3point && p2point > p4point)
      ||(p2point < p3point && p2point > p1point && p2point > p4point)
      ||(p2point < p4point && p2point > p1point && p2point > p3point)){
        this.order[trgt][this._index_name2] = 3
    }

    //三人目
    if(p3point < p1point && p3point < p2point && p3point < p4point){
      this.order[trgt][this._index_name3] = 1
    }
    if(p3point > p1point && p3point > p2point && p3point > p4point){
      this.order[trgt][this._index_name3] = 4
    }
    if(
      (p3point > p1point && p3point < p2point && p3point < p4point)
      ||(p3point > p2point && p3point < p1point && p3point < p4point)
      ||(p3point > p4point && p3point < p1point && p3point < p2point)){
        this.order[trgt][this._index_name3] = 2
    }
    if(
      (p3point < p1point && p3point > p2point && p3point > p4point)
      ||(p3point < p2point && p3point > p1point && p3point > p4point)
      ||(p3point < p4point && p3point > p1point && p3point > p2point)){
        this.order[trgt][this._index_name3] = 3
    }

    //四人目
    if(p4point < p1point && p4point < p2point && p4point < p3point){
      this.order[trgt][this._index_name4] = 1
    }
    if(p4point > p1point && p4point > p2point && p4point > p3point){
      this.order[trgt][this._index_name4] = 4
    }
    if(
      (p4point > p1point && p4point < p2point && p4point < p3point)
      ||(p4point > p2point && p4point < p1point && p4point < p3point)
      ||(p4point > p3point && p4point < p1point && p4point < p2point)){
        this.order[trgt][this._index_name4] = 2
    }
    if(
      (p4point < p1point && p4point > p2point && p4point > p3point)
      ||(p4point < p2point && p4point > p1point && p4point > p3point)
      ||(p4point < p3point && p4point > p1point && p4point > p2point)){
        this.order[trgt][this._index_name4] = 3
    }
  }

  //スコア保存
  onSubmit() {

    //alert("保存を開始します。「保存完了」が表示されるまで待ってください。")
    this.saving = true

    // リクエスト送信用にJSON作成
    this.checkoutForm = ({
      name1: this.score.name1,
      name2: this.score.name2,
      name3: this.score.name3,
      name4: this.score.name4,
      course1_no: this.score.course1_no,
      course1_score1: this.score.course1_score1,
      course1_put1: this.score.course1_put1,
      course1_olympic1: this.score.course1_olympic1,
      course1_lasvegas1: this.score.course1_lasvegas1,
      course1_order1: this.order1st[this._index_name1],
      course1_score2: this.score.course1_score2,
      course1_put2: this.score.course1_put2,
      course1_olympic2: this.score.course1_olympic2,
      course1_lasvegas2: this.score.course1_lasvegas2,
      course1_order2: this.order1st[this._index_name2],
      course1_score3: this.score.course1_score3,
      course1_put3: this.score.course1_put3,
      course1_olympic3: this.score.course1_olympic3,
      course1_lasvegas3: this.score.course1_lasvegas3,
      course1_order3: this.order1st[this._index_name3],
      course1_score4: this.score.course1_score4,
      course1_put4: this.score.course1_put4,
      course1_olympic4: this.score.course1_olympic4,
      course1_lasvegas4: this.score.course1_lasvegas4,
      course1_order4: this.order1st[this._index_name4],

      course2_no: this.score.course2_no,
      course2_score1: this.score.course2_score1,
      course2_put1: this.score.course2_put1,
      course2_olympic1: this.score.course2_olympic1,
      course2_lasvegas1: this.score.course2_lasvegas1,
      course2_score2: this.score.course2_score2,
      course2_put2: this.score.course2_put2,
      course2_olympic2: this.score.course2_olympic2,
      course2_lasvegas2: this.score.course2_lasvegas2,
      course2_score3: this.score.course2_score3,
      course2_put3: this.score.course2_put3,
      course2_olympic3: this.score.course2_olympic3,
      course2_lasvegas3: this.score.course2_lasvegas3,
      course2_score4: this.score.course2_score4,
      course2_put4: this.score.course2_put4,
      course2_olympic4: this.score.course2_olympic4,
      course2_lasvegas4: this.score.course2_lasvegas4,

      course3_no: this.score.course3_no,
      course3_score1: this.score.course3_score1,
      course3_put1: this.score.course3_put1,
      course3_olympic1: this.score.course3_olympic1,
      course3_lasvegas1: this.score.course3_lasvegas1,
      course3_score2: this.score.course3_score2,
      course3_put2: this.score.course3_put2,
      course3_olympic2: this.score.course3_olympic2,
      course3_lasvegas2: this.score.course3_lasvegas2,
      course3_score3: this.score.course3_score3,
      course3_put3: this.score.course3_put3,
      course3_olympic3: this.score.course3_olympic3,
      course3_lasvegas3: this.score.course3_lasvegas3,
      course3_score4: this.score.course3_score4,
      course3_put4: this.score.course3_put4,
      course3_olympic4: this.score.course3_olympic4,
      course3_lasvegas4: this.score.course3_lasvegas4,

      course4_no: this.score.course4_no,
      course4_score1: this.score.course4_score1,
      course4_put1: this.score.course4_put1,
      course4_olympic1: this.score.course4_olympic1,
      course4_lasvegas1: this.score.course4_lasvegas1,
      course4_score2: this.score.course4_score2,
      course4_put2: this.score.course4_put2,
      course4_olympic2: this.score.course4_olympic2,
      course4_lasvegas2: this.score.course4_lasvegas2,
      course4_score3: this.score.course4_score3,
      course4_put3: this.score.course4_put3,
      course4_olympic3: this.score.course4_olympic3,
      course4_lasvegas3: this.score.course4_lasvegas3,
      course4_score4: this.score.course4_score4,
      course4_put4: this.score.course4_put4,
      course4_olympic4: this.score.course4_olympic4,
      course4_lasvegas4: this.score.course4_lasvegas4,

      course5_no: this.score.course5_no,
      course5_score1: this.score.course5_score1,
      course5_put1: this.score.course5_put1,
      course5_olympic1: this.score.course5_olympic1,
      course5_lasvegas1: this.score.course5_lasvegas1,
      course5_score2: this.score.course5_score2,
      course5_put2: this.score.course5_put2,
      course5_olympic2: this.score.course5_olympic2,
      course5_lasvegas2: this.score.course5_lasvegas2,
      course5_score3: this.score.course5_score3,
      course5_put3: this.score.course5_put3,
      course5_olympic3: this.score.course5_olympic3,
      course5_lasvegas3: this.score.course5_lasvegas3,
      course5_score4: this.score.course5_score4,
      course5_put4: this.score.course5_put4,
      course5_olympic4: this.score.course5_olympic4,
      course5_lasvegas4: this.score.course5_lasvegas4,

      course6_no: this.score.course6_no,
      course6_score1: this.score.course6_score1,
      course6_put1: this.score.course6_put1,
      course6_olympic1: this.score.course6_olympic1,
      course6_lasvegas1: this.score.course6_lasvegas1,
      course6_score2: this.score.course6_score2,
      course6_put2: this.score.course6_put2,
      course6_olympic2: this.score.course6_olympic2,
      course6_lasvegas2: this.score.course6_lasvegas2,
      course6_score3: this.score.course6_score3,
      course6_put3: this.score.course6_put3,
      course6_olympic3: this.score.course6_olympic3,
      course6_lasvegas3: this.score.course6_lasvegas3,
      course6_score4: this.score.course6_score4,
      course6_put4: this.score.course6_put4,
      course6_olympic4: this.score.course6_olympic4,
      course6_lasvegas4: this.score.course6_lasvegas4,

      course7_no: this.score.course7_no,
      course7_score1: this.score.course7_score1,
      course7_put1: this.score.course7_put1,
      course7_olympic1: this.score.course7_olympic1,
      course7_lasvegas1: this.score.course7_lasvegas1,
      course7_score2: this.score.course7_score2,
      course7_put2: this.score.course7_put2,
      course7_olympic2: this.score.course7_olympic2,
      course7_lasvegas2: this.score.course7_lasvegas2,
      course7_score3: this.score.course7_score3,
      course7_put3: this.score.course7_put3,
      course7_olympic3: this.score.course7_olympic3,
      course7_lasvegas3: this.score.course7_lasvegas3,
      course7_score4: this.score.course7_score4,
      course7_put4: this.score.course7_put4,
      course7_olympic4: this.score.course7_olympic4,
      course7_lasvegas4: this.score.course7_lasvegas4,

      course8_no: this.score.course8_no,
      course8_score1: this.score.course8_score1,
      course8_put1: this.score.course8_put1,
      course8_olympic1: this.score.course8_olympic1,
      course8_lasvegas1: this.score.course8_lasvegas1,
      course8_score2: this.score.course8_score2,
      course8_put2: this.score.course8_put2,
      course8_olympic2: this.score.course8_olympic2,
      course8_lasvegas2: this.score.course8_lasvegas2,
      course8_score3: this.score.course8_score3,
      course8_put3: this.score.course8_put3,
      course8_olympic3: this.score.course8_olympic3,
      course8_lasvegas3: this.score.course8_lasvegas3,
      course8_score4: this.score.course8_score4,
      course8_put4: this.score.course8_put4,
      course8_olympic4: this.score.course8_olympic4,
      course8_lasvegas4: this.score.course8_lasvegas4,

      course9_no: this.score.course9_no,
      course9_score1: this.score.course9_score1,
      course9_put1: this.score.course9_put1,
      course9_olympic1: this.score.course9_olympic1,
      course9_lasvegas1: this.score.course9_lasvegas1,
      course9_score2: this.score.course9_score2,
      course9_put2: this.score.course9_put2,
      course9_olympic2: this.score.course9_olympic2,
      course9_lasvegas2: this.score.course9_lasvegas2,
      course9_score3: this.score.course9_score3,
      course9_put3: this.score.course9_put3,
      course9_olympic3: this.score.course9_olympic3,
      course9_lasvegas3: this.score.course9_lasvegas3,
      course9_score4: this.score.course9_score4,
      course9_put4: this.score.course9_put4,
      course9_olympic4: this.score.course9_olympic4,
      course9_lasvegas4: this.score.course9_lasvegas4,

      course10_no: this.score.course10_no,
      course10_score1: this.score.course10_score1,
      course10_put1: this.score.course10_put1,
      course10_olympic1: this.score.course10_olympic1,
      course10_lasvegas1: this.score.course10_lasvegas1,
      course10_score2: this.score.course10_score2,
      course10_put2: this.score.course10_put2,
      course10_olympic2: this.score.course10_olympic2,
      course10_lasvegas2: this.score.course10_lasvegas2,
      course10_score3: this.score.course10_score3,
      course10_put3: this.score.course10_put3,
      course10_olympic3: this.score.course10_olympic3,
      course10_lasvegas3: this.score.course10_lasvegas3,
      course10_score4: this.score.course10_score4,
      course10_put4: this.score.course10_put4,
      course10_olympic4: this.score.course10_olympic4,
      course10_lasvegas4: this.score.course10_lasvegas4,

      course11_no: this.score.course11_no,
      course11_score1: this.score.course11_score1,
      course11_put1: this.score.course11_put1,
      course11_olympic1: this.score.course11_olympic1,
      course11_lasvegas1: this.score.course11_lasvegas1,
      course11_score2: this.score.course11_score2,
      course11_put2: this.score.course11_put2,
      course11_olympic2: this.score.course11_olympic2,
      course11_lasvegas2: this.score.course11_lasvegas2,
      course11_score3: this.score.course11_score3,
      course11_put3: this.score.course11_put3,
      course11_olympic3: this.score.course11_olympic3,
      course11_lasvegas3: this.score.course11_lasvegas3,
      course11_score4: this.score.course11_score4,
      course11_put4: this.score.course11_put4,
      course11_olympic4: this.score.course11_olympic4,
      course11_lasvegas4: this.score.course11_lasvegas4,

      course12_no: this.score.course12_no,
      course12_score1: this.score.course12_score1,
      course12_put1: this.score.course12_put1,
      course12_olympic1: this.score.course12_olympic1,
      course12_lasvegas1: this.score.course12_lasvegas1,
      course12_score2: this.score.course12_score2,
      course12_put2: this.score.course12_put2,
      course12_olympic2: this.score.course12_olympic2,
      course12_lasvegas2: this.score.course12_lasvegas2,
      course12_score3: this.score.course12_score3,
      course12_put3: this.score.course12_put3,
      course12_olympic3: this.score.course12_olympic3,
      course12_lasvegas3: this.score.course12_lasvegas3,
      course12_score4: this.score.course12_score4,
      course12_put4: this.score.course12_put4,
      course12_olympic4: this.score.course12_olympic4,
      course12_lasvegas4: this.score.course12_lasvegas4,

      course13_no: this.score.course13_no,
      course13_score1: this.score.course13_score1,
      course13_put1: this.score.course13_put1,
      course13_olympic1: this.score.course13_olympic1,
      course13_lasvegas1: this.score.course13_lasvegas1,
      course13_score2: this.score.course13_score2,
      course13_put2: this.score.course13_put2,
      course13_olympic2: this.score.course13_olympic2,
      course13_lasvegas2: this.score.course13_lasvegas2,
      course13_score3: this.score.course13_score3,
      course13_put3: this.score.course13_put3,
      course13_olympic3: this.score.course13_olympic3,
      course13_lasvegas3: this.score.course13_lasvegas3,
      course13_score4: this.score.course13_score4,
      course13_put4: this.score.course13_put4,
      course13_olympic4: this.score.course13_olympic4,
      course13_lasvegas4: this.score.course13_lasvegas4,

      course14_no: this.score.course14_no,
      course14_score1: this.score.course14_score1,
      course14_put1: this.score.course14_put1,
      course14_olympic1: this.score.course14_olympic1,
      course14_lasvegas1: this.score.course14_lasvegas1,
      course14_score2: this.score.course14_score2,
      course14_put2: this.score.course14_put2,
      course14_olympic2: this.score.course14_olympic2,
      course14_lasvegas2: this.score.course14_lasvegas2,
      course14_score3: this.score.course14_score3,
      course14_put3: this.score.course14_put3,
      course14_olympic3: this.score.course14_olympic3,
      course14_lasvegas3: this.score.course14_lasvegas3,
      course14_score4: this.score.course14_score4,
      course14_put4: this.score.course14_put4,
      course14_olympic4: this.score.course14_olympic4,
      course14_lasvegas4: this.score.course14_lasvegas4,

      course15_no: this.score.course15_no,
      course15_score1: this.score.course15_score1,
      course15_put1: this.score.course15_put1,
      course15_olympic1: this.score.course15_olympic1,
      course15_lasvegas1: this.score.course15_lasvegas1,
      course15_score2: this.score.course15_score2,
      course15_put2: this.score.course15_put2,
      course15_olympic2: this.score.course15_olympic2,
      course15_lasvegas2: this.score.course15_lasvegas2,
      course15_score3: this.score.course15_score3,
      course15_put3: this.score.course15_put3,
      course15_olympic3: this.score.course15_olympic3,
      course15_lasvegas3: this.score.course15_lasvegas3,
      course15_score4: this.score.course15_score4,
      course15_put4: this.score.course15_put4,
      course15_olympic4: this.score.course15_olympic4,
      course15_lasvegas4: this.score.course15_lasvegas4,

      course16_no: this.score.course16_no,
      course16_score1: this.score.course16_score1,
      course16_put1: this.score.course16_put1,
      course16_olympic1: this.score.course16_olympic1,
      course16_lasvegas1: this.score.course16_lasvegas1,
      course16_score2: this.score.course16_score2,
      course16_put2: this.score.course16_put2,
      course16_olympic2: this.score.course16_olympic2,
      course16_lasvegas2: this.score.course16_lasvegas2,
      course16_score3: this.score.course16_score3,
      course16_put3: this.score.course16_put3,
      course16_olympic3: this.score.course16_olympic3,
      course16_lasvegas3: this.score.course16_lasvegas3,
      course16_score4: this.score.course16_score4,
      course16_put4: this.score.course16_put4,
      course16_olympic4: this.score.course16_olympic4,
      course16_lasvegas4: this.score.course16_lasvegas4,

      course17_no: this.score.course17_no,
      course17_score1: this.score.course17_score1,
      course17_put1: this.score.course17_put1,
      course17_olympic1: this.score.course17_olympic1,
      course17_lasvegas1: this.score.course17_lasvegas1,
      course17_score2: this.score.course17_score2,
      course17_put2: this.score.course17_put2,
      course17_olympic2: this.score.course17_olympic2,
      course17_lasvegas2: this.score.course17_lasvegas2,
      course17_score3: this.score.course17_score3,
      course17_put3: this.score.course17_put3,
      course17_olympic3: this.score.course17_olympic3,
      course17_lasvegas3: this.score.course17_lasvegas3,
      course17_score4: this.score.course17_score4,
      course17_put4: this.score.course17_put4,
      course17_olympic4: this.score.course17_olympic4,
      course17_lasvegas4: this.score.course17_lasvegas4,

      course18_no: this.score.course18_no,
      course18_score1: this.score.course18_score1,
      course18_put1: this.score.course18_put1,
      course18_olympic1: this.score.course18_olympic1,
      course18_lasvegas1: this.score.course18_lasvegas1,
      course18_score2: this.score.course18_score2,
      course18_put2: this.score.course18_put2,
      course18_olympic2: this.score.course18_olympic2,
      course18_lasvegas2: this.score.course18_lasvegas2,
      course18_score3: this.score.course18_score3,
      course18_put3: this.score.course18_put3,
      course18_olympic3: this.score.course18_olympic3,
      course18_lasvegas3: this.score.course18_lasvegas3,
      course18_score4: this.score.course18_score4,
      course18_put4: this.score.course18_put4,
      course18_olympic4: this.score.course18_olympic4,
      course18_lasvegas4: this.score.course18_lasvegas4,
    });
    //console.warn('Your order has been submitted', this.checkoutForm);
  }
}
