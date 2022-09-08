import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlService } from './url.service';

import { Sales } from '../view-models/extract-sales.model';
import { Pagination } from '../view-models/pagination.model';
import { Summary } from './../view-models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class ExtractService {
  constructor(private _http: HttpClient, private _urlService: UrlService) { }
  private url = "http://localhost:3000/"

  getAllSales(): Observable<any[]> {
    return this._http.get<any[]>(`${this.url}items`)
  }
  getSalesFiltered(page: number, limit: number, order:string = "desc", sortField:string = "date",): Observable<Sales[]> {
    return this._http.get<Sales[]>(`${this.url}items?_page=${page}&_limit=${limit}&_sort=${sortField}&_order=${order}`)
  }
  getDataPagination(){
    return this._http.get<Pagination>(`${this.url}pagination`)
  }
  getSalesSummary(){
    return this._http.get<Summary>(`${this.url}summary`)
  }
}
