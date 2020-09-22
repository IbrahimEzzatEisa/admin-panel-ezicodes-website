import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin, LoginService } from 'app/shared/services/api';
// import { LoginService } from 'app/components/services/api';
// import { LoginService } from '../shared/services/api';
// import { NotifierService } from 'angular-notifier';
// import { AuthenticationService } from '../shared/services/Auth';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
 user : UserLogin = new UserLogin();
 
  forgetMe() {
    localStorage.removeItem(this.userId);
  } userId;
  username;
  userPassword;
  redirectUrl: string;
  redirectMessage:string;
  busyLoggingIn: boolean = false;
  isRememberMeChecked: boolean = false;

  valideUser;
  busy;
  firstRequestDone;
  

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  
  ) { }

  
  login() {
    this.busyLoggingIn = true;
    this.loginService.login(this.user).subscribe(
      res => {
        if(res.token) {
          if(this.isRememberMeChecked) {
            this.rememberMe();
          } else {
            this.forgetMe();
          }
          if(this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl);
          } else {
             this.router.navigate(['/pages/home']);
         
          }
         
        }
        this.busyLoggingIn = false;
      },
      err => {
        this.busyLoggingIn = false;
      }
    );
  }

  rememberMe() {
    localStorage.setItem(this.userId, this.userPassword)
  }
 
  ngOnInit() {
    if(this.route.snapshot.queryParams) {
      this.redirectUrl = this.route.snapshot.queryParams.redirect || '';
      this.redirectMessage = this.route.snapshot.queryParams.redirectMessage || '';
    }
  }

 

}
