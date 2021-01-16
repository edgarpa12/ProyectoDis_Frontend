import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inboxnews',
  templateUrl: './inboxnews.component.html',
  styleUrls: ['./inboxnews.component.css']
})
export class InboxNewsComponent implements OnInit {

  constructor(public router: Router, public location: Location) {
  }

  ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

}
