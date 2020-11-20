import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, public memberService: MemberService, public location: Location) { }

  ngOnInit() {
  }

  signUp() {
    this.memberService.signUp();
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back()
  }

}
