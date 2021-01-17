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
  }

  // getLoggedUser() {
  //   this.memberService.getLoggedUser().subscribe(response => {
  //     console.log(response);
  //     this.memberService.loggedUser = response;
  //   }, error => console.log("Error"));
  // }

  async signIn() {
    // this.memberService.signIn().subscribe(response => {
    //   if (response[0] !== undefined) {
    //     this.structureService.org = response;
    //     this.structureService.setOrg(response);
    //     console.log(response);
    //     this.getLoggedUser();
    //     this.router.navigate(['/home']);
    //   } else {
    //     this.mensaje = 'Los datos no existen';
    //   }
    // },
    //   error => this.mensaje = 'Los datos no existen');

    const response = await this.memberService.signIn().toPromise();

    if (response !== []) {
      this.structureService.org = response[0];
      this.structureService.setOrg(response[0])
      console.log("Organizacion: ", response[0]);
      this.memberService.loggedUser = response[1];
      console.log("Usuario Loggeado: ", response[1]);
      this.router.navigate(['/home']);
    } else {
      alert("Los Datos no Existen");
    }
  }

  signUp() {
    this.router.navigate(['/register']);
  }

}
