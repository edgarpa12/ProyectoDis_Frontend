import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MemberService} from 'src/app/services/member.service';
import {StructureService} from 'src/app/services/structure.service';
import {Location} from '@angular/common';

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

  signIn() {
    console.log('Hola');
    this.memberService.signIn().subscribe(response => {
        if (response[0] !== undefined) {
          this.structureService.org = response;
          this.structureService.setOrg(response);
          console.log(response);
          this.router.navigate(['/home']);
        } else {
          this.mensaje = 'Los datos no existen';
        }
      },
      error => this.mensaje = 'Los datos no existen');
  }

  signUp() {
    this.router.navigate(['/register']);
  }

}
