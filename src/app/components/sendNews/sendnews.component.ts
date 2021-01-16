import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-sendnews',
  templateUrl: './sendnews.component.html',
  styleUrls: ['./sendnews.component.css']
})
export class SendNewsComponent implements OnInit {

  constructor(public router: Router, public memberService: MemberService, public location: Location) {
  }

  ngOnInit() {
    console.log(localStorage.getItem("newsStructure"));
  }

  goBack() {
    this.location.back();
  }

}
