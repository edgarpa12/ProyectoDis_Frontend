import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MemberService} from 'src/app/services/member.service';
import {StructureService} from 'src/app/services/structure.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-structure-info',
  templateUrl: './structure-info.component.html',
  styleUrls: ['./structure-info.component.css']
})
export class StructureInfoComponent implements OnInit {

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

  addMemberAux() {
    this.memberService.getMembers();
  }

  async addMember(member) {
    await this.structService.addMember(member.id);
    await this.structService.getStructureMembers();
    alert(this.structService.msg);
  }

  async addBoss(member) {
    const response = await this.structService.addBoss(member.id);

    alert(response['message']);

  }

  getMemberInfo(member) {
    this.memberService.member = member;
    this.router.navigate(['/memberInfo']);
  }

  deleteMemberAux(member) {
    this.selected = member;
    this.structService.type = 'member';
  }

  async deleteMember() {
    const structureFlow = this.structService.structureFlow;
    const group = structureFlow[structureFlow.length - 1];
    const response = await this.structService.deleteMember(this.selected.id, group._id);

    alert(response['message']);

  }

  deleteBossAux(boss) {
    this.selected = boss;
    this.structService.type = 'boss';
  }

  async deleteBoss() {
    const structureFlow = this.structService.structureFlow;
    const group = structureFlow[structureFlow.length - 1];
    const parent = structureFlow[structureFlow.length - 2];
    await this.structService.deleteBoss(this.selected.id, parent, group);
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
