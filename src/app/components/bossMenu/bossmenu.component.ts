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

  goBack() {
    this.location.back();
  }

  verIntegrantes() {
    this.router.navigate(['/info']);
  }

  verGruposACargo() {

  }

  verDatosZonasRamas() {
    this.router.navigate(['/menu']);
  }

  verNodo() {

  }

}
