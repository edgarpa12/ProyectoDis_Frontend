import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from '../../services/structure.service';
import { environment } from '../../../environments/environment.prod';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-shownew',
  templateUrl: './shownew.component.html',
  styleUrls: ['./shownew.component.css']
})
export class ShowNewComponent implements OnInit {

  constructor(public router: Router, public location: Location, private structureService: StructureService, private memberService: MemberService) {
  }

  news: any;
  imagesUri = environment.uri;

  ngOnInit() {
    this.news = JSON.parse(localStorage.getItem('news'));
    console.log(this.news);
    if (!this.news.data.seen) {
      this.structureService.markesAsSeen(this.news.data._id, this.memberService.loggedUser._id);
    }
  }

  goBack() {
    this.location.back();
  }

}
