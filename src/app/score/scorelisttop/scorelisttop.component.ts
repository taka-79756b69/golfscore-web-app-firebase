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
  listArray: any[] = new Array()
  items: any

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
  constructor(firestore: AngularFirestore) {
    this.firestore = firestore
  }

  // 購読設定停止用
  private subscriptions = new Subscription();

  /**
   * コレクションをFirestoreから取得する
   */
  getScoreLists(){
    //let firestore: AngularFirestore
    this.subscriptions.add(
      this.firestore.collection('scores').snapshotChanges().subscribe(colSnap => {
        colSnap.forEach(snap => {
          const scores: any = snap.payload.doc.data();
          scores.id = snap.payload.doc.id;
          console.log("COLLECTION: "+JSON.stringify(scores));
          this.addList(scores, scores.id)
        })
        this.execUnsubscribe()
      })
    )
    this.scorelist = this.listArray
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
  console.log("scorelisttop.component: unsubscribe")
  this.subscriptions.unsubscribe()
}

  /**
   * Listに追加する
   * ※配列の並びを変更する場合はインデックスも修正すること
   * @param val ドキュメントの中身
   * @param _id ドキュメントID
   */
  addList(val: any, _id: any) {
    //debugger
    let arrayList = new Array()
    arrayList.push(_id)             //0
    arrayList.push(val.courseName)  //1
    arrayList.push(val.playDate)    //2
    arrayList.push(val.player)      //3
    arrayList.push(val.name1)       //4
    arrayList.push(val.name2)       //5
    arrayList.push(val.name3)       //6
    arrayList.push(val.name4)       //7

    //HTMLテンプレートに追加
    this.listArray.push(arrayList)
  }

  /**
   * 初期処理
   * コレクション取得処理を呼び出す
   */
  ngOnInit(): void {
    this.listArray = new Array()
    this.getScoreLists()
  }

  /**
   * ドキュメント削除前の確認メッセージ切り替え用のフラグセット
   */
  deleteConf() {
    //削除確認メッセージ表示用のフラグをセット
    this.confflag = true
  }

  /**
   * ドキュメント削除処理
   * 削除する対象のIDをキーにして削除する
   * @param trget 削除対象ID
   */
  delDocument(trget: any) {
    this.confflag = false
    this.firestore.collection('scores').doc(trget).delete()
    console.log("Document Delete Complete. : " + trget);
    this.getScoreLists()
  }

  /**
   * 再読み込み処理
   * 削除後にコレクションを再読み込みする
   */
  reload() {
    this.listArray = new Array()
    this.getScoreLists()
  }
}
