import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'golfscore-web-app-firebase';

  scores: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.scores = firestore.collection('scores').valueChanges();
  }
}
