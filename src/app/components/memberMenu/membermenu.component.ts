import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StructureService} from 'src/app/services/structure.service';
import {MemberService} from 'src/app/services/member.service';

import {Location} from '@angular/common';

@Component({
  selector: 'app-membermenu',
  templateUrl: './membermenu.component.html',
  styleUrls: ['./membermenu.component.css']
})
export class MemberMenuComponent implements OnInit {

  constructor(
    public router: Router,
    public location: Location,
    public memberService: MemberService,
    public structService: StructureService,
  ) {
  }

  async ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

  verIntegrantes() {
    this.router.navigate(['/groupInfo']);
  }

  verDatos(member) {
    this.memberService.member = member;
    this.router.navigate(['/memberInfo']);
  }

  enviarCCG(member) {
    this.memberService.member = member;
    this.router.navigate(['/sendCCG']);
  }

  verNews(member) {
    this.memberService.member = member;
    this.router.navigate(['/inboxNews']);
  }

}
