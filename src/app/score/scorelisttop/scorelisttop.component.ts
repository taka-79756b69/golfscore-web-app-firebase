import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-scorelisttop',
  templateUrl: './scorelisttop.component.html',
  styleUrls: ['./scorelisttop.component.scss']
})
export class ScorelisttopComponent {

  scorelist: any
  confflag: any
  delDocId: any

  _index_id = 0
  _index_courseName = 1
  _index_playDate = 2
  _index_player = 3
  _index_name1 = 4
  _index_name2 = 5
  _index_name3 = 6
  _index_name4 = 7

  firestore: AngularFirestore

  /**
   * コンストラクタ
   * AngularFirestoreサービスを定義
   * @param firestore
   */
  constructor(firestore: AngularFirestore,
    ) {
    this.firestore = firestore
  }

  // 購読設定停止用
  private subscriptions = new Subscription()

  /**
   * コレクションをFirestoreから取得する
   */
  getScoreLists(){

    this.scorelist = new Array()

    this.subscriptions = new Subscription()

    this.subscriptions.add(
      this.firestore.collection('scores', ref => ref.orderBy('timestamp', 'desc')).snapshotChanges().subscribe(colSnap => {
        colSnap.forEach(snap => {
          let scores: any = snap.payload.doc.data();
          scores.id = snap.payload.doc.id;
          console.log("COLLECTION: " + JSON.stringify(scores));
          this.scorelist.push(scores)
        })
        console.log("getScoreLists():unsubscribe")
        this.execUnsubscribe()
      })
    )
  }

  /**
     * コンポーネントの破棄
     */
  ngOnDestroy() {
    console.log("ngOnDestroy():unsubscribe")
    this.execUnsubscribe()
  }

  /**
   * Subscribeの停止
   */
  execUnsubscribe(){
    // 購読を停止する
    console.log("scorelisttop.component: unsubscribe")
    this.subscriptions.unsubscribe()
  }

  /**
   * 初期処理
   * コレクション取得処理を呼び出す
   */
  ngOnInit(): void {
    this.getScoreLists()
  }

  /**
   * ドキュメント削除前処理
   * 削除対象のIDと確認メッセージ切り替えフラグをセットする
   * @param trget 削除対象ID
   */
  deleteConf(trget: any) {
    //削除確認メッセージ表示用のフラグをセット
    this.confflag = true
    //削除対象IDをセット
    this.delDocId = trget
  }

  /**
   * ドキュメント削除処理
   * 削除する対象のIDをキーにして削除する
   */
  delDocument() {
    this.confflag = false

    try {
      this.firestore.collection('scores').doc(this.delDocId).delete()
      console.log("Document Delete Complete : ID=" + this.delDocId)
    } catch (error) {
      console.log('POST Error: '+error)
    }
  }

  /**
   * 再読み込み処理
   * 削除後にコレクションを再読み込みする
   */
  reload() {
    this.getScoreLists()
  }
}
