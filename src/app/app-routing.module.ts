import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
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
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'score',
    component: ScoreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newgame',
    component: NewgameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  { path: 'account',
  component: AccountComponent,
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ScoreModule,
    BrowserModule,
    NewgameModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
