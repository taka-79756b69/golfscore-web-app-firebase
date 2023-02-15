import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scorelist',
  templateUrl: './scorelist.component.html',
  styleUrls: ['./scorelist.component.scss']
})
export class ScorelistComponent {

  //DBから取得した値のかたまり
  score: any

  //コース番号（使ってないかも）
  courseIndex: any

  //フォームデータ
  checkoutForm: any

  //レート
  olympicRate: any
  lasvegasRate: any

  //保存ダイアログ用のフラグ
  saving: any

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

  olympicTotal1_rated = 0
  olympicTotal2_rated = 0
  olympicTotal3_rated = 0
  olympicTotal4_rated = 0

  //LASVEGAS
  lasvegasTotal1 = 0
  lasvegasTotal2 = 0
  lasvegasTotal3 = 0
  lasvegasTotal4 = 0

  lasvegasTotal1_rated = 0
  lasvegasTotal2_rated = 0
  lasvegasTotal3_rated = 0
  lasvegasTotal4_rated = 0

  rateValue = 0

  validate = true

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

  course1_order1 = 0
  course1_order2 = 0
  course1_order3 = 0
  course1_order4 = 0
  course2_order1 = 0
  course2_order2 = 0
  course2_order3 = 0
  course2_order4 = 0
  course3_order1 = 0
  course3_order2 = 0
  course3_order3 = 0
  course3_order4 = 0
  course4_order1 = 0
  course4_order2 = 0
  course4_order3 = 0
  course4_order4 = 0
  course5_order1 = 0
  course5_order2 = 0
  course5_order3 = 0
  course5_order4 = 0
  course6_order1 = 0
  course6_order2 = 0
  course6_order3 = 0
  course6_order4 = 0
  course7_order1 = 0
  course7_order2 = 0
  course7_order3 = 0
  course7_order4 = 0
  course8_order1 = 0
  course8_order2 = 0
  course8_order3 = 0
  course8_order4 = 0
  course9_order1 = 0
  course9_order2 = 0
  course9_order3 = 0
  course9_order4 = 0
  course10_order1 = 0
  course10_order2 = 0
  course10_order3 = 0
  course10_order4 = 0
  course11_order1 = 0
  course11_order2 = 0
  course11_order3 = 0
  course11_order4 = 0
  course12_order1 = 0
  course12_order2 = 0
  course12_order3 = 0
  course12_order4 = 0
  course13_order1 = 0
  course13_order2 = 0
  course13_order3 = 0
  course13_order4 = 0
  course14_order1 = 0
  course14_order2 = 0
  course14_order3 = 0
  course14_order4 = 0
  course15_order1 = 0
  course15_order2 = 0
  course15_order3 = 0
  course15_order4 = 0
  course16_order1 = 0
  course16_order2 = 0
  course16_order3 = 0
  course16_order4 = 0
  course17_order1 = 0
  course17_order2 = 0
  course17_order3 = 0
  course17_order4 = 0
  course18_order1 = 0
  course18_order2 = 0
  course18_order3 = 0
  course18_order4 = 0

  //ドロップダウンのモデル
  dropDown1_1: any
  dropDown1_2: any
  dropDown1_3: any
  dropDown1_4: any
  dropDown2_1: any
  dropDown2_2: any
  dropDown2_3: any
  dropDown2_4: any
  dropDown3_1: any
  dropDown3_2: any
  dropDown3_3: any
  dropDown3_4: any
  dropDown4_1: any
  dropDown4_2: any
  dropDown4_3: any
  dropDown4_4: any
  dropDown5_1: any
  dropDown5_2: any
  dropDown5_3: any
  dropDown5_4: any
  dropDown6_1: any
  dropDown6_2: any
  dropDown6_3: any
  dropDown6_4: any
  dropDown7_1: any
  dropDown7_2: any
  dropDown7_3: any
  dropDown7_4: any
  dropDown8_1: any
  dropDown8_2: any
  dropDown8_3: any
  dropDown8_4: any
  dropDown9_1: any
  dropDown9_2: any
  dropDown9_3: any
  dropDown9_4: any
  dropDown10_1: any
  dropDown10_2: any
  dropDown10_3: any
  dropDown10_4: any
  dropDown11_1: any
  dropDown11_2: any
  dropDown11_3: any
  dropDown11_4: any
  dropDown12_1: any
  dropDown12_2: any
  dropDown12_3: any
  dropDown12_4: any
  dropDown13_1: any
  dropDown13_2: any
  dropDown13_3: any
  dropDown13_4: any
  dropDown14_1: any
  dropDown14_2: any
  dropDown14_3: any
  dropDown14_4: any
  dropDown15_1: any
  dropDown15_2: any
  dropDown15_3: any
  dropDown15_4: any
  dropDown16_1: any
  dropDown16_2: any
  dropDown16_3: any
  dropDown16_4: any
  dropDown17_1: any
  dropDown17_2: any
  dropDown17_3: any
  dropDown17_4: any
  dropDown18_1: any
  dropDown18_2: any
  dropDown18_3: any
  dropDown18_4: any
  order1_1: any
  order1_2: any
  order1_3: any
  order1_4: any

