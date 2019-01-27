import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../article.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginAuthService } from '../login-auth.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  public loginuser: any = {};
  @Input() article;
  public listCategory: any[];

  constructor(private authService: LoginAuthService, private data: ArticleService, public activeModal: NgbActiveModal) {
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

  editArticle(article: any, articleForm: any) {
    this.data.editArticle(article, this.loginuser.token).subscribe(response => {
      if (response) {

        this.activeModal.close('');
      }
    })
  }

}
