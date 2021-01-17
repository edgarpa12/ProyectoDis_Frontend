import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-org-menu',
  templateUrl: './org-menu.component.html',
  styleUrls: ['./org-menu.component.css']
})
export class OrgMenuComponent implements OnInit {

  constructor(
    public router: Router,
    public structService: StructureService,
    public location: Location
  ) {
  }

  ngOnInit() {
    this.structService.structureFlow = [];
    this.structService.setFlow();
  }

  goZones() {
    this.structService.setID(this.structService.org[0]);
    this.onStructure('zone');
  }

  onStructure(type: string) {
    this.structService.setType(type);
    this.router.navigate(['/manager']);
  }

  goBranchCatalogue() {
    this.router.navigate(['/branchCatalogue']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
