import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { LoginAuthService } from '../login-auth.service';

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css']
})
export class ShowInventoryComponent implements OnInit {
  public loginuser: any = {};
  private id_inventory: any;
  private inventory: any = {};

  constructor(private authService: LoginAuthService, private router: Router, private route: ActivatedRoute, private data: InventoryService) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser'));

    this.route.queryParamMap.subscribe(params => {
      console.log(params);
      this.id_inventory = params["params"].id_inventory;
    });
  }

  ngOnInit() {
    this.data.getInventory(this.id_inventory, this.loginuser.token).subscribe(inventory => {
      this.inventory = inventory;
    }, err => {
      console.log(err);
    })
  }

  backToInventories() {
    if (this.loginuser.user.role=="ADMIN") {
      this.router.navigate(['/AdminDashboard']);

    } else

      this.router.navigate(['/GestionnaireDashboard']);


  }
}
