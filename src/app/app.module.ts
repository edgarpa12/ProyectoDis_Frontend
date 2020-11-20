import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component'
import { HomeComponent } from './components/home/home.component';
import { OrgMenuComponent } from './components/org-menu/org-menu.component';
import { RegisterComponent } from './components/register/register.component';
import { StructureCrudComponent } from './components/structure-crud/structure-crud.component';
import { StructureInfoComponent } from './components/structure-info/structure-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { MemberInfoComponent } from './components/member-info/member-info.component';
import { MemberCrudComponent } from './components/member-crud/member-crud.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrgInfoComponent } from './components/org-info/org-info.component';
import { BranchCatalogueComponent } from './components/branch-catalogue/branch-catalogue.component';
import { EasterEggComponent } from './components/easter-egg/easter-egg.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    RegisterComponent,
    OrgMenuComponent,
    AddMemberComponent,
    MemberInfoComponent,
    StructureCrudComponent,
    StructureInfoComponent,
    MemberCrudComponent,
    OrgInfoComponent,
    EasterEggComponent,
    BranchCatalogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
