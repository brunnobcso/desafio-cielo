import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExtractService } from 'src/app/services/extract.service';
import { GraphicSales } from 'src/app/view-models/graphic-sales.model';
import { Summary } from './../../view-models/summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  clientSalesSummary?: Summary;
  limit: number = 10;
  graphicSales?: GraphicSales[] = [];
  salesSummaryaNotFound: boolean = false;
  setDataGraphicNotFound: boolean = false;
  @ViewChild('lastSalesChart', {static: true}) element?: ElementRef;
  constructor(private _extractService: ExtractService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getSalesSummary();
    this.setDataGraphic();
  }

  getSalesSummary(){
    this._extractService.getSalesSummary().pipe(
      catchError((error) => {
        this.salesSummaryaNotFound = true;
        return throwError(error);
      })
    ).subscribe((summary =>{
      if(summary)
      this.salesSummaryaNotFound = false;
        this.clientSalesSummary = summary;
      }
    ))
  }

  setDataGraphic(){
    this._extractService.getAllSales().pipe(
      catchError((error) => {
        this.setDataGraphicNotFound = true;
        return throwError(error);
      })
    ).subscribe((sales =>{
      if(sales){
        this.setDataGraphicNotFound = false;
        let graphicValues = [], graphicLabels = [];
        for (let index = 0; index < this.limit; index++) {
          let maxAge = sales.reduce(function(prev, current) {
            return (prev.netAmount ?? 0) > (current.netAmount ?? 0) ? prev : current;
          });
          graphicValues.push(maxAge.netAmount);
          graphicLabels.push(this.formartDate(maxAge.date));
          sales = sales.filter(x => x.id !== maxAge.id);
        }
        this.createChart(graphicValues, graphicLabels);
      }
    }))
  }

  createChart(listValue: any[], listLabels:any[]){
    new Chart(this.element?.nativeElement, {
      type: 'line',
      data: {
        labels: listLabels,
        datasets: [
          {
            borderWidth:3,
            borderColor: '#0052CC',
            data: listValue,
          }
        ]
      },
      options: {
        plugins: {
          legend: {
              display: false
          },
        },
        responsive: true,
      }
    })
  }

  formartDate(date:any){
    var dateF = new Date(date),
        day  = dateF.getDate().toString(),
        dayF = (day.length == 1) ? '0'+day : day,
        mouth  = (dateF.getMonth()+1).toString(),
        mouthF = (mouth.length == 1) ? '0'+mouth : mouth,
        yearF = dateF.getFullYear();
    return dayF+"/"+mouthF+"/"+yearF;
}
}
