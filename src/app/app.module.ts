import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GestDashboardComponent } from './gest-dashboard/gest-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { NgbdModalContent } from './list-users/list-users.component';
import { NgbdModalEditArticle } from './list-articles/list-articles.component';

import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

import { UsersService } from './users.service';
import { AuthGuard } from './auth.guard';
import { LoginAuthService } from './login-auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import { NgbdModalDeleteInventory } from './list-inventory/list-inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { ShowInventoryComponent } from './show-inventory/show-inventory.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestDashboardComponent,
    AdminDashboardComponent,
    NavbarComponent,
    ListArticlesComponent,
    ListUsersComponent,
    AddUserComponent,
    EditUserComponent,
    AddArticleComponent,
    EditArticleComponent,
    NgbdModalContent,
    NgbdModalEditArticle,
    EditProfileComponent,
    ListInventoryComponent,
    NgbdModalDeleteInventory,
    AddInventoryComponent,
    ShowInventoryComponent,
    EditInventoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    UsersService,
    LoginAuthService,
    NgbActiveModal,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponent,
    EditUserComponent,
    AddArticleComponent,
    EditArticleComponent,
    ListUsersComponent,
    ListArticlesComponent,
    NgbdModalContent,
    AddArticleComponent,
    NgbdModalEditArticle,
    NgbdModalDeleteInventory,
    AddInventoryComponent,
    EditInventoryComponent
  ]

})
export class AppModule { }
