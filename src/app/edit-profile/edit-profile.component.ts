import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Validators } from '@angular/forms';
import { LoginAuthService } from '../login-auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user;
  public loginuser: any;

  constructor(private authService: LoginAuthService, private data: UsersService) {
    this.authService.isLoggedIn();
    this.loginuser = (JSON.parse(localStorage.getItem('currentUser')));
    this.user = this.loginuser.user;
    this.user.password = "";
  }

  ngOnInit() { }

  editUser(user: any, userForm: any) {
    user.enabled = true;
    this.data.updateProfile(user, this.loginuser.token).subscribe(response => {
      if (response) {
        console.log(response);
        this.user = user;
        window.location.reload();
      }
    })
  }
}
