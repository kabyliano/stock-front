import { Component, OnInit, Input } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { LoginAuthService } from '../login-auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { Router, NavigationExtras } from "@angular/router";
import { EditInventoryComponent } from '../edit-inventory/edit-inventory.component';

declare var jsPDF: any;

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.css']
})

export class ListInventoryComponent implements OnInit {

  public loginuser;
  public currentstatus: any;
  public inventories: any = [];

  currentPage = 1;
  itemsPerPage = 12;
  pageSize: number;

  constructor(private authService: LoginAuthService, private data: InventoryService, private modalService: NgbModal, private activeModalService: NgbActiveModal, private router: Router) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentstatus = this.authService.getStatus().subscribe(currentstatus => {
      this.currentstatus = currentstatus;
    });
  }

  ngOnInit() {
    if (this.loginuser.user.role == 'ADMIN') {

        console.log("has been executed");
      this.data.getInventories(this.loginuser.token).subscribe(inventories => {
        this.inventories = inventories;
      }, err => {
        console.log(err);
      })
    } else {
      this.data.getLastFiveInventories(this.loginuser.token).subscribe(reponse => {

        this.inventories = reponse._embedded.inventories;
      }, err => {
        console.log(err);
      })
    }
  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  addInventory() {
    const modalRef = this.modalService.open(AddInventoryComponent, { size: 'lg' });
  }

  edit(inventory: any) {
    const modalRef = this.modalService.open(EditInventoryComponent, { size: 'lg' });
    modalRef.componentInstance.id_inventory = inventory.id_inventory;
  }

  delete(inventory: any) {
    const modalRef = this.modalService.open(NgbdModalDeleteInventory);
    modalRef.componentInstance.inventory = inventory;
    modalRef.componentInstance.token = this.loginuser.token;
  }

  show(inventory: any) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id_inventory": inventory.id_inventory
      }
    };
    this.router.navigate(["ShowInventory"], navigationExtras);
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
      <p>Toutes les informations relatives à cet inventaire seront supprimées </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="deleteInventory()">Ok</button>
    </div>
  `
})

export class NgbdModalDeleteInventory {
  @Input() inventory;
  @Input() token;
  constructor(public activeModal: NgbActiveModal, private data: InventoryService) { }

  deleteInventory() {

    this.data.deleteInventory(this.inventory, this.token).subscribe(response => {
      if (response) {
        this.activeModal.close('Close');
      }
      this.activeModal.close('Close');
    })
  }
}
