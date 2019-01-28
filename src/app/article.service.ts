import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public static API_URL = "http://172.20.10.2:8090/";

  constructor(private http: HttpClient) {
    this.http = http;
  }

  saveArticle(article: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.post(ArticleService.API_URL + "product/save", article, { headers: headers });
  }

  getArticles(token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(ArticleService.API_URL + "product/list", { headers: headers });
  }

  editArticle(article: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token  });
    console.log(article);
    return this.http.put(ArticleService.API_URL + "product/update/" + article.idProduct, article, { headers: headers });
  }

  getCategories(token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(ArticleService.API_URL + "category/list", { headers: headers });
  }

  deleteArticle(article: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.delete(ArticleService.API_URL + "product/delete/" + article.idProduct, { headers: headers });
  }

}
