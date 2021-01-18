import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-showccg',
  templateUrl: './showccg.component.html',
  styleUrls: ['./showccg.component.css']
})
export class ShowccgComponent implements OnInit {

  constructor(public structService: StructureService, public router: Router, public memberService: MemberService, public location: Location) {
  }

  async ngOnInit() {
    this.memberService.member = [{ name: "" }];
    await this.structService.findCCG(this.structService.ccg);
    await this.memberService.getMemberInfo(this.memberService.ccg);
  }

  goBack() {
    this.location.back();
  }

}
