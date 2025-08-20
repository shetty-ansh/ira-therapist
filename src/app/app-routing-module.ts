import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ira } from './Components/ira/ira';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ira',
    pathMatch: 'full'
  },
  {
    path: 'ira',
    component: Ira
  },
  {
    path: '**',
    redirectTo: '/ira'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
