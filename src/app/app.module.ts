import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormClassComponent } from './componentes/form-class/form-class.component';
import { ReactiveComponent } from './componentes/reactive/reactive.component';
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './componentes/template/template.component';
// import { Template } from '@angular/compiler/src/render3/r3_ast';


@NgModule({
  declarations: [
    AppComponent,
    FormClassComponent,
    ReactiveComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
