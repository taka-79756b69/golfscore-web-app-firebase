import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService){}

    ngOnInit(): void {
      this.authService.logout()
  }
}
