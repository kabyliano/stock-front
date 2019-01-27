import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable(
  /*{
  providedIn: 'root'
}*/
)
export class UsersService {
  public static API_URL = "http://172.20.10.2:8090/";

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getUsers(token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(UsersService.API_URL + "users", { headers: headers });
  }

  getUser(token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(UsersService.API_URL + "getuser", { headers: headers });
  }

  saveUser(user: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.post(UsersService.API_URL + "registration", user, { headers: headers });
  }

  editUser(user: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.put(UsersService.API_URL + "user/update/" + user.id, user, { headers: headers });
  }
  updateProfile(user: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.put(UsersService.API_URL + "user/update/profile/", user, { headers: headers });
  }

  deleteUser(user: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.delete(UsersService.API_URL + "user/delete/" + user.id, { headers: headers });
  }

  loginUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this.http.post(UsersService.API_URL + "login", user, { headers: headers });
  }
}
