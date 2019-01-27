import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  public static API_URL = "http://172.20.10.2:8090/";
  constructor(private http: HttpClient) {
    this.http = http;
  }

  saveInventory(inventory: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.post(InventoryService.API_URL + "inventory/save", inventory, { headers: headers });
  }

  getInventory(id_inventory: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(InventoryService.API_URL + "inventories/" + id_inventory, { headers: headers });
  }

  getLastFiveInventories(token: any): Observable<any> {
    const params = new HttpParams().set('size', '5');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(InventoryService.API_URL + "inventories", { headers: headers, params: params });
  }

  getInventories(token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(InventoryService.API_URL + "inventory/list", { headers: headers });
  }

  deleteInventory(inventory: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.delete(InventoryService.API_URL + "inventory/delete/" + inventory.id_inventory, { headers: headers });
  } $
}
