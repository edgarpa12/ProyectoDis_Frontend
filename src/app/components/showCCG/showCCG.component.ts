import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showccg',
  templateUrl: './showccg.component.html',
  styleUrls: ['./showccg.component.css']
})
export class ShowCCGComponent implements OnInit{

  constructor(public router: Router, public location: Location) { }

  ngOnInit(){
    
  }

  goBack() {
    this.location.back()
  }

}
