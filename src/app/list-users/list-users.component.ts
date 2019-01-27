import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { LoginAuthService } from '../login-auth.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';

declare var jsPDF: any;

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public loginuser: any = {};
  public users: any = [];
  public currentstatus: any;

  constructor(private authService: LoginAuthService, private data: UsersService, private modalService: NgbModal, private activeModalService: NgbActiveModal) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentstatus = this.authService.getStatus().subscribe(currentstatus => {
      this.currentstatus = currentstatus;
    });
  }

  currentPage = 1;
  itemsPerPage = 12;
  pageSize: number;

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  ngOnInit() {
    this.data.getUsers(this.loginuser.token).subscribe(users => {
      this.users = users;

    }, err => {
      console.log(err);
    })
  }

  edit(user: any) {
    const modalRef = this.modalService.open(EditUserComponent, { size: 'lg' });
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.token = this.loginuser.token;
  } articles

  delete(user: any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.token = this.loginuser.token;
  }

  addUser() {
    const modalRef = this.modalService.open(AddUserComponent, { size: 'lg' });
    modalRef.componentInstance.token = this.loginuser.token;
  }

  printUsersAsPdf() {

    const doc = new jsPDF();

    var printableusers = this.users;

    printableusers.forEach(function(v){
      delete v.id;
      delete v.password;
      delete v.enabled;
      delete v.createdDate;
      delete v.updatedDate;
    });

    doc.text("Liste des utilisateurs", 30, 10);
    doc.autoTable({
      startY: 20,
      head: [{
        "firstName": "Prénom",
        "lastName": "Nom",
        "email": "E-mail",
        "phoneNumber": "Num. téléphone",
        "role": "Role"
      },],
      body: printableusers,
      tableWidth: 'wrap',
      styles: {cellWidth: 'auto', cellPadding: 1, fontSize: 10 }
    }
    );

    doc.save('utilisateurs.pdf');
  }


  printUsers() {
    const json = this.users;

    const data = json.map(row => ({
      nom: row.firstName,
      prenom: row.lastName,
      email: row.email,
      telephone: row.phoneNumber,
      role: row.role
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
      <p><strong>Êtes-vous sûrs de vouloir supprimer <span class="text-primary">"{{user.firstName}} {{user.lastName}} "</span>?</strong></p>
      <p>Toutes les informations relatives à cet utilisateur seront supprimées </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="deleteUser()">Ok</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() user;
  @Input() token;

  constructor(public activeModal: NgbActiveModal, private data: UsersService) { }

  deleteUser() {
    this.data.deleteUser(this.user, this.token).subscribe(response => {
      if (response) {
        this.activeModal.close('Close');
        window.location.reload();
      }
      this.activeModal.close('Close');
    })
  }
}
