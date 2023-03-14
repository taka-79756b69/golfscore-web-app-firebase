import { AuthGuard } from './../guard/auth.guard';
import { DatePipe } from './../pipes/date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoreComponent } from './score.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScorelistComponent } from './scorelist/scorelist.component';
import { ScorelisttopComponent } from './scorelisttop/scorelisttop.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { Scorelist3ptComponent } from './scorelist_3pt/scorelist3pt.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const routes: Routes = [
  {
    path: 'score', component: ScoreComponent,
    canActivate: [AuthGuard],
    children: [
     { path: '', component: ScorelisttopComponent },
     { path: '4/:scoreId', component: ScorelistComponent },
     { path: '3/:scoreId', component: Scorelist3ptComponent },
     { path: 'scorelisttop', component: ScorelisttopComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ScoreComponent,
    ScorelistComponent,
    ScorelisttopComponent,
    Scorelist3ptComponent,
    DatePipe,
  ],
  imports: [
    RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class ScoreModule { }
