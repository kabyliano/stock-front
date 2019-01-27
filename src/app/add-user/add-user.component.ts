import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Input() token;
  public user: any = {};

  constructor(private data: UsersService, public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  saveUser(user: any, userForm: any) {
    user.enabled = true;
    this.data.saveUser(user, this.token).subscribe(response => {
      if (response) {
        this.activeModal.close('');
        window.location.reload();
      }
        this.activeModal.close('');
    })
  }
}
