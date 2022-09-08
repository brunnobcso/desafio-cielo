import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/extract', pathMatch: 'full' },
      {
        path: 'extract',
        loadChildren:() => import('./modules/extract/extract.module').then(m => m.ExtractModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
