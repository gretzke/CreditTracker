import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreditsComponent } from './credits/credits.component';
import { CreditDetailsComponent } from './credit-details/credit-details.component';
import { CdosComponent } from './cdos/cdos.component';

import { HttpClientModule } from '@angular/common/http';  // <-Add here
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';

import { DataService } from './data.service';

import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { AddCreditDialogComponent } from './dialog/add-credit-dialog/add-credit-dialog.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateCdoDialogComponent } from './dialog/create-cdo-dialog/create-cdo-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CreditsComponent,
    CreditDetailsComponent,
    CdosComponent,
    AddCreditDialogComponent,
    CreateCdoDialogComponent,
    jqxChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [AddCreditDialogComponent, CreateCdoDialogComponent]
})
export class AppModule { }
