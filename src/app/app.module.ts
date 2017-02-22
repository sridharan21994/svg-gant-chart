import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HTTPService} from './http-test/http.service';
import { AppComponent } from './app.component';
import { HttpComponent } from './http-test/http-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HttpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HTTPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
