import { TestBed } from '@angular/core/testing';
import { ExtractService } from './extract.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Sales } from './../view-models/extract-sales.model';

describe('ExtractService', () => {
  let service: ExtractService;
  let http: HttpClient;
  let url = "http://localhost:3000/";
  // const httpStub ={
  //   get: (_params: any)  => of(sales)
  // }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule ],
      providers: [ExtractService]
    });
    service = TestBed.inject(ExtractService);
    http = TestBed.inject(HttpClient);
  });

  it('created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllSales() called successfully', () =>{
    const spyService = spyOn(http, 'get').and.callThrough();
    service.getAllSales();
    expect(spyService).toHaveBeenCalledOnceWith(`${url}items`);
  });

  it('getDataPagination() called successfully', () =>{
    const spyService = spyOn(http, 'get').and.callThrough();
    service.getDataPagination();
    expect(spyService).toHaveBeenCalledOnceWith(`${url}pagination`);
  });

  it('getSalesSummary() called successfully', () =>{
    const spyService = spyOn(http, 'get').and.callThrough();
    service.getSalesSummary();
    expect(spyService).toHaveBeenCalledOnceWith(`${url}summary`);
  });
});
