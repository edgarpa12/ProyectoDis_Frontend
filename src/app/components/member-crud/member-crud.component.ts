import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-crud',
  templateUrl: './member-crud.component.html',
  styleUrls: ['./member-crud.component.css']
})
export class MemberCrudComponent implements OnInit {

  constructor(public memberService: MemberService, public router: Router, public location: Location) {
  }

  selected = {
    name: '',
    phone: '',
    direction: '',
    monitor: false,
    email: ''
  };

  async ngOnInit() {
    await this.memberService.getMembers();
  }

  getMemberInfo(member) {
    this.memberService.member = member;
    this.router.navigate(['/memberInfo']);
  }

  addMember() {
    this.router.navigate(['/addMember']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  deleteMemberAux(member) {
    this.selected = member;
  }

  async deleteMember() {
    await this.memberService.deleteMember(this.selected);
    await this.memberService.getMembers();
    alert(this.memberService.msg);
  }

  editMember(member) {
    console.log(member);
    this.selected = member;
  }

  async confirmEditMember() {
    await this.memberService.editMember(this.selected);
    await this.memberService.getMembers();
    alert(this.memberService.msg);
  }

}
