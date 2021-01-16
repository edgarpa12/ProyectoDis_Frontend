import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MemberService} from 'src/app/services/member.service';
import {Location} from '@angular/common';
import {StructureService} from 'src/app/services/structure.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {

  constructor(public router: Router, public memberService: MemberService,
              public structureService: StructureService, public location: Location) {
  }


  originSelected = false;
  origin: any;

  destinySelected = false;
  destiny: any;

  ngOnInit() {
    this.structureService.structureFlow = [];
    this.structureService.setFlow();
    this.structureService.structuresXMember(this.memberService.member.id);
  }

  goBack() {
    this.location.back();
  }

  clear() {
    this.originSelected = false;
    this.origin = null;

    this.destinySelected = false;
    this.destiny = null;

    this.structureService.structureFlow = [];
    this.structureService.setFlow();

    this.loadZone();
  }

  selectOrigin(structure) {
    this.origin = structure;
    this.originSelected = true;
  }

  selectDestiny(structure) {
    this.destiny = structure;
    this.destinySelected = true;
    console.log(this.structureService.structureFlow);
    this.structureService.structureFlow.push(structure);
    const type = this.structureService.type;
    if (type === 'zone') {
      this.structureService.setFlow();
      this.changeCategory();
    }
  }

  loadZone() {
    this.structureService.getOrg();
    this.structureService.setID(this.structureService.org[0]);
    this.structureService.setType('zone');
    this.structureService.getLevel(this.structureService.getID());
  }

  changeCategory() {
    const type = this.structureService.type;
    if (type === 'zone') {
      this.structureService.setType('branch');
    } else if (type === 'branch') {
      this.structureService.setType('group');
    }
  }

  goStructure(structure) {
    if (this.structureService.type !== 'group') {
      this.structureService.structureFlow.push(structure);
      this.structureService.setFlow();
      this.changeCategory();
      this.structureService.getLevel(structure._id);
    }
  }

  changeGroup() {
    this.memberService.changeGroup(this.memberService.member.id, this.origin.id, this.structureService.getIds());
  }

}
