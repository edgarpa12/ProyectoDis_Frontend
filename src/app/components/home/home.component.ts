import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public structService: StructureService) { }

  ngOnInit() {
  }

  onMenu() {
    this.router.navigate(['/menu'])
  }

  getMembers() {
    this.router.navigate(['/memberCrud'])
  }

  onManageOrganization() {
    this.router.navigate(['/orgInfo'])
  }

}
