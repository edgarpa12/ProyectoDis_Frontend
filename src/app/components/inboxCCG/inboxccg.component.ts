import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-inboxccg',
  templateUrl: './inboxccg.component.html',
  styleUrls: ['./inboxccg.component.css']
})
export class InboxCCGComponent implements OnInit {

  constructor(public router: Router, public location: Location, public memberService: MemberService, public structService: StructureService) {
  }
  selected;
  action;

  ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

  enabledCCGs(structure){
    this.action = 'Editar';
    this.selected = structure;
    this.structService.enabledCCGs(structure._id);
  }

}
