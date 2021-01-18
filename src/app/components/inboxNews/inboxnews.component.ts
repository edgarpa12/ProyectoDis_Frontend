import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { StructureService } from '../../services/structure.service';

@Component({
  selector: 'app-inboxnews',
  templateUrl: './inboxnews.component.html',
  styleUrls: ['./inboxnews.component.css']
})
export class InboxNewsComponent implements OnInit {

  constructor(public router: Router, public location: Location,
              private memberService: MemberService, private structureService: StructureService
  ) {
  }

  news = [];

  async ngOnInit() {
    this.news = await this.structureService.getNews(this.memberService.loggedUser._id);
  }

  goBack() {
    this.location.back();
  }

}
