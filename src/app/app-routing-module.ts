import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ira } from './Components/ira/ira';
import { App } from './app';
import { Homepage } from './Components/homepage/homepage';
import { About } from './Components/about/about';
import { Settings } from './Components/settings/settings';

const routes: Routes = [
  {
    path: '',
    // redirectTo: '/ira',
    pathMatch: 'full',
    component:Homepage
  },
  {
    path: 'ira',
    component: Ira
  },
  {
    path: 'about',
    component:About
  },
  {
    path: 'settings',
    component:Settings
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
