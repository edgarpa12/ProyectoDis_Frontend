import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inboxccg',
  templateUrl: './inboxccg.component.html',
  styleUrls: ['./inboxccg.component.css']
})
export class InboxCCGComponent implements OnInit{

  constructor(public router: Router, public location: Location) { }

  ngOnInit(){
    
  }

  goBack() {
    this.location.back()
  }

}
