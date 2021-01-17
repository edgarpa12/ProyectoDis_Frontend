import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { Location } from '@angular/common';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public structService: StructureService, public memberService: MemberService) {
  }

  ngOnInit() {
  }

  onMenu() {
    this.router.navigate(['/menu']);
  }

  getMembers() {
    this.router.navigate(['/memberCrud']);
  }

  onSendCCGs() {
    this.router.navigate(['/sendCCG']);
  }

}
