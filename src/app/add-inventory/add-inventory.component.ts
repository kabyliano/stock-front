import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { InventoryService } from '../inventory.service';
import { LoginAuthService } from '../login-auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  public loginuser;

  public inventory: any = {};
  public productsListToshow: any[];

  public produits: any = [];
  private produit: any = {};

  constructor(private authService: LoginAuthService, private data: ArticleService, private datainv: InventoryService, public activeModal: NgbActiveModal) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.data.getArticles(this.loginuser.token).subscribe(articles => {
      this.productsListToshow = articles;
    }, err => {
      console.log(err);
    })

    this.inventory = {
      close: 1,
      date_inventory: new Date(),
      num_inventory: "",
      produits: []
    };

    this.produit = { key: { idProduct: "" }, value: 0 };
  }

  addFieldValue() {
    this.produits.push(this.produit);
    console.log(this.produits);
    this.produit = { key: { idProduct: "" }, value: 0 };
  }

  deleteFieldValue(index) {
    this.produits.splice(index, 1);
    console.log(this.produits);
  }

  saveInventory(inventory: any, inventoryForm: any, state: any) {
    this.produits.push(this.produit);
    this.inventory.produits = this.produits;
    inventory.close = state;

    console.log(this.inventory);

    this.datainv.saveInventory(inventory, this.loginuser.token).subscribe(response => {
      if (response) {
        window.location.reload();
      }

    })
      this.activeModal.close('');
  }
}