  //ラジオボタンのモデル
  radioBtn1_1: any
  radioBtn1_2: any
  radioBtn1_3: any
  radioBtn1_4: any
  radioBtn2_1: any
  radioBtn2_2: any
  radioBtn2_3: any
  radioBtn2_4: any
  radioBtn3_1: any
  radioBtn3_2: any
  radioBtn3_3: any
  radioBtn3_4: any
  radioBtn4_1: any
  radioBtn4_2: any
  radioBtn4_3: any
  radioBtn4_4: any
  radioBtn5_1: any
  radioBtn5_2: any
  radioBtn5_3: any
  radioBtn5_4: any
  radioBtn6_1: any
  radioBtn6_2: any
  radioBtn6_3: any
  radioBtn6_4: any
  radioBtn7_1: any
  radioBtn7_2: any
  radioBtn7_3: any
  radioBtn7_4: any
  radioBtn8_1: any
  radioBtn8_2: any
  radioBtn8_3: any
  radioBtn8_4: any
  radioBtn9_1: any
  radioBtn9_2: any
  radioBtn9_3: any
  radioBtn9_4: any
  radioBtn10_1: any
  radioBtn10_2: any
  radioBtn10_3: any
  radioBtn10_4: any
  radioBtn11_1: any
  radioBtn11_2: any
  radioBtn11_3: any
  radioBtn11_4: any
  radioBtn12_1: any
  radioBtn12_2: any
  radioBtn12_3: any
  radioBtn12_4: any
  radioBtn13_1: any
  radioBtn13_2: any
  radioBtn13_3: any
  radioBtn13_4: any
  radioBtn14_1: any
  radioBtn14_2: any
  radioBtn14_3: any
  radioBtn14_4: any
  radioBtn15_1: any
  radioBtn15_2: any
  radioBtn15_3: any
  radioBtn15_4: any
  radioBtn16_1: any
  radioBtn16_2: any
  radioBtn16_3: any
  radioBtn16_4: any
  radioBtn17_1: any
  radioBtn17_2: any
  radioBtn17_3: any
  radioBtn17_4: any
  radioBtn18_1: any
  radioBtn18_2: any
  radioBtn18_3: any
  radioBtn18_4: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ){

    }

  ngOnInit(): void {

    //console.log("scorelist呼ばれた")

  }

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

  setLasvegasTotal() {

    //course1
    var scores: any
    scores = [
      {
        score1: this.score.course1_score1,
        team1:  this.score.course1_lasvegas1,
        score2: this.score.course1_score2,
        team2:  this.score.course1_lasvegas2,
        score3: this.score.course1_score3,
        team3:  this.score.course1_lasvegas3,
        score4: this.score.course1_score4,
        team4:  this.score.course1_lasvegas4,
      },
      {
        score1: this.score.course2_score1,
        team1:  this.score.course2_lasvegas1,
        score2: this.score.course2_score2,
        team2:  this.score.course2_lasvegas2,
        score3: this.score.course2_score3,
        team3:  this.score.course2_lasvegas3,
        score4: this.score.course2_score4,
        team4:  this.score.course2_lasvegas4,
      },
      {
        score1: this.score.course3_score1,
        team1:  this.score.course3_lasvegas1,
        score2: this.score.course3_score2,
        team2:  this.score.course3_lasvegas2,
        score3: this.score.course3_score3,
        team3:  this.score.course3_lasvegas3,
        score4: this.score.course3_score4,
        team4:  this.score.course3_lasvegas4,
      },
      {
        score1: this.score.course4_score1,
        team1:  this.score.course4_lasvegas1,
        score2: this.score.course4_score2,
        team2:  this.score.course4_lasvegas2,
        score3: this.score.course4_score3,
        team3:  this.score.course4_lasvegas3,
        score4: this.score.course4_score4,
        team4:  this.score.course4_lasvegas4,
      }
      ,
      {
        score1: this.score.course5_score1,
        team1:  this.score.course5_lasvegas1,
        score2: this.score.course5_score2,
        team2:  this.score.course5_lasvegas2,
        score3: this.score.course5_score3,
        team3:  this.score.course5_lasvegas3,
        score4: this.score.course5_score4,
        team4:  this.score.course5_lasvegas4,
      },
      {
        score1: this.score.course6_score1,
        team1:  this.score.course6_lasvegas1,
        score2: this.score.course6_score2,
        team2:  this.score.course6_lasvegas2,
        score3: this.score.course6_score3,
        team3:  this.score.course6_lasvegas3,
        score4: this.score.course6_score4,
        team4:  this.score.course6_lasvegas4,
      },
      {
        score1: this.score.course7_score1,
        team1:  this.score.course7_lasvegas1,
        score2: this.score.course7_score2,
        team2:  this.score.course7_lasvegas2,
        score3: this.score.course7_score3,
        team3:  this.score.course7_lasvegas3,
        score4: this.score.course7_score4,
        team4:  this.score.course7_lasvegas4,
      },
      {
        score1: this.score.course8_score1,
        team1:  this.score.course8_lasvegas1,
        score2: this.score.course8_score2,
        team2:  this.score.course8_lasvegas2,
        score3: this.score.course8_score3,
        team3:  this.score.course8_lasvegas3,
        score4: this.score.course8_score4,
        team4:  this.score.course8_lasvegas4,
      },
      {
        score1: this.score.course9_score1,
        team1:  this.score.course9_lasvegas1,
        score2: this.score.course9_score2,
        team2:  this.score.course9_lasvegas2,
        score3: this.score.course9_score3,
        team3:  this.score.course9_lasvegas3,
        score4: this.score.course9_score4,
        team4:  this.score.course9_lasvegas4,
      },
      {
        score1: this.score.course10_score1,
        team1:  this.score.course10_lasvegas1,
        score2: this.score.course10_score2,
        team2:  this.score.course10_lasvegas2,
        score3: this.score.course10_score3,
        team3:  this.score.course10_lasvegas3,
        score4: this.score.course10_score4,
        team4:  this.score.course10_lasvegas4,
      },
      {
        score1: this.score.course11_score1,
        team1:  this.score.course11_lasvegas1,
        score2: this.score.course11_score2,
        team2:  this.score.course11_lasvegas2,
        score3: this.score.course11_score3,
        team3:  this.score.course11_lasvegas3,
        score4: this.score.course11_score4,
        team4:  this.score.course11_lasvegas4,
      },
      {
        score1: this.score.course12_score1,
        team1:  this.score.course12_lasvegas1,
        score2: this.score.course12_score2,
        team2:  this.score.course12_lasvegas2,
        score3: this.score.course12_score3,
        team3:  this.score.course12_lasvegas3,
        score4: this.score.course12_score4,
        team4:  this.score.course12_lasvegas4,
      },
      {
        score1: this.score.course13_score1,
        team1:  this.score.course13_lasvegas1,
        score2: this.score.course13_score2,
        team2:  this.score.course13_lasvegas2,
        score3: this.score.course13_score3,
        team3:  this.score.course13_lasvegas3,
        score4: this.score.course13_score4,
        team4:  this.score.course13_lasvegas4,
      },
      {
        score1: this.score.course14_score1,
        team1:  this.score.course14_lasvegas1,
        score2: this.score.course14_score2,
        team2:  this.score.course14_lasvegas2,
        score3: this.score.course14_score3,
        team3:  this.score.course14_lasvegas3,
        score4: this.score.course14_score4,
        team4:  this.score.course14_lasvegas4,
      },
      {
        score1: this.score.course15_score1,
        team1:  this.score.course15_lasvegas1,
        score2: this.score.course15_score2,
        team2:  this.score.course15_lasvegas2,
        score3: this.score.course15_score3,
        team3:  this.score.course15_lasvegas3,
        score4: this.score.course15_score4,
        team4:  this.score.course15_lasvegas4,
      },
      {
        score1: this.score.course16_score1,
        team1:  this.score.course16_lasvegas1,
        score2: this.score.course16_score2,
        team2:  this.score.course16_lasvegas2,
        score3: this.score.course16_score3,
        team3:  this.score.course16_lasvegas3,
        score4: this.score.course16_score4,
        team4:  this.score.course16_lasvegas4,
      },
      {
        score1: this.score.course17_score1,
        team1:  this.score.course17_lasvegas1,
        score2: this.score.course17_score2,
        team2:  this.score.course17_lasvegas2,
        score3: this.score.course17_score3,
        team3:  this.score.course17_lasvegas3,
        score4: this.score.course17_score4,
        team4:  this.score.course17_lasvegas4,
      },
      {
        score1: this.score.course18_score1,
        team1:  this.score.course18_lasvegas1,
        score2: this.score.course18_score2,
        team2:  this.score.course18_lasvegas2,
        score3: this.score.course18_score3,
        team3:  this.score.course18_lasvegas3,
        score4: this.score.course18_score4,
        team4:  this.score.course18_lasvegas4,
      }

      //コースごとにTeamAとBに分ける？
      //
    ]

    //初期化しておく
    this.lasvegasTotal1 = 0
    this.lasvegasTotal2 = 0
    this.lasvegasTotal3 = 0
    this.lasvegasTotal4 = 0

    for (let score of scores) {

      var teamA: number[] = new Array()
      var teamB: number[] = new Array()

      if(score.score1 != 0 && score.score2 != 0 && score.score3 != 0 && score.score4 != 0){
        if(score.team1 == 0){
          if(score.score1 < 10){
            teamA.push(+score.score1)
          }else{
            teamA.push(9)
          }
        }else{
          if(score.score1 < 10){
            teamB.push(+score.score1)
          }else{
            teamB.push(9)
          }
        }
        if(score.team2 == 0){
          if(score.score2 < 10){
            teamA.push(+score.score2)
          }else{
            teamA.push(9)
          }
        }else{
          if(score.score2 < 10){
            teamB.push(+score.score2)
          }else{
            teamB.push(9)
          }
        }
        if(score.team3 == 0){
          if(score.score3 < 10){
            teamA.push(+score.score3)
          }else{
            teamA.push(9)
          }
        }else{
          if(score.score3 < 10){
            teamB.push(+score.score3)
          }else{
            teamB.push(9)
          }
        }
        if(score.team4 == 0){
          if(score.score4 < 10){
            teamA.push(+score.score4)
          }else{
            teamA.push(9)
          }
        }else{
          if(score.score4 < 10){
            teamB.push(+score.score4)
          }else{
            teamB.push(9)
          }
        }

        if(score.team1 == 0){
          this.lasvegasTotal1 = this.lasvegasTotal1 + (this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA))
        }else{
          this.lasvegasTotal1 = this.lasvegasTotal1 + (this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB))
        }

        if(score.team2 == 0){
          this.lasvegasTotal2 = this.lasvegasTotal2 + (this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA))
        }else{
          this.lasvegasTotal2 = this.lasvegasTotal2 + (this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB))
        }

        if(score.team3 == 0){
          this.lasvegasTotal3 = this.lasvegasTotal3 + (this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA))
        }else{
          this.lasvegasTotal3 = this.lasvegasTotal3 + (this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB))
        }

        if(score.team4 == 0){
          this.lasvegasTotal4 = this.lasvegasTotal4 + (this.getLasTeamScore(teamB) - this.getLasTeamScore(teamA))
        }else{
          this.lasvegasTotal4 = this.lasvegasTotal4 + (this.getLasTeamScore(teamA) - this.getLasTeamScore(teamB))
        }
      }
    }
  }

  getLasTeamScore(score:any){

    if(score[0] < score[1]){
      return (score[0] * 10 + score[1])
    }else{
      return (score[1] * 10 + score[0])
    }
  }

  setOlympicTotal() {

    var countMember: any
    var tmp1: any
    var tmp2: any
    var tmp3: any
    var tmp4: any

    countMember = 0

    if(this.score.name2 != "")
      countMember++

    if(this.score.name3 != "")
      countMember++

    if(this.score.name4 != "")
      countMember++

    if(countMember == 0){
      //オリンピックのメンバーが1人の場合は不成立
      this.olympicTotal1 = 0
      this.olympicTotal2 = 0
      this.olympicTotal3 = 0
      this.olympicTotal4 = 0
      return
    }

    this.olympicTotal1 = (
      +this.score.course1_olympic1 +
      +this.score.course2_olympic1 +
      +this.score.course3_olympic1 +
      +this.score.course4_olympic1 +
      +this.score.course5_olympic1 +
      +this.score.course6_olympic1 +
      +this.score.course7_olympic1 +
      +this.score.course8_olympic1 +
      +this.score.course9_olympic1 +
      +this.score.course10_olympic1 +
      +this.score.course11_olympic1 +
      +this.score.course12_olympic1 +
      +this.score.course13_olympic1 +
      +this.score.course14_olympic1 +
      +this.score.course15_olympic1 +
      +this.score.course16_olympic1 +
      +this.score.course17_olympic1 +
      +this.score.course18_olympic1
    )
    this.olympicTotal2 = (
      +this.score.course1_olympic2 +
      +this.score.course2_olympic2 +
      +this.score.course3_olympic2 +
      +this.score.course4_olympic2 +
      +this.score.course5_olympic2 +
      +this.score.course6_olympic2 +
      +this.score.course7_olympic2 +
      +this.score.course8_olympic2 +
      +this.score.course9_olympic2 +
      +this.score.course10_olympic2 +
      +this.score.course11_olympic2 +
      +this.score.course12_olympic2 +
      +this.score.course13_olympic2 +
      +this.score.course14_olympic2 +
      +this.score.course15_olympic2 +
      +this.score.course16_olympic2 +
      +this.score.course17_olympic2 +
      +this.score.course18_olympic2
    )
    this.olympicTotal3 = (
      +this.score.course1_olympic3 +
      +this.score.course2_olympic3 +
      +this.score.course3_olympic3 +
      +this.score.course4_olympic3 +
      +this.score.course5_olympic3 +
      +this.score.course6_olympic3 +
      +this.score.course7_olympic3 +
      +this.score.course8_olympic3 +
      +this.score.course9_olympic3 +
      +this.score.course10_olympic3 +
      +this.score.course11_olympic3 +
      +this.score.course12_olympic3 +
      +this.score.course13_olympic3 +
      +this.score.course14_olympic3 +
      +this.score.course15_olympic3 +
      +this.score.course16_olympic3 +
      +this.score.course17_olympic3 +
      +this.score.course18_olympic3
    )
    this.olympicTotal4 = (
      +this.score.course1_olympic4 +
      +this.score.course2_olympic4 +
      +this.score.course3_olympic4 +
      +this.score.course4_olympic4 +
      +this.score.course5_olympic4 +
      +this.score.course6_olympic4 +
      +this.score.course7_olympic4 +
      +this.score.course8_olympic4 +
      +this.score.course9_olympic4 +
      +this.score.course10_olympic4 +
      +this.score.course11_olympic4 +
      +this.score.course12_olympic4 +
      +this.score.course13_olympic4 +
      +this.score.course14_olympic4 +
      +this.score.course15_olympic4 +
      +this.score.course16_olympic4 +
      +this.score.course17_olympic4 +
      +this.score.course18_olympic4
    )

    if(countMember == 3){
      tmp1 = this.olympicTotal1 * countMember - (this.olympicTotal2 + this.olympicTotal3 + this.olympicTotal4)
      tmp2 = this.olympicTotal2 * countMember - (this.olympicTotal1 + this.olympicTotal3 + this.olympicTotal4)
      tmp3 = this.olympicTotal3 * countMember - (this.olympicTotal1 + this.olympicTotal2 + this.olympicTotal4)
      tmp4 = this.olympicTotal4 * countMember - (this.olympicTotal1 + this.olympicTotal2 + this.olympicTotal3)
    }

    if(countMember == 2){
      tmp1 = this.olympicTotal1 * countMember - (this.olympicTotal2 + this.olympicTotal3 )
      tmp2 = this.olympicTotal2 * countMember - (this.olympicTotal1 + this.olympicTotal3 )
      tmp3 = this.olympicTotal3 * countMember - (this.olympicTotal1 + this.olympicTotal2 )
    }

    if(countMember == 1){
      tmp1 = this.olympicTotal1 * countMember - this.olympicTotal2
      tmp2 = this.olympicTotal2 * countMember - this.olympicTotal1
    }

    this.olympicTotal1 = tmp1
    this.olympicTotal2 = tmp2
    this.olympicTotal3 = tmp3
    this.olympicTotal4 = tmp4
  }

  initDataSet() {

    //ドロップダウンの初期値セット
    this.dropDown1_1 = this.score.course1_olympic1
    this.dropDown1_2 = this.score.course1_olympic2
    this.dropDown1_3 = this.score.course1_olympic3
    this.dropDown1_4 = this.score.course1_olympic4
    this.dropDown2_1 = this.score.course2_olympic1
    this.dropDown2_2 = this.score.course2_olympic2
    this.dropDown2_3 = this.score.course2_olympic3
    this.dropDown2_4 = this.score.course2_olympic4
    this.dropDown3_1 = this.score.course3_olympic1
    this.dropDown3_2 = this.score.course3_olympic2
    this.dropDown3_3 = this.score.course3_olympic3
    this.dropDown3_4 = this.score.course3_olympic4
    this.dropDown4_1 = this.score.course4_olympic1
    this.dropDown4_2 = this.score.course4_olympic2
    this.dropDown4_3 = this.score.course4_olympic3
    this.dropDown4_4 = this.score.course4_olympic4
    this.dropDown5_1 = this.score.course5_olympic1
    this.dropDown5_2 = this.score.course5_olympic2
    this.dropDown5_3 = this.score.course5_olympic3
    this.dropDown5_4 = this.score.course5_olympic4
    this.dropDown6_1 = this.score.course6_olympic1
    this.dropDown6_2 = this.score.course6_olympic2
    this.dropDown6_3 = this.score.course6_olympic3
    this.dropDown6_4 = this.score.course6_olympic4
    this.dropDown7_1 = this.score.course7_olympic1
    this.dropDown7_2 = this.score.course7_olympic2
    this.dropDown7_3 = this.score.course7_olympic3
    this.dropDown7_4 = this.score.course7_olympic4
    this.dropDown8_1 = this.score.course8_olympic1
    this.dropDown8_2 = this.score.course8_olympic2
    this.dropDown8_3 = this.score.course8_olympic3
    this.dropDown8_4 = this.score.course8_olympic4
    this.dropDown9_1 = this.score.course9_olympic1
    this.dropDown9_2 = this.score.course9_olympic2
    this.dropDown9_3 = this.score.course9_olympic3
    this.dropDown9_4 = this.score.course9_olympic4
    this.dropDown10_1 = this.score.course10_olympic1
    this.dropDown10_2 = this.score.course10_olympic2
    this.dropDown10_3 = this.score.course10_olympic3
    this.dropDown10_4 = this.score.course10_olympic4
    this.dropDown11_1 = this.score.course11_olympic1
    this.dropDown11_2 = this.score.course11_olympic2
    this.dropDown11_3 = this.score.course11_olympic3
    this.dropDown11_4 = this.score.course11_olympic4
    this.dropDown12_1 = this.score.course12_olympic1
    this.dropDown12_2 = this.score.course12_olympic2
    this.dropDown12_3 = this.score.course12_olympic3
    this.dropDown12_4 = this.score.course12_olympic4
    this.dropDown13_1 = this.score.course13_olympic1
    this.dropDown13_2 = this.score.course13_olympic2
    this.dropDown13_3 = this.score.course13_olympic3
    this.dropDown13_4 = this.score.course13_olympic4
    this.dropDown14_1 = this.score.course14_olympic1
    this.dropDown14_2 = this.score.course14_olympic2
    this.dropDown14_3 = this.score.course14_olympic3
    this.dropDown14_4 = this.score.course14_olympic4
    this.dropDown15_1 = this.score.course15_olympic1
    this.dropDown15_2 = this.score.course15_olympic2
    this.dropDown15_3 = this.score.course15_olympic3
    this.dropDown15_4 = this.score.course15_olympic4
    this.dropDown16_1 = this.score.course16_olympic1
    this.dropDown16_2 = this.score.course16_olympic2
    this.dropDown16_3 = this.score.course16_olympic3
    this.dropDown16_4 = this.score.course16_olympic4
    this.dropDown17_1 = this.score.course17_olympic1
    this.dropDown17_2 = this.score.course17_olympic2
    this.dropDown17_3 = this.score.course17_olympic3
    this.dropDown17_4 = this.score.course17_olympic4
    this.dropDown18_1 = this.score.course18_olympic1
    this.dropDown18_2 = this.score.course18_olympic2
    this.dropDown18_3 = this.score.course18_olympic3
    this.dropDown18_4 = this.score.course18_olympic4
    this.order1_1 = this.score.course1_order1
    this.order1_2 = this.score.course1_order2
    this.order1_3 = this.score.course1_order3
    this.order1_4 = this.score.course1_order4

    //ラジオボタンの初期値セット
    this.radioBtn1_1 = this.score.course1_lasvegas1
    this.radioBtn1_2 = this.score.course1_lasvegas2
    this.radioBtn1_3 = this.score.course1_lasvegas3
    this.radioBtn1_4 = this.score.course1_lasvegas4
    this.radioBtn2_1 = this.score.course2_lasvegas1
    this.radioBtn2_2 = this.score.course2_lasvegas2
    this.radioBtn2_3 = this.score.course2_lasvegas3
    this.radioBtn2_4 = this.score.course2_lasvegas4
    this.radioBtn3_1 = this.score.course3_lasvegas1
    this.radioBtn3_2 = this.score.course3_lasvegas2
    this.radioBtn3_3 = this.score.course3_lasvegas3
    this.radioBtn3_4 = this.score.course3_lasvegas4
    this.radioBtn4_1 = this.score.course4_lasvegas1
    this.radioBtn4_2 = this.score.course4_lasvegas2
    this.radioBtn4_3 = this.score.course4_lasvegas3
    this.radioBtn4_4 = this.score.course4_lasvegas4
    this.radioBtn5_1 = this.score.course5_lasvegas1
    this.radioBtn5_2 = this.score.course5_lasvegas2
    this.radioBtn5_3 = this.score.course5_lasvegas3
    this.radioBtn5_4 = this.score.course5_lasvegas4
    this.radioBtn6_1 = this.score.course6_lasvegas1
    this.radioBtn6_2 = this.score.course6_lasvegas2
    this.radioBtn6_3 = this.score.course6_lasvegas3
    this.radioBtn6_4 = this.score.course6_lasvegas4
    this.radioBtn7_1 = this.score.course7_lasvegas1
    this.radioBtn7_2 = this.score.course7_lasvegas2
    this.radioBtn7_3 = this.score.course7_lasvegas3
    this.radioBtn7_4 = this.score.course7_lasvegas4
    this.radioBtn8_1 = this.score.course8_lasvegas1
    this.radioBtn8_2 = this.score.course8_lasvegas2
    this.radioBtn8_3 = this.score.course8_lasvegas3
    this.radioBtn8_4 = this.score.course8_lasvegas4
    this.radioBtn9_1 = this.score.course9_lasvegas1
    this.radioBtn9_2 = this.score.course9_lasvegas2
    this.radioBtn9_3 = this.score.course9_lasvegas3
    this.radioBtn9_4 = this.score.course9_lasvegas4
    this.radioBtn10_1 = this.score.course10_lasvegas1
    this.radioBtn10_2 = this.score.course10_lasvegas2
    this.radioBtn10_3 = this.score.course10_lasvegas3
    this.radioBtn10_4 = this.score.course10_lasvegas4
    this.radioBtn11_1 = this.score.course11_lasvegas1
    this.radioBtn11_2 = this.score.course11_lasvegas2
    this.radioBtn11_3 = this.score.course11_lasvegas3
    this.radioBtn11_4 = this.score.course11_lasvegas4
    this.radioBtn12_1 = this.score.course12_lasvegas1
    this.radioBtn12_2 = this.score.course12_lasvegas2
    this.radioBtn12_3 = this.score.course12_lasvegas3
    this.radioBtn12_4 = this.score.course12_lasvegas4
    this.radioBtn13_1 = this.score.course13_lasvegas1
    this.radioBtn13_2 = this.score.course13_lasvegas2
    this.radioBtn13_3 = this.score.course13_lasvegas3
    this.radioBtn13_4 = this.score.course13_lasvegas4
    this.radioBtn14_1 = this.score.course14_lasvegas1
    this.radioBtn14_2 = this.score.course14_lasvegas2
    this.radioBtn14_3 = this.score.course14_lasvegas3
    this.radioBtn14_4 = this.score.course14_lasvegas4
    this.radioBtn15_1 = this.score.course15_lasvegas1
    this.radioBtn15_2 = this.score.course15_lasvegas2
    this.radioBtn15_3 = this.score.course15_lasvegas3
    this.radioBtn15_4 = this.score.course15_lasvegas4
    this.radioBtn16_1 = this.score.course16_lasvegas1
    this.radioBtn16_2 = this.score.course16_lasvegas2
    this.radioBtn16_3 = this.score.course16_lasvegas3
    this.radioBtn16_4 = this.score.course16_lasvegas4
    this.radioBtn17_1 = this.score.course17_lasvegas1
    this.radioBtn17_2 = this.score.course17_lasvegas2
    this.radioBtn17_3 = this.score.course17_lasvegas3
    this.radioBtn17_4 = this.score.course17_lasvegas4
    this.radioBtn18_1 = this.score.course18_lasvegas1
    this.radioBtn18_2 = this.score.course18_lasvegas2
    this.radioBtn18_3 = this.score.course18_lasvegas3
    this.radioBtn18_4 = this.score.course18_lasvegas4

    // this.outTotal1 = (
    //   this.score.course1_score1 + this.score.course2_score1 + this.score.course3_score1 +
    //   this.score.course4_score1 + this.score.course5_score1 + this.score.course6_score1 +
    //   this.score.course7_score1 + this.score.course8_score1 + this.score.course9_score1
    //   )

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
    this.setBadgeOrder()
    this.checkOrder()
  }

  //スコア合計をセット
  setTotal1() {
    return this.setOutTotal1() + this.setInTotal1()
  }
  setTotal2() {
    return this.setOutTotal2() + this.setInTotal2()
  }
  setTotal3() {
    return this.setOutTotal3() + this.setInTotal3()
  }
  setTotal4() {
    return this.setOutTotal4() + this.setInTotal4()
  }

  setOutTotal1() {
    return this.score.course1_score1 + this.score.course2_score1 + this.score.course3_score1
    + this.score.course4_score1 + this.score.course5_score1 + this.score.course6_score1
    + this.score.course7_score1 + this.score.course8_score1 + this.score.course9_score1
  }

  setInTotal1() {
    return this.score.course10_score1 + this.score.course11_score1 + this.score.course12_score1
    + this.score.course13_score1 + this.score.course14_score1 + this.score.course15_score1
    + this.score.course16_score1 + this.score.course17_score1 + this.score.course18_score1
  }

  setOutTotal2() {
    return this.score.course1_score2 + this.score.course2_score2 + this.score.course3_score2
    + this.score.course4_score2 + this.score.course5_score2 + this.score.course6_score2
    + this.score.course7_score2 + this.score.course8_score2 + this.score.course9_score2
  }

  setInTotal2() {
    return this.score.course10_score2 + this.score.course11_score2 + this.score.course12_score2
    + this.score.course13_score2 + this.score.course14_score2 + this.score.course15_score2
    + this.score.course16_score2 + this.score.course17_score2 + this.score.course18_score2
  }

  setOutTotal3() {
    return this.score.course1_score3 + this.score.course2_score3 + this.score.course3_score3
    + this.score.course4_score3 + this.score.course5_score3 + this.score.course6_score3
    + this.score.course7_score3 + this.score.course8_score3 + this.score.course9_score3
  }

  setInTotal3() {
    return this.score.course10_score3 + this.score.course11_score3 + this.score.course12_score3
    + this.score.course13_score3 + this.score.course14_score3 + this.score.course15_score3
    + this.score.course16_score3 + this.score.course17_score3 + this.score.course18_score3
  }

  setOutTotal4() {
    return this.score.course1_score4 + this.score.course2_score4 + this.score.course3_score4
    + this.score.course4_score4 + this.score.course5_score4 + this.score.course6_score4
    + this.score.course7_score4 + this.score.course8_score4 + this.score.course9_score4
  }

  setInTotal4() {
    return this.score.course10_score4 + this.score.course11_score4 + this.score.course12_score4
    + this.score.course13_score4 + this.score.course14_score4 + this.score.course15_score4
    + this.score.course16_score4 + this.score.course17_score4 + this.score.course18_score4
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
      course1_order1: this.order1_1,
      course1_score2: this.score.course1_score2,
      course1_put2: this.score.course1_put2,
      course1_olympic2: this.score.course1_olympic2,
      course1_lasvegas2: this.score.course1_lasvegas2,
      course1_order2: this.order1_2,
      course1_score3: this.score.course1_score3,
      course1_put3: this.score.course1_put3,
      course1_olympic3: this.score.course1_olympic3,
      course1_lasvegas3: this.score.course1_lasvegas3,
      course1_order3: this.order1_3,
      course1_score4: this.score.course1_score4,
      course1_put4: this.score.course1_put4,
      course1_olympic4: this.score.course1_olympic4,
      course1_lasvegas4: this.score.course1_lasvegas4,
      course1_order4: this.order1_4,

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

  //ドロップダウンの変更イベント
  cngDropDown1_1(){
    this.score.course1_olympic1 = this.dropDown1_1
  }
  cngDropDown1_2(){
    this.score.course1_olympic2 = this.dropDown1_2
  }
  cngDropDown1_3(){
    this.score.course1_olympic3 = this.dropDown1_3
  }
  cngDropDown1_4(){
    this.score.course1_olympic4 = this.dropDown1_4
  }
  cngDropDown2_1(){
    this.score.course2_olympic1 = this.dropDown2_1
  }
  cngDropDown2_2(){
    this.score.course2_olympic2 = this.dropDown2_2
  }
  cngDropDown2_3(){
    this.score.course2_olympic3 = this.dropDown2_3
  }
  cngDropDown2_4(){
    this.score.course2_olympic4 = this.dropDown2_4
  }
  cngDropDown3_1(){
    this.score.course3_olympic1 = this.dropDown3_1
  }
  cngDropDown3_2(){
    this.score.course3_olympic2 = this.dropDown3_2
  }
  cngDropDown3_3(){
    this.score.course3_olympic3 = this.dropDown3_3
  }
  cngDropDown3_4(){
    this.score.course3_olympic4 = this.dropDown3_4
  }
  cngDropDown4_1(){
    this.score.course4_olympic1 = this.dropDown4_1
  }
  cngDropDown4_2(){
    this.score.course4_olympic2 = this.dropDown4_2
  }
  cngDropDown4_3(){
    this.score.course4_olympic3 = this.dropDown4_3
  }
  cngDropDown4_4(){
    this.score.course4_olympic4 = this.dropDown4_4
  }
  cngDropDown5_1(){
    this.score.course5_olympic1 = this.dropDown5_1
  }
  cngDropDown5_2(){
    this.score.course5_olympic2 = this.dropDown5_2
  }
  cngDropDown5_3(){
    this.score.course5_olympic3 = this.dropDown5_3
  }
  cngDropDown5_4(){
    this.score.course5_olympic4 = this.dropDown5_4
  }
  cngDropDown6_1(){
    this.score.course6_olympic1 = this.dropDown6_1
  }
  cngDropDown6_2(){
    this.score.course6_olympic2 = this.dropDown6_2
  }
  cngDropDown6_3(){
    this.score.course6_olympic3 = this.dropDown6_3
  }
  cngDropDown6_4(){
    this.score.course6_olympic4 = this.dropDown6_4
  }
  cngDropDown7_1(){
    this.score.course7_olympic1 = this.dropDown7_1
  }
  cngDropDown7_2(){
    this.score.course7_olympic2 = this.dropDown7_2
  }
  cngDropDown7_3(){
    this.score.course7_olympic3 = this.dropDown7_3
  }
  cngDropDown7_4(){
    this.score.course7_olympic4 = this.dropDown7_4
  }
  cngDropDown8_1(){
    this.score.course8_olympic1 = this.dropDown8_1
  }
  cngDropDown8_2(){
    this.score.course8_olympic2 = this.dropDown8_2
  }
  cngDropDown8_3(){
    this.score.course8_olympic3 = this.dropDown8_3
  }
  cngDropDown8_4(){
    this.score.course8_olympic4 = this.dropDown8_4
  }
  cngDropDown9_1(){
    this.score.course9_olympic1 = this.dropDown9_1
  }
  cngDropDown9_2(){
    this.score.course9_olympic2 = this.dropDown9_2
  }
  cngDropDown9_3(){
    this.score.course9_olympic3 = this.dropDown9_3
  }
  cngDropDown9_4(){
    this.score.course9_olympic4 = this.dropDown9_4
  }
  cngDropDown10_1(){
    this.score.course10_olympic1 = this.dropDown10_1
  }
  cngDropDown10_2(){
    this.score.course10_olympic2 = this.dropDown10_2
  }
  cngDropDown10_3(){
    this.score.course10_olympic3 = this.dropDown10_3
  }
  cngDropDown10_4(){
    this.score.course10_olympic4 = this.dropDown10_4
  }
  cngDropDown11_1(){
    this.score.course11_olympic1 = this.dropDown11_1
  }
  cngDropDown11_2(){
    this.score.course11_olympic2 = this.dropDown11_2
  }
  cngDropDown11_3(){
    this.score.course11_olympic3 = this.dropDown11_3
  }
  cngDropDown11_4(){
    this.score.course11_olympic4 = this.dropDown11_4
  }
  cngDropDown12_1(){
    this.score.course12_olympic1 = this.dropDown12_1
  }
  cngDropDown12_2(){
    this.score.course12_olympic2 = this.dropDown12_2
  }
  cngDropDown12_3(){
    this.score.course12_olympic3 = this.dropDown12_3
  }
  cngDropDown12_4(){
    this.score.course12_olympic4 = this.dropDown12_4
  }
  cngDropDown13_1(){
    this.score.course13_olympic1 = this.dropDown13_1
  }
  cngDropDown13_2(){
    this.score.course13_olympic2 = this.dropDown13_2
  }
  cngDropDown13_3(){
    this.score.course13_olympic3 = this.dropDown13_3
  }
  cngDropDown13_4(){
    this.score.course13_olympic4 = this.dropDown13_4
  }
  cngDropDown14_1(){
    this.score.course14_olympic1 = this.dropDown14_1
  }
  cngDropDown14_2(){
    this.score.course14_olympic2 = this.dropDown14_2
  }
  cngDropDown14_3(){
    this.score.course14_olympic3 = this.dropDown14_3
  }
  cngDropDown14_4(){
    this.score.course14_olympic4 = this.dropDown14_4
  }
  cngDropDown15_1(){
    this.score.course15_olympic1 = this.dropDown15_1
  }
  cngDropDown15_2(){
    this.score.course15_olympic2 = this.dropDown15_2
  }
  cngDropDown15_3(){
    this.score.course15_olympic3 = this.dropDown15_3
  }
  cngDropDown15_4(){
    this.score.course15_olympic4 = this.dropDown15_4
  }
  cngDropDown16_1(){
    this.score.course16_olympic1 = this.dropDown16_1
  }
  cngDropDown16_2(){
    this.score.course16_olympic2 = this.dropDown16_2
  }
  cngDropDown16_3(){
    this.score.course16_olympic3 = this.dropDown16_3
  }
  cngDropDown16_4(){
    this.score.course16_olympic4 = this.dropDown16_4
  }
  cngDropDown17_1(){
    this.score.course17_olympic1 = this.dropDown17_1
  }
  cngDropDown17_2(){
    this.score.course17_olympic2 = this.dropDown17_2
  }
  cngDropDown17_3(){
    this.score.course17_olympic3 = this.dropDown17_3
  }
  cngDropDown17_4(){
    this.score.course17_olympic4 = this.dropDown17_4
  }
  cngDropDown18_1(){
    this.score.course18_olympic1 = this.dropDown18_1
  }
  cngDropDown18_2(){
    this.score.course18_olympic2 = this.dropDown18_2
  }
  cngDropDown18_3(){
    this.score.course18_olympic3 = this.dropDown18_3
  }
  cngDropDown18_4(){
    this.score.course18_olympic4 = this.dropDown18_4
  }

  //最初のコースは手で順番を入れる必要がある
  cngOrder1_1() {
    this.course1_order1 = this.order1_1
    this.checkOrder()
  }
  cngOrder1_2() {
    this.course1_order2 = this.order1_2
    this.checkOrder()
  }
  cngOrder1_3() {
    this.course1_order3 = this.order1_3
    this.checkOrder()
  }
  cngOrder1_4() {
    this.course1_order4 = this.order1_4
    this.checkOrder()
  }

  checkOrder() {

    this.validate = true
    if (( +this.order1_1 +
         +this.order1_2 +
         +this.order1_3 + +this.order1_4) != 10) {
      //error
    } else {
      this.validate = false
    }
  }

  //ラジオボタンの変更イベント
  cngRdioBtn1_1(){
    this.score.course1_lasvegas1 = this.radioBtn1_1
  }
  cngRdioBtn1_2(){
    this.score.course1_lasvegas2 = this.radioBtn1_2
  }
  cngRdioBtn1_3(){
    this.score.course1_lasvegas3 = this.radioBtn1_3
  }
  cngRdioBtn1_4(){
    this.score.course1_lasvegas4 = this.radioBtn1_4
  }
  cngRdioBtn2_1(){
    this.score.course2_lasvegas1 = this.radioBtn2_1
  }
  cngRdioBtn2_2(){
    this.score.course2_lasvegas2 = this.radioBtn2_2
  }
  cngRdioBtn2_3(){
    this.score.course2_lasvegas3 = this.radioBtn2_3
  }
  cngRdioBtn2_4(){
    this.score.course2_lasvegas4 = this.radioBtn2_4
  }
  cngRdioBtn3_1(){
    this.score.course3_lasvegas1 = this.radioBtn3_1
  }
  cngRdioBtn3_2(){
    this.score.course3_lasvegas2 = this.radioBtn3_2
  }
  cngRdioBtn3_3(){
    this.score.course3_lasvegas3 = this.radioBtn3_3
  }
  cngRdioBtn3_4(){
    this.score.course3_lasvegas4 = this.radioBtn3_4
  }
  cngRdioBtn4_1(){
    this.score.course4_lasvegas1 = this.radioBtn4_1
  }
  cngRdioBtn4_2(){
    this.score.course4_lasvegas2 = this.radioBtn4_2
  }
  cngRdioBtn4_3(){
    this.score.course4_lasvegas3 = this.radioBtn4_3
  }
  cngRdioBtn4_4(){
    this.score.course4_lasvegas4 = this.radioBtn4_4
  }
  cngRdioBtn5_1(){
    this.score.course5_lasvegas1 = this.radioBtn5_1
  }
  cngRdioBtn5_2(){
    this.score.course5_lasvegas2 = this.radioBtn5_2
  }
  cngRdioBtn5_3(){
    this.score.course5_lasvegas3 = this.radioBtn5_3
  }
  cngRdioBtn5_4(){
    this.score.course5_lasvegas4 = this.radioBtn5_4
  }
  cngRdioBtn6_1(){
    this.score.course6_lasvegas1 = this.radioBtn6_1
  }
  cngRdioBtn6_2(){
    this.score.course6_lasvegas2 = this.radioBtn6_2
  }
  cngRdioBtn6_3(){
    this.score.course6_lasvegas3 = this.radioBtn6_3
  }
  cngRdioBtn6_4(){
    this.score.course6_lasvegas4 = this.radioBtn6_4
  }
  cngRdioBtn7_1(){
    this.score.course7_lasvegas1 = this.radioBtn7_1
  }
  cngRdioBtn7_2(){
    this.score.course7_lasvegas2 = this.radioBtn7_2
  }
  cngRdioBtn7_3(){
    this.score.course7_lasvegas3 = this.radioBtn7_3
  }
  cngRdioBtn7_4(){
    this.score.course7_lasvegas4 = this.radioBtn7_4
  }
  cngRdioBtn8_1(){
    this.score.course8_lasvegas1 = this.radioBtn8_1
  }
  cngRdioBtn8_2(){
    this.score.course8_lasvegas2 = this.radioBtn8_2
  }
  cngRdioBtn8_3(){
    this.score.course8_lasvegas3 = this.radioBtn8_3
  }
  cngRdioBtn8_4(){
    this.score.course8_lasvegas4 = this.radioBtn8_4
  }
  cngRdioBtn9_1(){
    this.score.course9_lasvegas1 = this.radioBtn9_1
  }
  cngRdioBtn9_2(){
    this.score.course9_lasvegas2 = this.radioBtn9_2
  }
  cngRdioBtn9_3(){
    this.score.course9_lasvegas3 = this.radioBtn9_3
  }
  cngRdioBtn9_4(){
    this.score.course9_lasvegas4 = this.radioBtn9_4
  }
  cngRdioBtn10_1(){
    this.score.course10_lasvegas1 = this.radioBtn10_1
  }
  cngRdioBtn10_2(){
    this.score.course10_lasvegas2 = this.radioBtn10_2
  }
  cngRdioBtn10_3(){
    this.score.course10_lasvegas3 = this.radioBtn10_3
  }
  cngRdioBtn10_4(){
    this.score.course10_lasvegas4 = this.radioBtn10_4
  }
  cngRdioBtn11_1(){
    this.score.course11_lasvegas1 = this.radioBtn11_1
  }
  cngRdioBtn11_2(){
    this.score.course11_lasvegas2 = this.radioBtn11_2
  }
  cngRdioBtn11_3(){
    this.score.course11_lasvegas3 = this.radioBtn11_3
  }
  cngRdioBtn11_4(){
    this.score.course11_lasvegas4 = this.radioBtn11_4
  }
  cngRdioBtn12_1(){
    this.score.course12_lasvegas1 = this.radioBtn12_1
  }
  cngRdioBtn12_2(){
    this.score.course12_lasvegas2 = this.radioBtn12_2
  }
  cngRdioBtn12_3(){
    this.score.course12_lasvegas3 = this.radioBtn12_3
  }
  cngRdioBtn12_4(){
    this.score.course12_lasvegas4 = this.radioBtn12_4
  }
  cngRdioBtn13_1(){
    this.score.course13_lasvegas1 = this.radioBtn13_1
  }
  cngRdioBtn13_2(){
    this.score.course13_lasvegas2 = this.radioBtn13_2
  }
  cngRdioBtn13_3(){
    this.score.course13_lasvegas3 = this.radioBtn13_3
  }
  cngRdioBtn13_4(){
    this.score.course13_lasvegas4 = this.radioBtn13_4
  }
  cngRdioBtn14_1(){
    this.score.course14_lasvegas1 = this.radioBtn14_1
  }
  cngRdioBtn14_2(){
    this.score.course14_lasvegas2 = this.radioBtn14_2
  }
  cngRdioBtn14_3(){
    this.score.course14_lasvegas3 = this.radioBtn14_3
  }
  cngRdioBtn14_4(){
    this.score.course14_lasvegas4 = this.radioBtn14_4
  }
  cngRdioBtn15_1(){
    this.score.course15_lasvegas1 = this.radioBtn15_1
  }
  cngRdioBtn15_2(){
    this.score.course15_lasvegas2 = this.radioBtn15_2
  }
  cngRdioBtn15_3(){
    this.score.course15_lasvegas3 = this.radioBtn15_3
  }
  cngRdioBtn15_4(){
    this.score.course15_lasvegas4 = this.radioBtn15_4
  }
  cngRdioBtn16_1(){
    this.score.course16_lasvegas1 = this.radioBtn16_1
  }
  cngRdioBtn16_2(){
    this.score.course16_lasvegas2 = this.radioBtn16_2
  }
  cngRdioBtn16_3(){
    this.score.course16_lasvegas3 = this.radioBtn16_3
  }
  cngRdioBtn16_4(){
    this.score.course16_lasvegas4 = this.radioBtn16_4
  }
  cngRdioBtn17_1(){
    this.score.course17_lasvegas1 = this.radioBtn17_1
  }
  cngRdioBtn17_2(){
    this.score.course17_lasvegas2 = this.radioBtn17_2
  }
  cngRdioBtn17_3(){
    this.score.course17_lasvegas3 = this.radioBtn17_3
  }
  cngRdioBtn17_4(){
    this.score.course17_lasvegas4 = this.radioBtn17_4
  }
  cngRdioBtn18_1(){
    this.score.course18_lasvegas1 = this.radioBtn18_1
  }
  cngRdioBtn18_2(){
    this.score.course18_lasvegas2 = this.radioBtn18_2
  }
  cngRdioBtn18_3(){
    this.score.course18_lasvegas3 = this.radioBtn18_3
  }
  cngRdioBtn18_4(){
    this.score.course18_lasvegas4 = this.radioBtn18_4
  }

  //スコアカウンターの変更イベント
  course1ScoreCountDown_User1() {
    if(this.score.course1_score1 !== 0 )
      this.score.course1_score1--
  }
  course1ScoreCountUp_User1() {
    if(this.score.course1_score1 !== 15 )
      this.score.course1_score1++
  }
  course1ScoreCountDown_User2() {
    if(this.score.course1_score2 !== 0 )
      this.score.course1_score2--
  }
  course1ScoreCountUp_User2() {
    if(this.score.course1_score2 !== 15 )
      this.score.course1_score2++
  }
  course1ScoreCountDown_User3() {
    if(this.score.course1_score3 !== 0 )
      this.score.course1_score3--
  }
  course1ScoreCountUp_User3() {
    if(this.score.course1_score3 !== 15 )
      this.score.course1_score3++
  }
  course1ScoreCountDown_User4() {
    if(this.score.course1_score4 !== 0 )
      this.score.course1_score4--
  }
  course1ScoreCountUp_User4() {
    if(this.score.course1_score4 !== 15 )
      this.score.course1_score4++
  }

  course2ScoreCountDown_User1() {
    if(this.score.course2_score1 !== 0 )
      this.score.course2_score1--
  }
  course2ScoreCountUp_User1() {
    if(this.score.course2_score1 !== 15 )
      this.score.course2_score1++
  }
  course2ScoreCountDown_User2() {
    if(this.score.course2_score2 !== 0 )
      this.score.course2_score2--
  }
  course2ScoreCountUp_User2() {
    if(this.score.course2_score2 !== 15 )
      this.score.course2_score2++
  }
  course2ScoreCountDown_User3() {
    if(this.score.course2_score3 !== 0 )
      this.score.course2_score3--
  }
  course2ScoreCountUp_User3() {
    if(this.score.course2_score3 !== 15 )
      this.score.course2_score3++
  }
  course2ScoreCountDown_User4() {
    if(this.score.course2_score4 !== 0 )
      this.score.course2_score4--
  }
  course2ScoreCountUp_User4() {
    if(this.score.course2_score4 !== 15 )
      this.score.course2_score4++
  }

  course3ScoreCountDown_User1() {
    if(this.score.course3_score1 !== 0 )
      this.score.course3_score1--
  }
  course3ScoreCountUp_User1() {
    if(this.score.course3_score1 !== 15 )
      this.score.course3_score1++
  }
  course3ScoreCountDown_User2() {
    if(this.score.course3_score2 !== 0 )
      this.score.course3_score2--
  }
  course3ScoreCountUp_User2() {
    if(this.score.course3_score2 !== 15 )
      this.score.course3_score2++
  }
  course3ScoreCountDown_User3() {
    if(this.score.course3_score3 !== 0 )
      this.score.course3_score3--
  }
  course3ScoreCountUp_User3() {
    if(this.score.course3_score3 !== 15 )
      this.score.course3_score3++
  }
  course3ScoreCountDown_User4() {
    if(this.score.course3_score4 !== 0 )
      this.score.course3_score4--
  }
  course3ScoreCountUp_User4() {
    if(this.score.course3_score4 !== 15 )
      this.score.course3_score4++
  }

  course4ScoreCountDown_User1() {
    if(this.score.course4_score1 !== 0 )
      this.score.course4_score1--
  }
  course4ScoreCountUp_User1() {
    if(this.score.course4_score1 !== 15 )
      this.score.course4_score1++
  }
  course4ScoreCountDown_User2() {
    if(this.score.course4_score2 !== 0 )
      this.score.course4_score2--
  }
  course4ScoreCountUp_User2() {
    if(this.score.course4_score2 !== 15 )
      this.score.course4_score2++
  }
  course4ScoreCountDown_User3() {
    if(this.score.course4_score3 !== 0 )
      this.score.course4_score3--
  }
  course4ScoreCountUp_User3() {
    if(this.score.course4_score3 !== 15 )
      this.score.course4_score3++
  }
  course4ScoreCountDown_User4() {
    if(this.score.course4_score4 !== 0 )
      this.score.course4_score4--
  }
  course4ScoreCountUp_User4() {
    if(this.score.course4_score4 !== 15 )
      this.score.course4_score4++
  }

  course5ScoreCountDown_User1() {
    if(this.score.course5_score1 !== 0 )
      this.score.course5_score1--
  }
  course5ScoreCountUp_User1() {
    if(this.score.course5_score1 !== 15 )
      this.score.course5_score1++
  }
  course5ScoreCountDown_User2() {
    if(this.score.course5_score2 !== 0 )
      this.score.course5_score2--
  }
  course5ScoreCountUp_User2() {
    if(this.score.course5_score2 !== 15 )
      this.score.course5_score2++
  }
  course5ScoreCountDown_User3() {
    if(this.score.course5_score3 !== 0 )
      this.score.course5_score3--
  }
  course5ScoreCountUp_User3() {
    if(this.score.course5_score3 !== 15 )
      this.score.course5_score3++
  }
  course5ScoreCountDown_User4() {
    if(this.score.course5_score4 !== 0 )
      this.score.course5_score4--
  }
  course5ScoreCountUp_User4() {
    if(this.score.course5_score4 !== 15 )
      this.score.course5_score4++
  }

  course6ScoreCountDown_User1() {
    if(this.score.course6_score1 !== 0 )
      this.score.course6_score1--
  }
  course6ScoreCountUp_User1() {
    if(this.score.course6_score1 !== 15 )
      this.score.course6_score1++
  }
  course6ScoreCountDown_User2() {
    if(this.score.course6_score2 !== 0 )
      this.score.course6_score2--
  }
  course6ScoreCountUp_User2() {
    if(this.score.course6_score2 !== 15 )
      this.score.course6_score2++
  }
  course6ScoreCountDown_User3() {
    if(this.score.course6_score3 !== 0 )
      this.score.course6_score3--
  }
  course6ScoreCountUp_User3() {
    if(this.score.course6_score3 !== 15 )
      this.score.course6_score3++
  }
  course6ScoreCountDown_User4() {
    if(this.score.course6_score4 !== 0 )
      this.score.course6_score4--
  }
  course6ScoreCountUp_User4() {
    if(this.score.course6_score4 !== 15 )
      this.score.course6_score4++
  }

  course7ScoreCountDown_User1() {
    if(this.score.course7_score1 !== 0 )
      this.score.course7_score1--
  }
  course7ScoreCountUp_User1() {
    if(this.score.course7_score1 !== 15 )
      this.score.course7_score1++
  }
  course7ScoreCountDown_User2() {
    if(this.score.course7_score2 !== 0 )
      this.score.course7_score2--
  }
  course7ScoreCountUp_User2() {
    if(this.score.course7_score2 !== 15 )
      this.score.course7_score2++
  }
  course7ScoreCountDown_User3() {
    if(this.score.course7_score3 !== 0 )
      this.score.course7_score3--
  }
  course7ScoreCountUp_User3() {
    if(this.score.course7_score3 !== 15 )
      this.score.course7_score3++
  }
  course7ScoreCountDown_User4() {
    if(this.score.course7_score4 !== 0 )
      this.score.course7_score4--
  }
  course7ScoreCountUp_User4() {
    if(this.score.course7_score4 !== 15 )
      this.score.course7_score4++
  }

  course8ScoreCountDown_User1() {
    if(this.score.course8_score1 !== 0 )
      this.score.course8_score1--
  }
  course8ScoreCountUp_User1() {
    if(this.score.course8_score1 !== 15 )
      this.score.course8_score1++
  }
  course8ScoreCountDown_User2() {
    if(this.score.course8_score2 !== 0 )
      this.score.course8_score2--
  }
  course8ScoreCountUp_User2() {
    if(this.score.course8_score2 !== 15 )
      this.score.course8_score2++
  }
  course8ScoreCountDown_User3() {
    if(this.score.course8_score3 !== 0 )
      this.score.course8_score3--
  }
  course8ScoreCountUp_User3() {
    if(this.score.course8_score3 !== 15 )
      this.score.course8_score3++
  }
  course8ScoreCountDown_User4() {
    if(this.score.course8_score4 !== 0 )
      this.score.course8_score4--
  }
  course8ScoreCountUp_User4() {
    if(this.score.course8_score4 !== 15 )
      this.score.course8_score4++
  }

  course9ScoreCountDown_User1() {
    if(this.score.course9_score1 !== 0 )
      this.score.course9_score1--
  }
  course9ScoreCountUp_User1() {
    if(this.score.course9_score1 !== 15 )
      this.score.course9_score1++
  }
  course9ScoreCountDown_User2() {
    if(this.score.course9_score2 !== 0 )
      this.score.course9_score2--
  }
  course9ScoreCountUp_User2() {
    if(this.score.course9_score2 !== 15 )
      this.score.course9_score2++
  }
  course9ScoreCountDown_User3() {
    if(this.score.course9_score3 !== 0 )
      this.score.course9_score3--
  }
  course9ScoreCountUp_User3() {
    if(this.score.course9_score3 !== 15 )
      this.score.course9_score3++
  }
  course9ScoreCountDown_User4() {
    if(this.score.course9_score4 !== 0 )
      this.score.course9_score4--
  }
  course9ScoreCountUp_User4() {
    if(this.score.course9_score4 !== 15 )
      this.score.course9_score4++
  }

  course10ScoreCountDown_User1() {
    if(this.score.course10_score1 !== 0 )
      this.score.course10_score1--
  }
  course10ScoreCountUp_User1() {
    if(this.score.course10_score1 !== 15 )
      this.score.course10_score1++
  }
  course10ScoreCountDown_User2() {
    if(this.score.course10_score2 !== 0 )
      this.score.course10_score2--
  }
  course10ScoreCountUp_User2() {
    if(this.score.course10_score2 !== 15 )
      this.score.course10_score2++
  }
  course10ScoreCountDown_User3() {
    if(this.score.course10_score3 !== 0 )
      this.score.course10_score3--
  }
  course10ScoreCountUp_User3() {
    if(this.score.course10_score3 !== 15 )
      this.score.course10_score3++
  }
  course10ScoreCountDown_User4() {
    if(this.score.course10_score4 !== 0 )
      this.score.course10_score4--
  }
  course10ScoreCountUp_User4() {
    if(this.score.course10_score4 !== 15 )
      this.score.course10_score4++
  }

  course11ScoreCountDown_User1() {
    if(this.score.course11_score1 !== 0 )
      this.score.course11_score1--
  }
  course11ScoreCountUp_User1() {
    if(this.score.course11_score1 !== 15 )
      this.score.course11_score1++
  }
  course11ScoreCountDown_User2() {
    if(this.score.course11_score2 !== 0 )
      this.score.course11_score2--
  }
  course11ScoreCountUp_User2() {
    if(this.score.course11_score2 !== 15 )
      this.score.course11_score2++
  }
  course11ScoreCountDown_User3() {
    if(this.score.course11_score3 !== 0 )
      this.score.course11_score3--
  }
  course11ScoreCountUp_User3() {
    if(this.score.course11_score3 !== 15 )
      this.score.course11_score3++
  }
  course11ScoreCountDown_User4() {
    if(this.score.course11_score4 !== 0 )
      this.score.course11_score4--
  }
  course11ScoreCountUp_User4() {
    if(this.score.course11_score4 !== 15 )
      this.score.course11_score4++
  }

  course12ScoreCountDown_User1() {
    if(this.score.course12_score1 !== 0 )
      this.score.course12_score1--
  }
  course12ScoreCountUp_User1() {
    if(this.score.course12_score1 !== 15 )
      this.score.course12_score1++
  }
  course12ScoreCountDown_User2() {
    if(this.score.course12_score2 !== 0 )
      this.score.course12_score2--
  }
  course12ScoreCountUp_User2() {
    if(this.score.course12_score2 !== 15 )
      this.score.course12_score2++
  }
  course12ScoreCountDown_User3() {
    if(this.score.course12_score3 !== 0 )
      this.score.course12_score3--
  }
  course12ScoreCountUp_User3() {
    if(this.score.course12_score3 !== 15 )
      this.score.course12_score3++
  }
  course12ScoreCountDown_User4() {
    if(this.score.course12_score4 !== 0 )
      this.score.course12_score4--
  }
  course12ScoreCountUp_User4() {
    if(this.score.course12_score4 !== 15 )
      this.score.course12_score4++
  }

  course13ScoreCountDown_User1() {
    if(this.score.course13_score1 !== 0 )
      this.score.course13_score1--
  }
  course13ScoreCountUp_User1() {
    if(this.score.course13_score1 !== 15 )
      this.score.course13_score1++
  }
  course13ScoreCountDown_User2() {
    if(this.score.course13_score2 !== 0 )
      this.score.course13_score2--
  }
  course13ScoreCountUp_User2() {
    if(this.score.course13_score2 !== 15 )
      this.score.course13_score2++
  }
  course13ScoreCountDown_User3() {
    if(this.score.course13_score3 !== 0 )
      this.score.course13_score3--
  }
  course13ScoreCountUp_User3() {
    if(this.score.course13_score3 !== 15 )
      this.score.course13_score3++
  }
  course13ScoreCountDown_User4() {
    if(this.score.course13_score4 !== 0 )
      this.score.course13_score4--
  }
  course13ScoreCountUp_User4() {
    if(this.score.course13_score4 !== 15 )
      this.score.course13_score4++
  }

  course14ScoreCountDown_User1() {
    if(this.score.course14_score1 !== 0 )
      this.score.course14_score1--
  }
  course14ScoreCountUp_User1() {
    if(this.score.course14_score1 !== 15 )
      this.score.course14_score1++
  }
  course14ScoreCountDown_User2() {
    if(this.score.course14_score2 !== 0 )
      this.score.course14_score2--
  }
  course14ScoreCountUp_User2() {
    if(this.score.course14_score2 !== 15 )
      this.score.course14_score2++
  }
  course14ScoreCountDown_User3() {
    if(this.score.course14_score3 !== 0 )
      this.score.course14_score3--
  }
  course14ScoreCountUp_User3() {
    if(this.score.course14_score3 !== 15 )
      this.score.course14_score3++
  }
  course14ScoreCountDown_User4() {
    if(this.score.course14_score4 !== 0 )
      this.score.course14_score4--
  }
  course14ScoreCountUp_User4() {
    if(this.score.course14_score4 !== 15 )
      this.score.course14_score4++
  }

  course15ScoreCountDown_User1() {
    if(this.score.course15_score1 !== 0 )
      this.score.course15_score1--
  }
  course15ScoreCountUp_User1() {
    if(this.score.course15_score1 !== 15 )
      this.score.course15_score1++
  }
  course15ScoreCountDown_User2() {
    if(this.score.course15_score2 !== 0 )
      this.score.course15_score2--
  }
  course15ScoreCountUp_User2() {
    if(this.score.course15_score2 !== 15 )
      this.score.course15_score2++
  }
  course15ScoreCountDown_User3() {
    if(this.score.course15_score3 !== 0 )
      this.score.course15_score3--
  }
  course15ScoreCountUp_User3() {
    if(this.score.course15_score3 !== 15 )
      this.score.course15_score3++
  }
  course15ScoreCountDown_User4() {
    if(this.score.course15_score4 !== 0 )
      this.score.course15_score4--
  }
  course15ScoreCountUp_User4() {
    if(this.score.course15_score4 !== 15 )
      this.score.course15_score4++
  }

  course16ScoreCountDown_User1() {
    if(this.score.course16_score1 !== 0 )
      this.score.course16_score1--
  }
  course16ScoreCountUp_User1() {
    if(this.score.course16_score1 !== 15 )
      this.score.course16_score1++
  }
  course16ScoreCountDown_User2() {
    if(this.score.course16_score2 !== 0 )
      this.score.course16_score2--
  }
  course16ScoreCountUp_User2() {
    if(this.score.course16_score2 !== 15 )
      this.score.course16_score2++
  }
  course16ScoreCountDown_User3() {
    if(this.score.course16_score3 !== 0 )
      this.score.course16_score3--
  }
  course16ScoreCountUp_User3() {
    if(this.score.course16_score3 !== 15 )
      this.score.course16_score3++
  }
  course16ScoreCountDown_User4() {
    if(this.score.course16_score4 !== 0 )
      this.score.course16_score4--
  }
  course16ScoreCountUp_User4() {
    if(this.score.course16_score4 !== 15 )
      this.score.course16_score4++
  }

  course17ScoreCountDown_User1() {
    if(this.score.course17_score1 !== 0 )
      this.score.course17_score1--
  }
  course17ScoreCountUp_User1() {
    if(this.score.course17_score1 !== 15 )
      this.score.course17_score1++
  }
  course17ScoreCountDown_User2() {
    if(this.score.course17_score2 !== 0 )
      this.score.course17_score2--
  }
  course17ScoreCountUp_User2() {
    if(this.score.course17_score2 !== 15 )
      this.score.course17_score2++
  }
  course17ScoreCountDown_User3() {
    if(this.score.course17_score3 !== 0 )
      this.score.course17_score3--
  }
  course17ScoreCountUp_User3() {
    if(this.score.course17_score3 !== 15 )
      this.score.course17_score3++
  }
  course17ScoreCountDown_User4() {
    if(this.score.course17_score4 !== 0 )
      this.score.course17_score4--
  }
  course17ScoreCountUp_User4() {
    if(this.score.course17_score4 !== 15 )
      this.score.course17_score4++
  }

  course18ScoreCountDown_User1() {
    if(this.score.course18_score1 !== 0 )
      this.score.course18_score1--
  }
  course18ScoreCountUp_User1() {
    if(this.score.course18_score1 !== 15 )
      this.score.course18_score1++
  }
  course18ScoreCountDown_User2() {
    if(this.score.course18_score2 !== 0 )
      this.score.course18_score2--
  }
  course18ScoreCountUp_User2() {
    if(this.score.course18_score2 !== 15 )
      this.score.course18_score2++
  }
  course18ScoreCountDown_User3() {
    if(this.score.course18_score3 !== 0 )
      this.score.course18_score3--
  }
  course18ScoreCountUp_User3() {
    if(this.score.course18_score3 !== 15 )
      this.score.course18_score3++
  }
  course18ScoreCountDown_User4() {
    if(this.score.course18_score4 !== 0 )
      this.score.course18_score4--
  }
  course18ScoreCountUp_User4() {
    if(this.score.course18_score4 !== 15 )
      this.score.course18_score4++
  }

  olympicAndLasvegasRateChange(val: any) {

    this.rateValue = val
    this.olympicTotal1_rated = this.olympicTotal1 * val
    this.olympicTotal2_rated = this.olympicTotal2 * val
    this.olympicTotal3_rated = this.olympicTotal3 * val
    this.olympicTotal4_rated = this.olympicTotal4 * val
    this.lasvegasTotal1_rated = this.lasvegasTotal1 * val
    this.lasvegasTotal2_rated = this.lasvegasTotal2 * val
    this.lasvegasTotal3_rated = this.lasvegasTotal3 * val
    this.lasvegasTotal4_rated = this.lasvegasTotal4 * val

  }

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

    var scores: any
    scores = [
      {
        score1: this.score.course1_score1,
        score2: this.score.course1_score2,
        score3: this.score.course1_score3,
        score4: this.score.course1_score4,
      },
      {
        score1: this.score.course2_score1,
        score2: this.score.course2_score2,
        score3: this.score.course2_score3,
        score4: this.score.course2_score4,
      },
      {
        score1: this.score.course3_score1,
        score2: this.score.course3_score2,
        score3: this.score.course3_score3,
        score4: this.score.course3_score4,
      },
      {
        score1: this.score.course4_score1,
        score2: this.score.course4_score2,
        score3: this.score.course4_score3,
        score4: this.score.course4_score4,
      }
      ,
      {
        score1: this.score.course5_score1,
        score2: this.score.course5_score2,
        score3: this.score.course5_score3,
        score4: this.score.course5_score4,
      },
      {
        score1: this.score.course6_score1,
        score2: this.score.course6_score2,
        score3: this.score.course6_score3,
        score4: this.score.course6_score4,
      },
      {
        score1: this.score.course7_score1,
        score2: this.score.course7_score2,
        score3: this.score.course7_score3,
        score4: this.score.course7_score4,
      },
      {
        score1: this.score.course8_score1,
        score2: this.score.course8_score2,
        score3: this.score.course8_score3,
        score4: this.score.course8_score4,
      },
      {
        score1: this.score.course9_score1,
        score2: this.score.course9_score2,
        score3: this.score.course9_score3,
        score4: this.score.course9_score4,
      },
      {
        score1: this.score.course10_score1,
        score2: this.score.course10_score2,
        score3: this.score.course10_score3,
        score4: this.score.course10_score4,
      },
      {
        score1: this.score.course11_score1,
        score2: this.score.course11_score2,
        score3: this.score.course11_score3,
        score4: this.score.course11_score4,
      },
      {
        score1: this.score.course12_score1,
        score2: this.score.course12_score2,
        score3: this.score.course12_score3,
        score4: this.score.course12_score4,
      },
      {
        score1: this.score.course13_score1,
        score2: this.score.course13_score2,
        score3: this.score.course13_score3,
        score4: this.score.course13_score4,
      },
      {
        score1: this.score.course14_score1,
        score2: this.score.course14_score2,
        score3: this.score.course14_score3,
        score4: this.score.course14_score4,
      },
      {
        score1: this.score.course15_score1,
        score2: this.score.course15_score2,
        score3: this.score.course15_score3,
        score4: this.score.course15_score4,
      },
      {
        score1: this.score.course16_score1,
        score2: this.score.course16_score2,
        score3: this.score.course16_score3,
        score4: this.score.course16_score4,
      },
      {
        score1: this.score.course17_score1,
        score2: this.score.course17_score2,
        score3: this.score.course17_score3,
        score4: this.score.course17_score4,
      },
      {
        score1: this.score.course18_score1,
        score2: this.score.course18_score2,
        score3: this.score.course18_score3,
        score4: this.score.course18_score4,
      }
    ]

    let p1point: any
    let p2point: any
    let p3point: any
    let p4point: any

    this.courseIndex = 0

    for (let score of scores) {

      p1point = 0
      p2point = 0
      p3point = 0
      p4point = 0

      //先頭からループ
      //処理前に初期化
      this.order[this.courseIndex][0] = 0
      this.order[this.courseIndex][1] = 0
      this.order[this.courseIndex][2] = 0
      this.order[this.courseIndex][3] = 0

      //最初のコースの場合、手入力した値をバッジにセット
      if(this.courseIndex == 0){
        this.order[0][0] = this.order1_1
        this.order[0][1] = this.order1_2
        this.order[0][2] = this.order1_3
        this.order[0][3] = this.order1_4

      } else {
        //最初のコース以外の場合、スコアを見て判定する
        if (scores[this.courseIndex - 1].score1 == 0 && scores[this.courseIndex - 1].score2 == 0
          && scores[this.courseIndex - 1].score3 == 0 && scores[this.courseIndex - 1].score4 == 0) {
            //前のコースの打数が未入力0の場合は、バッジは出さない
            this.order[this.courseIndex][0] = 0
            this.order[this.courseIndex][1] = 0
            this.order[this.courseIndex][2] = 0
            this.order[this.courseIndex][3] = 0
          }

        if (scores[this.courseIndex - 1].score1 != 0 && scores[this.courseIndex - 1].score2 != 0
          && scores[this.courseIndex - 1].score3 != 0 && scores[this.courseIndex - 1].score4 != 0) {
            //前のコースが入力済み、かつ
            //前のコースのバッジが表示済みの場合、バッジを表示
            if (this.order[this.courseIndex - 1][0] != 0 && this.order[this.courseIndex - 1][1] != 0
              && this.order[this.courseIndex - 1][2] != 0 && this.order[this.courseIndex - 1][3] != 0) {
                p1point = +scores[this.courseIndex - 1].score1 * 10 + +this.order[this.courseIndex - 1][0]
                p2point = +scores[this.courseIndex - 1].score2 * 10 + +this.order[this.courseIndex - 1][1]
                p3point = +scores[this.courseIndex - 1].score3 * 10 + +this.order[this.courseIndex - 1][2]
                p4point = +scores[this.courseIndex - 1].score4 * 10 + +this.order[this.courseIndex - 1][3]
              }

            this.setBagdeOrder(this.courseIndex, p1point, p2point, p3point, p4point)
          }
      }
      this.courseIndex++
    }
  }

  //バッジを設定する処理
  setBagdeOrder(trgt:any, p1point:any, p2point:any, p3point:any, p4point:any) {

    //一人目
    if(p1point < p2point && p1point < p3point && p1point < p4point){
      this.order[trgt][0] = 1
    }
    if(p1point > p2point && p1point > p3point && p1point > p4point){
      this.order[trgt][0] = 4
    }
    if(
      (p1point > p2point && p1point < p3point && p1point < p4point)
      ||(p1point > p3point && p1point < p2point && p1point < p4point)
      ||(p1point > p4point && p1point < p2point && p1point < p3point)){
        this.order[trgt][0] = 2
    }
    if(
      (p1point < p2point && p1point > p3point && p1point > p4point)
      ||(p1point < p3point && p1point > p2point && p1point > p4point)
      ||(p1point < p4point && p1point > p2point && p1point > p3point)){
        this.order[trgt][0] = 3
    }

    //二人目
    if(p2point < p1point && p2point < p3point && p2point < p4point){
      this.order[trgt][1] = 1
    }
    if(p2point > p1point && p2point > p3point && p2point > p4point){
      this.order[trgt][1] = 4
    }
    if(
      (p2point > p1point && p2point < p3point && p2point < p4point)
      ||(p2point > p3point && p2point < p1point && p2point < p4point)
      ||(p2point > p4point && p2point < p1point && p2point < p3point)){
        this.order[trgt][1] = 2
    }
    if(
      (p2point < p1point && p2point > p3point && p2point > p4point)
      ||(p2point < p3point && p2point > p1point && p2point > p4point)
      ||(p2point < p4point && p2point > p1point && p2point > p3point)){
        this.order[trgt][1] = 3
    }

    //三人目
    if(p3point < p1point && p3point < p2point && p3point < p4point){
      this.order[trgt][2] = 1
    }
    if(p3point > p1point && p3point > p2point && p3point > p4point){
      this.order[trgt][2] = 4
    }
    if(
      (p3point > p1point && p3point < p2point && p3point < p4point)
      ||(p3point > p2point && p3point < p1point && p3point < p4point)
      ||(p3point > p4point && p3point < p1point && p3point < p2point)){
        this.order[trgt][2] = 2
    }
    if(
      (p3point < p1point && p3point > p2point && p3point > p4point)
      ||(p3point < p2point && p3point > p1point && p3point > p4point)
      ||(p3point < p4point && p3point > p1point && p3point > p2point)){
        this.order[trgt][2] = 3
    }

    //四人目
    if(p4point < p1point && p4point < p2point && p4point < p3point){
      this.order[trgt][3] = 1
    }
    if(p4point > p1point && p4point > p2point && p4point > p3point){
      this.order[trgt][3] = 4
    }
    if(
      (p4point > p1point && p4point < p2point && p4point < p3point)
      ||(p4point > p2point && p4point < p1point && p4point < p3point)
      ||(p4point > p3point && p4point < p1point && p4point < p2point)){
        this.order[trgt][3] = 2
    }
    if(
      (p4point < p1point && p4point > p2point && p4point > p3point)
      ||(p4point < p2point && p4point > p1point && p4point > p3point)
      ||(p4point < p3point && p4point > p1point && p4point > p2point)){
        this.order[trgt][3] = 3
    }
  }
}
