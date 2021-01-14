import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StructureService} from 'src/app/services/structure.service';
import {MemberService} from 'src/app/services/member.service';

import {Location} from '@angular/common';

@Component({
  selector: 'app-bossmenu',
  templateUrl: './bossmenu.component.html',
  styleUrls: ['./bossmenu.component.css']
})
export class BossMenuComponent implements OnInit {

  constructor(
    public router: Router,
    public location: Location,
    public memberService: MemberService,
    public structService: StructureService,
  ) {
  }

  async ngOnInit() {

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

  verGruposACargo() {

  }

  verDatosZonasRamas() {

  }

  verNodo() {

  }

}
