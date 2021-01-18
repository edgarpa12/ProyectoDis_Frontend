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

  constructor(public router: Router, public memberService: MemberService, public location: Location) {
  }

  ngOnInit() {
  }

  async createMember() {
    if (await this.memberService.createMember()) {
      //this.memberService.setFormMiembro();
      this.router.navigate(['/memberCrud']);
    }
    alert(this.memberService.msg);
    this.memberService.setFormMiembro();
  }

  goBack() {
    this.memberService.setFormMiembro();
    this.router.navigate(['/memberCrud']);
  }


}
