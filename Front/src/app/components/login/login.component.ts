import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginEmail: string = "";
  loginPassword: string = "";

  registerUsername: string = "";
  registerEmail: string = "";
  registerPassword: string = "";

  badLoginCredentials: boolean = false;
  badRegisterCredentials: boolean = false;
  registerError: string = "";

  constructor(private authService: AuthService,
    private cookie: CookieService,
    private router: Router
  ) { }

  login() {

    this.authService.login(this.loginEmail, this.loginPassword).subscribe(token => {
      this.cookie.set("token", token.token)
      this.cookie.set("_id", token._id)
      this.cookie.set("username", token.username)
      this.router.navigate([""])
    },
      error => {
        this.badLoginCredentials = true;
        console.log("error from login")
      })
  }

  register() {
    this.badRegisterCredentials = !this.validateRegisterFields();

    if (this.badRegisterCredentials) {
      console.log(this.registerError)
    } else {
      this.authService.register(this.registerEmail, this.registerUsername, this.registerPassword).subscribe(registerResponse => {

        if (!registerResponse.response) {
          this.badRegisterCredentials = true
          this.registerError = registerResponse.taken + " taken"
        }
        else {
          this.badRegisterCredentials = true
          this.registerError = "Registration successful"
        }
      })
    }
  }

  private validateRegisterFields(): boolean {
    return this.isUsernameValid(this.registerUsername) && this.isEmailValid(this.registerEmail) && this.isPasswordValid(this.registerPassword)
  }

  private isUsernameValid(username: string): boolean {
    const regexp = /^[a-zA-Z0-9]{6,}$/
    if (!regexp.test(username)) {
      this.registerError = "Invalid username"
    }
    return regexp.test(username)
  }

  private isEmailValid(email: string): boolean {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (!regexp.test(email)) {
      this.registerError = "Invalid email"
    }
    return regexp.test(email)
  }

  private isPasswordValid(password: string): boolean {
    const regexp = new RegExp(/^(?=.*\d)[a-zA-Z\d]{8,}$/)
    if (!regexp.test(password)) {
      this.registerError = "Invalid password"
    }
    return regexp.test(password)
  }
}
