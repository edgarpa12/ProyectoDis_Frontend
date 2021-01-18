import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-inboxnews',
  templateUrl: './inboxnews.component.html',
  styleUrls: ['./inboxnews.component.css']
})
export class InboxNewsComponent implements OnInit {

  constructor(public router: Router, public location: Location, public memberService: MemberService, public structService: StructureService) {
  }

  news = [];

  ngOnInit() {
    this.news.push(this.structService.getNews(this.memberService.loggedUser._id));
    this.structService.structuresXMember(this.memberService.loggedUser.id);
  }

  goBack() {
    this.location.back();
  }

}
