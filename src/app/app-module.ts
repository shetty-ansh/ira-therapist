import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Ira } from './Components/ira/ira';
import { Navbar } from './Components/navbar/navbar';
import { Homepage } from './Components/homepage/homepage';
import { About } from './Components/about/about';
import { Settings } from './Components/settings/settings';

@NgModule({
  declarations: [
    App,
    Ira,
    Navbar,
    Homepage,
    About,
    Settings
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
