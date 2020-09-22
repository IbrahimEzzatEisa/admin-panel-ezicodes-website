import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  loginStatus

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canLoad(): boolean {
    this.loginStatus = false;
    this.authService.isLoggedIn().subscribe(
      loginStatus => this.loginStatus = loginStatus
    );
    if(!this.loginStatus)
      {
        this.router.navigate(['/login']);
      }
    return this.loginStatus;
  }
}
