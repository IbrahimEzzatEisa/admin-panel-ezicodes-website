import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { AuthenticationService } from '../Auth';

const API_URL = END_POINTS.login;


export class UserLogin{
  username: string; 
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  login(user: UserLogin) {
    return this.http.post(API_URL, user).pipe(
      tap(
        (res: {token:string}) => {
          console.log( res.token)
          console.log( res)
          localStorage.setItem('token', res.token);
        }
      )
    );
  }
  // getName(id: string): Observable<UserName> {
  //   return this.http.get<UserName>(API_URL + `/${id}`);
  // }
  // createPassword( userId: string,  password: string ): Observable<void> {
  //   const action = "/CreatePassword";
  //   return this.http.post<void>(API_URL + action + `/${userId}/${password}`, {})
  // }
  // ChangePassword( model : any ): Observable<void> {
  //   const action = "/CreatePassword";
  //   return this.http.post<void>(API_URL + action , model)
  // }

}
