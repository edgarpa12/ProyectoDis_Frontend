import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-inboxccg',
  templateUrl: './inboxccg.component.html',
  styleUrls: ['./inboxccg.component.css']
})
export class InboxCCGComponent implements OnInit {

  constructor(public structService: StructureService, public router: Router, public memberService: MemberService, public location: Location) {
  }
  selected;
  action;

  ngOnInit() {
    this.getCCGs();
  }

  goBack() {
    this.location.back();
  }

  async enabledCCGs() {
    const structId = this.structService.org[0]
    await this.structService.enabledCCGs(structId);
    await this.structService.getCCGs(structId);
  }

  async getCCGs() {
    const structId = this.structService.org[0]
    await this.structService.getCCGs(structId);
  }

  goCCG(ccg) {
    this.structService.ccg = ccg._id;
    this.memberService.ccg = ccg.from;
    this.router.navigate(['/showCCG']);
  }

}
