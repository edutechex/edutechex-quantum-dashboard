import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SideNavbarComponent } from './pages/side-navbar/side-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VisitorsComponent } from './pages/visitors/visitors.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ServicesComponent } from './pages/content-upload/services/services.component';
import { TeamComponent } from './pages/content-upload/team/team.component';
import { AddOrEditServicesComponent } from './pages/content-upload/services/add-or-edit-services/add-or-edit-services.component';
import { AddOrEditTeamComponent } from './pages/content-upload/team/add-or-edit-team/add-or-edit-team.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CareerComponent } from './pages/content-upload/career/career.component';
import { AddOrEditCareerComponent } from './pages/content-upload/career/add-or-edit-career/add-or-edit-career.component';
import { PartnerComponent } from './pages/content-upload/partner/partner.component';
import { AddOrEditPartnerComponent } from './pages/content-upload/partner/add-or-edit-partner/add-or-edit-partner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavbarComponent,
    DashboardComponent,
    VisitorsComponent,
    ServicesComponent,
    TeamComponent,
    AddOrEditServicesComponent,
    AddOrEditTeamComponent,
    CareerComponent,
    AddOrEditCareerComponent,
    PartnerComponent,
    AddOrEditPartnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
