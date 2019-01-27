import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../login-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Gestion d\'entrepôt';
  public loginuser: any = {};
  public currentstatus: any;

  constructor(private authService: LoginAuthService, private router: Router) {

    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentstatus = this.authService.getStatus().subscribe(currentstatus => {
      this.currentstatus = currentstatus;

    });
  }

  ngOnInit() { }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['Login']);
  }

}
