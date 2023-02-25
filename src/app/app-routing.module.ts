import { AuthGuard } from './guard/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { ScoreComponent } from './score/score.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreModule } from './score/score.module';
import { BrowserModule } from '@angular/platform-browser';
import { NewgameComponent } from './newgame/newgame.component';
import { NewgameModule } from './newgame/newgame.module';
import { SignupModule } from './signup/signup.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'score', component: ScoreComponent },
  { path: 'newgame', component: NewgameComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ScoreModule,
    BrowserModule,
    NewgameModule,
    SignupModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
