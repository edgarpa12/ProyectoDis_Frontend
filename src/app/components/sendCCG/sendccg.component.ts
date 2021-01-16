import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-sendccg',
  templateUrl: './sendccg.component.html',
  styleUrls: ['./sendccg.component.css']
})
export class SendCCGComponent implements OnInit {

  constructor(public router: Router, public memberService: MemberService, public location: Location) {
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  sendCCG() {
    if (this.memberService.formCCG.controls.body.value !== '') {
      this.memberService.sendCCG();
    } else {
      alert('Por favor escribir un mensaje');
    }
  }

}
