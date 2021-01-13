import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { OrgMenuComponent } from './components/org-menu/org-menu.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { StructureCrudComponent } from './components/structure-crud/structure-crud.component';
import { StructureInfoComponent } from './components/structure-info/structure-info.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { MemberInfoComponent } from './components/member-info/member-info.component';
import { MemberCrudComponent } from './components/member-crud/member-crud.component';
import { OrgInfoComponent } from './components/org-info/org-info.component';
import { EasterEggComponent } from './components/easter-egg/easter-egg.component';
import { BranchCatalogueComponent } from './components/branch-catalogue/branch-catalogue.component';
import { SendNewsComponent } from './components/sendNews/sendnews.component';
import { SendCCGComponent } from './components/sendCCG/sendccg.component';
import { InboxCCGComponent } from './components/inboxCCG/inboxccg.component';
import { InboxNewsComponent } from './components/inboxNews/inboxnews.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'menu', component: OrgMenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manager', component: StructureCrudComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addMember', component: AddMemberComponent },
  { path: 'memberInfo', component: MemberInfoComponent },
  { path: 'memberCrud', component: MemberCrudComponent },
  { path: 'info', component: StructureInfoComponent },
  { path: 'orgInfo', component: OrgInfoComponent },
  { path: 'branchCatalogue', component: BranchCatalogueComponent },
  { path: 'easterEgg', component: EasterEggComponent },
  { path: 'sendNews', component: SendNewsComponent },
  { path: 'sendCCG', component: SendCCGComponent },
  { path: 'inboxCCG', component: InboxCCGComponent },
  { path: 'inboxNews', component: InboxNewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
