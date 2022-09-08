import { Component, OnInit } from '@angular/core';
import { ExtractService } from 'src/app/services/extract.service';
import { catchError, finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sales } from 'src/app/view-models/extract-sales.model';
import { GraphicSales } from 'src/app/view-models/graphic-sales.model';
import { OPTIONS_ORDER_DATE } from 'src/app/constants/opcoes-retratacao.const';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {
  listSales?: Sales[];
  limitPage: number = 10;
  page: number = 1;
  dataPagination:any = [];
  extractDataNotFound:boolean = false;
  order?: string;
  orderData = OPTIONS_ORDER_DATE;
  filterForm:any = FormGroup;
  graphicSales?: GraphicSales[] = [];
  constructor(private _extractService: ExtractService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.builFilterForm();
    this.getClientSales(this.limitPage, this.page, false);
  }
  builFilterForm(){
    this.filterForm = this.fb.group({
      orderDate: [this.orderData[0].value],
    });
  }

  compState = (val1: any, val2: any) => {
    return val1 && val2 ? val1.id === val2.id : val1 === val2;
  };

  getClientSales(limitPage: number, page: number, isPagination:boolean, order?:any, sortFiled?: any,){
    this._extractService.getSalesFiltered(page, limitPage, order, sortFiled).pipe(
      catchError((error) => {
        this.extractDataNotFound = true;
        return throwError(error);
      })
    ).subscribe((sales =>{
      if(sales && sales.length)
        this.extractDataNotFound = false;
        this.listSales = sales;
        if(!isPagination)
          this.buildPagination();
    }))
  }
  buildPagination(){
    this._extractService.getDataPagination().pipe(
      catchError((error) => {
        return throwError(error);
      })
    ).subscribe((data =>{
      if(data)
        for (let i = 0; i < (data.pageSize / this.limitPage); i++) {
            this.dataPagination.push(i + 1)
        }
      }
    ))
  }
  paginatiOnChange(page:any){
    this.page = page;
    this.getClientSales(this.limitPage, page, true, this.order);
  }

  returnAmoutTax(gross?: number, net?:number){
    return (gross ?? 0) - (net ?? 0);
  }

  orderByDate(value: string){
    this.order = value;
    this.getClientSales(this.limitPage, this.page, true, this.order);
  }

}
