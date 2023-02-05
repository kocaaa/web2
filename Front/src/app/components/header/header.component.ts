import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input()
  username: string = "";

  constructor(private cookieService: CookieService,
    private router: Router) { }

  logout() {
    this.cookieService.deleteAll()
    this.router.navigate(["/login"])
  }
}
