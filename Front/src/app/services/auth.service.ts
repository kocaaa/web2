import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RegisterResponse } from '../models/registerResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(environment.apiUrl + "/auth/login", {
      email: email,
      password: password
    }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }))
  }

  register(email: string, username: string, password: string) {
    return this.http.post<RegisterResponse>(environment.apiUrl + "/auth/register", {
      email: email,
      name: username,
      password: password
    })
  }

  validateJwt(token: string): Observable<boolean> {
    let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.post<boolean>(environment.apiUrl + "/auth/validate", {}, { headers: headers });
  }
}
