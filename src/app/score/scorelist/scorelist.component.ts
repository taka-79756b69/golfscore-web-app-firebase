import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { getAuth } from '@angular/fire/auth';
import { SnackbarService } from 'src/app/common/snackbar/snackbar.service';

declare const bootstrap: any;

@Component({
  selector: 'app-scorelist',
  templateUrl: './scorelist.component.html',
  styleUrls: ['./scorelist.component.scss']
})
export class ScorelistComponent implements OnInit {

  //DBから取得した値のかたまり(ドキュメント)
  score: any

  //各プレーヤーのスコア(ドキュメント)
  score1: any
  score2: any
  score3: any
  score4: any

  //各プレーヤーのパットスコア(ドキュメント)
  putscore1: any
  putscore2: any
  putscore3: any
  putscore4: any

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

  //各プレーヤーのニアピン(ドキュメント)
  nearping1:any
  nearping2:any
  nearping3:any
  nearping4:any

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
  /**
   * 三人目を意味するインデックス
   */
  _index_name3 = 2
  /**
   * 四人目を意味するインデックス
   */
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

  //OLYMPIC
  isOlyNearping = false

  //LASVEGAS
  lasvegasTotal1 = 0
  lasvegasTotal2 = 0
  lasvegasTotal3 = 0
  lasvegasTotal4 = 0

  //LASVEGAS
  //設定画面用
  isLas2stories = false
  isLasPair = false

  //LASVEGAS（レート反映後）
  lasvegasTotal1_rated = 0
  lasvegasTotal2_rated = 0
  lasvegasTotal3_rated = 0
  lasvegasTotal4_rated = 0

  //LASVEGASのn階建て
  noStorey = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  noStoreyNow = 0

  //ラスベガスのチームローテーション
  teamType = [1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3]

  //フォームデータ
  checkoutForm: any

  //オーダーフラグ
  orderError: any

  // 購読設定停止用
  private subscriptions = new Subscription();

  //レートのモデルを定義
  rate: any

  //メモ
  memo: any

  //プレイ中のコースインデックス
  nowPlaying = 0

  //ドキュメントID
  _id: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private snackberService: SnackbarService
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

    //TODO 設定画面を最初に開きたい場合はここのコメントアウトを外す
    // setTimeout(() => {
    //   // HTMLの描画が完了した後に実行したい処理をここに書く
    //   this.openModal()
    // }, 500);
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
    this.putscore1 = data.putscore1
    this.putscore2 = data.putscore2
    this.putscore3 = data.putscore3
    this.putscore4 = data.putscore4
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
    this.rate = data.rate

    //2023年3月以降追加分はDBに項目がないためundifinedになる
    //undifinedの場合、初期値を設定する
    this.nearping1 = data.nearping1 ?? [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.nearping2 = data.nearping2 ?? [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.nearping3 = data.nearping3 ?? [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.nearping4 = data.nearping4 ?? [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.isOlyNearping = data.isOlyNearping ?? false
    this.isLas2stories = data.isLas2stories ?? false
    this.isLasPair = data.isLasPair ?? false
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
    console.log("[log] " + new Date() + " unsubscribe => (scorelist.component)")
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
      case this._index_name3:
        if(this.score3[courseNo] < 15 )
          this.score3[courseNo] = this.score3[courseNo] + 5 > 15 ? 15 : this.score3[courseNo] + 5
        break
      case this._index_name4:
        if(this.score4[courseNo] < 15 )
          this.score4[courseNo] = this.score4[courseNo] + 5 > 15 ? 15 : this.score4[courseNo] + 5
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
      case this._index_name3:
        if(this.score3[courseNo] > 0 )
          this.score3[courseNo] = this.score3[courseNo] - 5 < 0 ? 0 : this.score3[courseNo] - 5
        break
      case this._index_name4:
        if(this.score4[courseNo] > 0 )
          this.score4[courseNo] = this.score4[courseNo] - 5 < 0 ? 0 : this.score4[courseNo] - 5
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
      case this._index_name3:
        if(this.putscore3[courseNo] < 15 )
          this.putscore3[courseNo]++
        break
      case this._index_name4:
        if(this.putscore4[courseNo] < 15 )
          this.putscore4[courseNo]++
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
      case this._index_name3:
        if(this.putscore3[courseNo] > 0 )
          this.putscore3[courseNo]--
        break
      case this._index_name4:
        if(this.putscore4[courseNo] > 0 )
          this.putscore4[courseNo]--
        break
      default:
        break
    }
  }

  /**
   * トータルスコアの更新/
   * オリンピックの更新/
   * ラスベガスの更新/
   * 打順の更新
   */
  displayUpdate() {
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

    //ラスベガスチームと2階建ての設定を初期化
    this.resetDataset()

    //undifinedになる可能性があるものは置き換える
    this.chipsUndefinedReplace()

    //画面表示内容の制御
    this.setBadgeOrder()
    this.setLasvegasTeam()
    this.setOlympicTotal()
    this.setLasvegasTotal()
    this.setOlympicAndLasvegasAfterRate()
  }

  /**
   * 各ホールのスコア入力ダイアログを閉じた時の処理
   */
  closeInputDialog() {

    this.displayUpdate()
    this.snackberService.openSnackBar("スコアを一覧に反映しました")
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
    this.snackberService.openSnackBar("設定内容を反映しました")
    this.saveScore()
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
   * 同点の場合は次コースの持ち越しする
   * @param index 判定するコースNo
   * @param teamA チームAのスコア
   * @param teamB チームBのスコア
   */
  setLasvegasTotal_set_display(index: any, teamA: any, teamB: any){

    //Aチームのラスベガススコア
    let teamAScore = 0
    //Bチームのラスベガススコア
    let teamBScore = 0

    let p1Score = 0
    let p2Score = 0
    let p3Score = 0
    let p4Score = 0

    if(this.lasvegas1[index] == 0){
      teamAScore += this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA)
      p1Score = this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA)
    }else{
      teamBScore += this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB)
      p1Score = this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB)
    }

