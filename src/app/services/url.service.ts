import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  url:string = "http://localhost:3000/"
  constructor() { }

  getExtractItemsURL() {
    return `${this.url}items?`;
  }
  getExtractPaginationItemsURL() {
    return `${this.url}pagination?`;
  }
  getSalesSummaryURL() {
    return `${this.url}summary?`;
  }

}
