import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from '../login-auth.service';
import { UsersService } from '../users.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public user: any = {};

  constructor(private userService: UsersService, private router: Router, private authService: LoginAuthService) {
    this.authService.isLoggedIn();
  }

  ngOnInit() {
  }

  loginUser(user: any) {
    this.userService.loginUser(user).subscribe((response) => {
      if (response) {
        if (response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          if (response.user.role === 'ADMIN') {
            this.router.navigate(['/AdminDashboard']);
          } else {
            this.router.navigate(['/GestionnaireDashboard']);
          }
        }
      }

    }, err => {
     console.log("bad credentials");
    }
  )
  }


}
