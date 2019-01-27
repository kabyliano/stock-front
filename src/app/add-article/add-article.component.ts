import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginAuthService } from '../login-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  public loginuser: any = {};
  public article: any = {};
  public listCategory: any[];

  constructor(private authService: LoginAuthService, private router: Router, private data: ArticleService, public activeModal: NgbActiveModal) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
    this.data.getCategories(this.loginuser.token).subscribe(categories => {
      this.listCategory = categories;
    }, err => {
      console.log(err);
    })
  }

  saveArticle(article: any, articleForm: any) {
    this.data.saveArticle(article, this.loginuser.token).subscribe(response => {
      if (response) {
        console.log(response);
        window.location.reload();

      }
    })
  }

}
