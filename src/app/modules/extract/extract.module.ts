import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtractRoutingModule } from './extract-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';

import { ExtractComponent } from './extract.component';
import { SummaryComponent } from 'src/app/components/summary/summary.component';



@NgModule({
  declarations: [
    ExtractComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExtractRoutingModule,
    MatExpansionModule,
  ]
})
export class ExtractModule { }
