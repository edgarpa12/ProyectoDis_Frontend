import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  constructor(public router: Router, public memberService: MemberService, public location: Location) { }

  ngOnInit() {
  }

  createMember() {
    this.memberService.createMember();
    this.memberService.setFormMiembro();
    this.router.navigate(['/memberCrud'])
  }

  goBack() {
    this.memberService.setFormMiembro();
    this.router.navigate(['/memberCrud']);
  }



}