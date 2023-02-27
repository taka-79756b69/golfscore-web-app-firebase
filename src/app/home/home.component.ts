import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private authServie: AuthService
  ){}

  acountDelete() {
    this.authServie.deleteUser()
  }
}
