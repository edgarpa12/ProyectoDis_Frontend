import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sendnews',
  templateUrl: './sendnews.component.html',
  styleUrls: ['./sendnews.component.css']
})
export class SendNewsComponent implements OnInit{

  constructor(public router: Router, public location: Location) { }

  ngOnInit(){
    
  }

  goBack() {
    this.router.navigate(['/home'])
  }

}
