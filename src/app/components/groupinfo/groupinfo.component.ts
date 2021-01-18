import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MemberService} from 'src/app/services/member.service';
import {StructureService} from 'src/app/services/structure.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-groupinfo',
  templateUrl: './groupinfo.component.html',
  styleUrls: ['./groupinfo.component.css']
})
export class GroupInfoComponent implements OnInit {

  constructor(
    public structService: StructureService,
    public router: Router,
    public memberService: MemberService,
    public location: Location) {
  }

  selected;

  async ngOnInit() {
    this.structService.getFlow();
    await this.structService.getStructureMembers();
    await this.structService.getStructureBosses();
    this.structService.getType();
  }

  goBack() {
    this.location.back();
  }
  getMemberInfo(member) {
    this.memberService.member = member;
    this.router.navigate(['/memberInfo']);
  }

  breadcrumb(type) {
    if (type === 0) {
      this.structService.setID(this.structService.org[0]);
      this.structService.getLevel(this.structService.org[0]);
      this.structService.setType('zone');
      this.structService.structureFlow = [];
      this.structService.setFlow();
      this.router.navigate(['/manager']);
    } else if (type === 1) {
      this.structService.setID(this.structService.structureFlow[0]._id);
      this.structService.getLevel(this.structService.structureFlow[0]._id);
      this.structService.setType('branch');
      this.structService.structureFlow = this.structService.structureFlow.slice(0, 1);
      this.structService.setFlow();
      this.router.navigate(['/manager']);
    } else if (type === 2) {
      this.structService.setID(this.structService.structureFlow[1]._id);
      this.structService.getLevel(this.structService.structureFlow[1]._id);
      this.structService.setType('group');
      this.structService.structureFlow = this.structService.structureFlow.slice(0, 2);
      this.structService.setFlow();
      this.router.navigate(['/manager']);
    }
  }

}
