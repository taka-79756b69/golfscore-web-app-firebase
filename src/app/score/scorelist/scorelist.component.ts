import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

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
    this.order1st = data.order1st
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
      this.firestore.doc('scores/'+_id).valueChanges().subscribe(data => {

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
      case this._index_name4:
        if(this.score4[courseNo] < 15 )
          this.score4[courseNo]++
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
      case this._index_name4:
        if(this.score4[courseNo] < 15 )
          this.score4[courseNo] = this.score4[courseNo] + 3 > 15 ? 15 : this.score4[courseNo] + 3
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
      case this._index_name4:
        if(this.score4[courseNo] > 0 )
          this.score4[courseNo]--
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
      case this._index_name4:
        if(this.score4[courseNo] > 0 )
          this.score4[courseNo] = this.score4[courseNo] - 3 < 0 ? 0 : this.score4[courseNo] - 3
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

  /**
   * 打順のバッジを表示する処理
   */
  setBadgeOrder() {

    let p1point: any
    let p2point: any
    let p3point: any
    let p4point: any

    this.courseIndex = 0

    if(this.order1st[this._index_name1] == 0 || this.order1st[this._index_name2] == 0
        || this.order1st[this._index_name3] == 0 || this.order1st[this._index_name4] == 0) {
        //最初の打順設定が完了していない場合は、エラーフラグを立てる
        this.orderError = true
    } else {
      this.orderError = false
    }

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
        if(!this.orderError){
          this.setBagdeOrder(i, this.order1st[this._index_name1], this.order1st[this._index_name2]
            , this.order1st[this._index_name3], this.order1st[this._index_name4])
        }
      } else {
        //最初のコース以外の場合、スコアを見て判定する
        if (this.score1[i-1] == 0 || this.score2[i-1] == 0
          || this.score3[i-1] == 0 || this.score4[i-1] == 0) {
            //前のコースの打数が未入力0の場合は、バッジは出さない
            this.order[i][this._index_name1] = 0
            this.order[i][this._index_name2] = 0
            this.order[i][this._index_name3] = 0
            this.order[i][this._index_name4] = 0
          }

        if (this.score1[i-1] != 0 && this.score2[i-1] != 0
          && this.score3[i-1] != 0 && this.score4[i-1] != 0) {
            //前のコースが入力済み、かつ
            //前のコースのバッジが表示済みの場合、バッジを表示
            if (this.order[i-1][this._index_name1] != 0 && this.order[i-1][this._index_name2] != 0
              && this.order[i-1][this._index_name3] != 0 && this.order[i-1][this._index_name4] != 0) {
                //バッジ上書きできるように最初にクリアしておく
                this.order[i][this._index_name1] = 0
                this.order[i][this._index_name2] = 0
                this.order[i][this._index_name3] = 0
                this.order[i][this._index_name4] = 0
                p1point = +this.score1[i-1] * 10 + +this.order[i-1][this._index_name1]
                p2point = +this.score2[i-1] * 10 + +this.order[i-1][this._index_name2]
                p3point = +this.score3[i-1] * 10 + +this.order[i-1][this._index_name3]
                p4point = +this.score4[i-1] * 10 + +this.order[i-1][this._index_name4]
              }

            this.setBagdeOrder(i, p1point, p2point, p3point, p4point)
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
   * @param p4point
   */
  setBagdeOrder(trgt:any, p1point:any, p2point:any, p3point:any, p4point:any) {

    //一人目
    if(p1point < p2point && p1point < p3point && p1point < p4point){
      this.order[trgt][this._index_name1] = 1
      this.lasvegas1[trgt] = 0
    }
    if(p1point > p2point && p1point > p3point && p1point > p4point){
      this.order[trgt][this._index_name1] = 4
      this.lasvegas1[trgt] = 0
    }
    if(
      (p1point > p2point && p1point < p3point && p1point < p4point)
      ||(p1point > p3point && p1point < p2point && p1point < p4point)
      ||(p1point > p4point && p1point < p2point && p1point < p3point)){
        this.order[trgt][this._index_name1] = 2
        this.lasvegas1[trgt] = 1
    }
    if(
      (p1point < p2point && p1point > p3point && p1point > p4point)
      ||(p1point < p3point && p1point > p2point && p1point > p4point)
      ||(p1point < p4point && p1point > p2point && p1point > p3point)){
        this.order[trgt][this._index_name1] = 3
        this.lasvegas1[trgt] = 1
    }

    //二人目
    if(p2point < p1point && p2point < p3point && p2point < p4point){
      this.order[trgt][this._index_name2] = 1
      this.lasvegas2[trgt] = 0
    }
    if(p2point > p1point && p2point > p3point && p2point > p4point){
      this.order[trgt][this._index_name2] = 4
      this.lasvegas2[trgt] = 0
    }
    if(
      (p2point > p1point && p2point < p3point && p2point < p4point)
      ||(p2point > p3point && p2point < p1point && p2point < p4point)
      ||(p2point > p4point && p2point < p1point && p2point < p3point)){
        this.order[trgt][this._index_name2] = 2
        this.lasvegas2[trgt] = 1
    }
    if(
      (p2point < p1point && p2point > p3point && p2point > p4point)
      ||(p2point < p3point && p2point > p1point && p2point > p4point)
      ||(p2point < p4point && p2point > p1point && p2point > p3point)){
        this.order[trgt][this._index_name2] = 3
        this.lasvegas2[trgt] = 1
    }

    //三人目
    if(p3point < p1point && p3point < p2point && p3point < p4point){
      this.order[trgt][this._index_name3] = 1
      this.lasvegas3[trgt] = 0
    }
    if(p3point > p1point && p3point > p2point && p3point > p4point){
      this.order[trgt][this._index_name3] = 4
      this.lasvegas3[trgt] = 0
    }
    if(
      (p3point > p1point && p3point < p2point && p3point < p4point)
      ||(p3point > p2point && p3point < p1point && p3point < p4point)
      ||(p3point > p4point && p3point < p1point && p3point < p2point)){
        this.order[trgt][this._index_name3] = 2
        this.lasvegas3[trgt] = 1
    }
    if(
      (p3point < p1point && p3point > p2point && p3point > p4point)
      ||(p3point < p2point && p3point > p1point && p3point > p4point)
      ||(p3point < p4point && p3point > p1point && p3point > p2point)){
        this.order[trgt][this._index_name3] = 3
        this.lasvegas3[trgt] = 1
    }

    //四人目
    if(p4point < p1point && p4point < p2point && p4point < p3point){
      this.order[trgt][this._index_name4] = 1
      this.lasvegas4[trgt] = 0
    }
    if(p4point > p1point && p4point > p2point && p4point > p3point){
      this.order[trgt][this._index_name4] = 4
      this.lasvegas4[trgt] = 0
    }
    if(
      (p4point > p1point && p4point < p2point && p4point < p3point)
      ||(p4point > p2point && p4point < p1point && p4point < p3point)
      ||(p4point > p3point && p4point < p1point && p4point < p2point)){
        this.order[trgt][this._index_name4] = 2
        this.lasvegas4[trgt] = 1
    }
    if(
      (p4point < p1point && p4point > p2point && p4point > p3point)
      ||(p4point < p2point && p4point > p1point && p4point > p3point)
      ||(p4point < p3point && p4point > p1point && p4point > p2point)){
        this.order[trgt][this._index_name4] = 3
        this.lasvegas4[trgt] = 1
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

  olympicSelect4(courseNo: any, olympic: any){

    if(this.olympic4[courseNo] == olympic){
      this.olympic4[courseNo] = 0
    }else{
      this.olympic4[courseNo] = olympic
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
      score4: this.score4,
      lasvegas1: this.lasvegas1,
      lasvegas2: this.lasvegas2,
      lasvegas3: this.lasvegas3,
      lasvegas4: this.lasvegas4,
      olympic1: this.olympic1,
      olympic2: this.olympic2,
      olympic3: this.olympic3,
      olympic4: this.olympic4,

    });

    this.saving = true
    try {
      this.firestore.doc('scores/'+this._id).update(this.checkoutForm)
      console.log('POST Firestore Document: '+'scores/'+this._id)
    } catch (error) {
      this.saving = false
      console.log('POST Error: '+error)
    }
  }
}
