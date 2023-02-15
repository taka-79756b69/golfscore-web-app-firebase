import { ScoreComponent } from './score/score.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreModule } from './score/score.module';
import { BrowserModule } from '@angular/platform-browser';
import { NewgameComponent } from './newgame/newgame.component';
import { NewgameModule } from './newgame/newgame.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'score', component: ScoreComponent },
  { path: 'newgame', component: NewgameComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ScoreModule,
    BrowserModule,
    NewgameModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
