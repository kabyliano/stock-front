import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../article.service';
import { LoginAuthService } from '../login-auth.service';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddArticleComponent } from '../add-article/add-article.component';

declare var jsPDF: any;

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  public loginuser: any = {};
  public currentstatus: any;
  public articles: any = [];

  currentPage = 1;
  itemsPerPage = 12;
  pageSize: number;

  constructor(private authService: LoginAuthService, private data: ArticleService, private modalService: NgbModal, private activeModalService: NgbActiveModal) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentstatus = this.authService.getStatus().subscribe(currentstatus => {
      this.currentstatus = currentstatus;
    });
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  addArticle() {
    const modalRef = this.modalService.open(AddArticleComponent, { size: 'lg' });
  }

  printArticlesAsPdf() {

    var printableproducts = this.articles;

    printableproducts.forEach(function(v){
      delete v.idProduct;
      delete v.quantity;
    });




    const doc = new jsPDF();
    doc.text("Liste des articles", 30, 10);
    doc.autoTable({
      startY: 20,
      head: [{
        "codeProduct": "Code",
        "designation": "Désignation",
        "prixUnitaireHT": "Prix U HT",
        "category": "Catégorie",
      },],
      body: printableproducts,
      tableWidth: 'wrap',
      styles: { cellWidth: 'auto', cellPadding: 1, fontSize: 13 }
    }
    );

    doc.save('produits.pdf');
  }



  printArticlesAsCSV() {
    const json = this.articles;
    const data = json.map(row => ({

      code: row.codeProduit,
      designation: row.designation,
      quantite: row.quantite,
      prix: row.prixUnitaireHT,
      categorie: row.categorie
    }));

    const csvData = this.objetToCsv(data);
    this.downloadCSV(csvData);
  }

  downloadCSV(data) {
    console.log(data);
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  printArticlesAsJSON() {
    const str = JSON.stringify(this.articles, null, 2);
    const blob = new Blob([str], { type: 'text/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  objetToCsv(data) {

    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  }

  ngOnInit() {
    this.data.getArticles(this.loginuser.token).subscribe(produits => {
      this.articles = produits;
      console.log(this.articles);
    }, err => {
      console.log(err);
    })
  }

  edit(article: any) {
    const modalRef = this.modalService.open(EditArticleComponent, { size: 'lg' });
    modalRef.componentInstance.article = article;
  }

  delete(article: any) {
    const modalRef = this.modalService.open(NgbdModalEditArticle);
    modalRef.componentInstance.article = article;
    modalRef.componentInstance.token = this.loginuser.token;
  }

}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Supprimer</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Êtes-vous sûrs de vouloir supprimer ?</strong></p>
      <p>Toutes les informations relatives à ce prduit seront supprimées </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="deleteArticle()">Ok</button>
    </div>
  `})

export class NgbdModalEditArticle {
  @Input() article;
  @Input() token;

  constructor(public activeModal: NgbActiveModal, private data: ArticleService) { }

  deleteArticle() {
    this.data.deleteArticle(this.article, this.token).subscribe(response => {
      if (response) {
        this.activeModal.close('Close');
      }
      this.activeModal.close('Close');
    })
  }
}
