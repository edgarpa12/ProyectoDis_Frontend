import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { StructureService } from 'src/app/services/structure.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public router: Router, public memberService: MemberService,
    public structureService: StructureService, public location: Location) {
  }

  mensaje: any = '';

  ngOnInit() {
    this.structureService.setOrg([]);
    this.memberService.setFormSignIn();
  }

  async signIn() {
    const response = await this.memberService.signIn().toPromise();

    if (response !== 0) {
      this.memberService.setLoggedUser(response[1]);
      console.log("Usuario Loggeado: ", this.memberService.loggedUser.name, " Role: ", this.memberService.loggedUser.role);
      this.structureService.setOrg(response[0]);
      console.log("Organizacion: ", this.structureService.org[1]);
      this.router.navigate(['/home']);
    } else {
      alert("Los Datos no Existen");
    }
  }

  signUp() {
    this.router.navigate(['/register']);
  }

}
