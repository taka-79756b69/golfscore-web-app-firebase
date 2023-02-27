import { getAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-scorelisttop',
  templateUrl: './scorelisttop.component.html',
  styleUrls: ['./scorelisttop.component.scss']
})
export class ScorelisttopComponent {

  scorelist: any

  confflag: any
  scoresEmpty: any

  delDocId: any

  _index_id = 0
  _index_courseName = 1
  _index_playDate = 2
  _index_player = 3
  _index_name1 = 4
  _index_name2 = 5
  _index_name3 = 6
  _index_name4 = 7

  /**
   * コンストラクタ
   * AngularFirestoreサービスを定義
   * @param firestore
   */
  constructor(
    private firestore: AngularFirestore
    ) {
  }

  // 購読設定停止用
  private subscriptions = new Subscription()

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
      .collection(subcollectionName, ref => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges()
  }

  /**
   * firestoreからドキュメントを取得
   * ドキュメント内でユーザーID毎にドキュメントIDを割り当てて
   * サブコレクションとしてスコア一覧を取得する想定
   * @param parentDocId ドキュメントID（＝ユーザーID）
   * @param subcollectionName サブコレクション名
   * @returns 取得したサブコレクションの一覧
   */
    getSubcollectionDel(parentDocId: string, subcollectionName: string) {
      return this.firestore
        .collection('members')
        .doc(parentDocId)
        .collection(subcollectionName)
    }

  /**
   * コレクションをFirestoreから取得する
   */
  getScoreLists(){
    this.scorelist = new Array()
    this.subscriptions = new Subscription()
    this.subscriptions.add(
      this.getSubcollection(getAuth().currentUser?.uid || '', 'scores').subscribe(colSnap => {
        colSnap.forEach(snap => {
          let scores: any = snap.payload.doc.data()
          scores.id = snap.payload.doc.id;
          console.log("COLLECTION: " + JSON.stringify(scores));
          this.scorelist.push(scores)
        })
        if(this.scorelist==0){
          this.scoresEmpty = true
        }
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
      //this.firestore.collection('scores').doc(this.delDocId).delete()
      this.getSubcollectionDel(getAuth().currentUser?.uid || '', 'scores').doc(this.delDocId).delete()
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
