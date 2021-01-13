import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sendccg',
  templateUrl: './sendccg.component.html',
  styleUrls: ['./sendccg.component.css']
})
export class SendCCGComponent implements OnInit{

  constructor(public router: Router, public location: Location) { }

  ngOnInit(){
    
  }

  goBack() {
    this.location.back()
  }

}
