import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

    @Input() user;
    @Input() token;

  constructor(private data: UsersService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.user.password = "";
   }

  editUser(user: any, userForm: any) {
    user.enabled = true;
    this.data.editUser(user, this.token).subscribe(response => {
      if (response) {
        this.activeModal.close('');
      }
    })
  }
}
