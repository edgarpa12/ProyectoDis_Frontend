import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shownew',
  templateUrl: './shownew.component.html',
  styleUrls: ['./shownew.component.css']
})
export class ShowNewComponent implements OnInit {

  constructor(public router: Router, public location: Location) {
  }

  ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

}