    if(this.lasvegas2[index] == 0){
      teamAScore += this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA)
      p2Score = this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA)
    }else{
      teamBScore += this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB)
      p2Score = this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB)
    }

    if(this.lasvegas3[index] == 0){
      teamAScore += this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA)
      p3Score = this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA)
    }else{
      teamBScore += this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB)
      p3Score = this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB)
    }

    if(this.lasvegas4[index] == 0){
      teamAScore += this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA)
      p4Score = this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA)
    }else{
      teamBScore += this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB)
      p4Score = this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB)
    }

    //ラスベガスの2階建てルールを設定する
    if(this.isLas2stories){
      //同点の場合次のコースの倍率を上げる
      if(teamAScore==teamBScore){
        //倍率をアップ
        this.noStoreyNow += 1
        //次のコースの倍率に加算する
        this.noStorey[index+1] += this.noStoreyNow
        //次のコースのチームも持ち越しで同じチームにする
        this.teamType[index+1] = this.teamType[index]
        this.lasvegas1[index+1] = this.lasvegas1[index]
        this.lasvegas2[index+1] = this.lasvegas2[index]
        this.lasvegas3[index+1] = this.lasvegas3[index]
        this.lasvegas4[index+1] = this.lasvegas4[index]
      }else{
        //同点でない場合倍率を元に戻す
        this.noStoreyNow = 0
        this.lasvegasTotal1 = this.lasvegasTotal1 + p1Score * this.noStorey[index]
        this.lasvegasTotal2 = this.lasvegasTotal2 + p2Score * this.noStorey[index]
        this.lasvegasTotal3 = this.lasvegasTotal3 + p3Score * this.noStorey[index]
        this.lasvegasTotal4 = this.lasvegasTotal4 + p4Score * this.noStorey[index]
      }
    }else{
      this.lasvegasTotal1 = this.lasvegasTotal1 + p1Score
      this.lasvegasTotal2 = this.lasvegasTotal2 + p2Score
      this.lasvegasTotal3 = this.lasvegasTotal3 + p3Score
      this.lasvegasTotal4 = this.lasvegasTotal4 + p4Score
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
    for (let tmp of this.nearping1){
      this.olympicTotal1 += +tmp
    }
    for (let tmp of this.olympic2){
      this.olympicTotal2 += +tmp
    }
    for (let tmp of this.nearping2){
      this.olympicTotal2 += +tmp
    }
    for (let tmp of this.olympic3){
      this.olympicTotal3 += +tmp
    }
    for (let tmp of this.nearping3){
      this.olympicTotal3 += +tmp
    }
    for (let tmp of this.olympic4){
      this.olympicTotal4 += +tmp
    }
    for (let tmp of this.nearping4){
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
   * オリンピックとラスベガスの再描画
   */
  setOlympicAndLasvegasAfterRate() {
    this.olympicTotal1_rated = this.olympicTotal1 * this.rate
    this.olympicTotal2_rated = this.olympicTotal2 * this.rate
    this.olympicTotal3_rated = this.olympicTotal3 * this.rate
    this.olympicTotal4_rated = this.olympicTotal4 * this.rate
    this.lasvegasTotal1_rated = this.lasvegasTotal1 * this.rate
    this.lasvegasTotal2_rated = this.lasvegasTotal2 * this.rate
    this.lasvegasTotal3_rated = this.lasvegasTotal3 * this.rate
    this.lasvegasTotal4_rated = this.lasvegasTotal4 * this.rate
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

    //最初の打順設定が完了していない場合は、エラーフラグを立てる
    //または、打順がかぶっていたりするとエラーフラグを立てる
    if(this.order1st[this._index_name1] == undefined || this.order1st[this._index_name2] == undefined
        || this.order1st[this._index_name3] == undefined || this.order1st[this._index_name4] == undefined) {
        this.orderError = true
    } else if(+this.order1st[this._index_name1] + +this.order1st[this._index_name2]
        + +this.order1st[this._index_name3] + +this.order1st[this._index_name4] != 10){
        this.orderError = true
    } else {
      this.orderError = false
    }

    //重複除いた配列の長さが4以外はエラーとする
    if (Array.from(new Set(this.order1st)).length != 4) {
      this.orderError = true
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
            , this.order1st[this._index_name3], this.order1st[this._index_name4], this.isLasPair)
          this.nowPlaying = 0
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
                this.nowPlaying = i
              }

            this.setBagdeOrder(i, p1point, p2point, p3point, p4point, this.isLasPair)
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
  setBagdeOrder(trgt:any, p1point:any, p2point:any, p3point:any, p4point:any, isLasPair: any) {

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

  /**
   * ラスベガスのチーム分け
   * 設定画面でローテーションフラグがONの場合とOFFの場合で呼び出すメソッドが変わる
   * setLasvegas1：1位と4位、2位と3位の固定
   * setLasvegas2：1位と4位、次は1位と3位、次は1位と2位とローテーションする
   */
  setLasvegasTeam() {

    for (let i=0; i<=17; i++) {
      if ( this.order[i][this._index_name1] != 0 && this.order[i][this._index_name2] != 0
          && this.order[i][this._index_name3] != 0 && this.order[i][this._index_name4] != 0 ) {
        if(this.isLasPair){
          this.setLasvegas2(i, this.order[i], this.teamType[i])
        }else{
          this.setLasvegas1(i, this.order[i])
        }
      }
    }
  }

  /**
   * 打順によるチーム分けを設定する
   * @param i コースNo
   * @param lasArray 打順の配列
   */
  setLasvegas1(i:any, lasArray:any){
    this.lasvegas1[i] = lasArray[this._index_name1] != 1 ? lasArray[this._index_name1] != 4 ? 1 : 0 : 0
    this.lasvegas2[i] = lasArray[this._index_name2] != 1 ? lasArray[this._index_name2] != 4 ? 1 : 0 : 0
    this.lasvegas3[i] = lasArray[this._index_name3] != 1 ? lasArray[this._index_name3] != 4 ? 1 : 0 : 0
    this.lasvegas4[i] = lasArray[this._index_name4] != 1 ? lasArray[this._index_name4] != 4 ? 1 : 0 : 0
  }

  /**
   * 打順によるチーム分けを設定する
   * チームをコース毎にローテーションさせるパターン
   * @param i コースNo
   * @param lasArray 打順の配列
   * @param type チームタイプ
   */
  setLasvegas2(i:any, lasArray:any, type:any){
    switch (type) {
      case 1:
        this.lasvegas1[i] = lasArray[this._index_name1] != 1 ? lasArray[this._index_name1] != 4 ? 1 : 0 : 0
        this.lasvegas2[i] = lasArray[this._index_name2] != 1 ? lasArray[this._index_name2] != 4 ? 1 : 0 : 0
        this.lasvegas3[i] = lasArray[this._index_name3] != 1 ? lasArray[this._index_name3] != 4 ? 1 : 0 : 0
        this.lasvegas4[i] = lasArray[this._index_name4] != 1 ? lasArray[this._index_name4] != 4 ? 1 : 0 : 0
        break;
      case 2:
        this.lasvegas1[i] = lasArray[this._index_name1] != 1 ? lasArray[this._index_name1] != 3 ? 1 : 0 : 0
        this.lasvegas2[i] = lasArray[this._index_name2] != 1 ? lasArray[this._index_name2] != 3 ? 1 : 0 : 0
        this.lasvegas3[i] = lasArray[this._index_name3] != 1 ? lasArray[this._index_name3] != 3 ? 1 : 0 : 0
        this.lasvegas4[i] = lasArray[this._index_name4] != 1 ? lasArray[this._index_name4] != 3 ? 1 : 0 : 0
        break;
      case 3:
        this.lasvegas1[i] = lasArray[this._index_name1] != 1 ? lasArray[this._index_name1] != 2 ? 1 : 0 : 0
        this.lasvegas2[i] = lasArray[this._index_name2] != 1 ? lasArray[this._index_name2] != 2 ? 1 : 0 : 0
        this.lasvegas3[i] = lasArray[this._index_name3] != 1 ? lasArray[this._index_name3] != 2 ? 1 : 0 : 0
        this.lasvegas4[i] = lasArray[this._index_name4] != 1 ? lasArray[this._index_name4] != 2 ? 1 : 0 : 0
        break;
      default:
        break;
    }
  }

  /**
   * フォームsubmit処理
   * 入力内容をFirestoreに上書きする
   * Subscribeできないため、try-catchでエラーをハンドリングする
   */
  onSubmit() {

    this.chipsUndefinedReplace()

    // リクエスト送信用にJSON作成
    this.checkoutForm = ({
      order1st: this.order1st,
      score1: this.score1,
      score2: this.score2,
      score3: this.score3,
      score4: this.score4,
      putscore1: this.putscore1,
      putscore2: this.putscore2,
      putscore3: this.putscore3,
      putscore4: this.putscore4,
      lasvegas1: this.lasvegas1,
      lasvegas2: this.lasvegas2,
      lasvegas3: this.lasvegas3,
      lasvegas4: this.lasvegas4,
      olympic1: this.olympic1,
      olympic2: this.olympic2,
      olympic3: this.olympic3,
      olympic4: this.olympic4,
      nearping1: this.nearping1,
      nearping2: this.nearping2,
      nearping3: this.nearping3,
      nearping4: this.nearping4,
      rate: this.rate,
      isOlyNearping: this.isOlyNearping,
      isLas2stories: this.isLas2stories,
      isLasPair: this.isLasPair,
      memo: this.memo
    });

    try {
      this.getSubcollection(getAuth().currentUser?.uid || '', 'scores').doc(this._id).update(this.checkoutForm)
      console.log("[log] " + new Date() + " POST Success => [Firestore Document]: " + "scores/" + this._id)
    } catch (error) {
      console.log("[log] " + new Date() + " POST Error: " + error)
      this.snackberService.openSnackBar("スコアの保存に失敗しました")
    }
  }

  /**
   * undifinedを初期値に置き換える
   * CHIPSコンポーネントは値未選択にするとundifinedになるため初期値に置き換える
   */
  chipsUndefinedReplace(){
    //オーダーが未設定の場合undefinedになるため
    //undifinedの場合は、0に置き換えてから保存する
    for(let i=0; i<=3; i++) {
      if (this.order1st[i] == undefined){
        this.order1st[i] = 0
      }
    }

    //オリンピックが未設定の場合undefinedになるため
    //undifinedの場合は、0に置き換えてから保存する
    for(let i=0; i<=17; i++) {
      if (this.olympic1[i] == undefined){
        this.olympic1[i] = 0
      }
      if (this.olympic2[i] == undefined){
        this.olympic2[i] = 0
      }
      if (this.olympic3[i] == undefined){
        this.olympic3[i] = 0
      }
      if (this.olympic4[i] == undefined){
        this.olympic4[i] = 0
      }
      if (this.nearping1[i] == undefined){
        this.nearping1[i] = 0
      }
      if (this.nearping2[i] == undefined){
        this.nearping2[i] = 0
      }
      if (this.nearping3[i] == undefined){
        this.nearping3[i] = 0
      }
      if (this.nearping4[i] == undefined){
        this.nearping4[i] = 0
      }
    }
  }

  /**
   * 必要な項目をリセット
   * ラスベガスのチームと2階建ての設定をsave()する毎にリセットする
   * 入力したスコアを削除したりすると値が変わることがあるため
   */
  resetDataset(){
    this.noStoreyNow = 0
    this.noStorey = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    this.lasvegas1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.lasvegas2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.lasvegas3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.lasvegas4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  }

  openModal() {
    const modalElement = document.getElementById('settingModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
}
