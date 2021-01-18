import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-org-info',
  templateUrl: './org-info.component.html',
  styleUrls: ['./org-info.component.css']
})
export class OrgInfoComponent implements OnInit {

  constructor(public router: Router, public structureService: StructureService, public location: Location) {
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
