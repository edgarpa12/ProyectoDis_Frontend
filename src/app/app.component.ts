import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from './services/member.service';
import { StructureService } from './services/structure.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'proyecto-diseno';

  constructor(
    public structureService: StructureService,
    public memberService: MemberService,
    public router: Router,
    public location: Location
  ) { }

  ngOnInit() {
    this.memberService.getLoggedUser();
    this.structureService.getOrg();
    this.memberService.getMembers();
  }

  async signOut() {
    await this.memberService.signOut();
    this.structureService.org = null;
    this.router.navigate(['/']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goEasterEgg() {
    this.router.navigate(['/easterEgg']);
  }

  goBack() {
    this.location.back();
  }

  goOrgInfo() {
    this.router.navigate(['/orgInfo']);
  }

  goInboxCCG() {
    this.router.navigate(['/inboxCCG']);
  }

  goInboxNews() {
    this.router.navigate(['/inboxNews']);
  }
}
