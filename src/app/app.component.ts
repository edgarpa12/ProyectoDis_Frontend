import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MemberService } from "./services/member.service";
import { StructureService } from "./services/structure.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "proyecto-diseno";

  constructor(
    public structureService: StructureService,
    public memberService: MemberService,
    public router: Router,
    public location: Location
  ) {}

  ngOnInit() {
    this.structureService.getOrg();
  }

  signOut() {
    this.memberService.signOut;
    this.structureService.setOrg([]);
    this.router.navigate(["/"]);
  }

  goHome() {
    this.router.navigate(["/home"]);
  }

  goEasterEgg() {
    this.router.navigate(["/easterEgg"]);
  }

  goBack() {
    this.location.back();
  }

  orgInfo() {
    this.router.navigate(["/orgInfo"]);
  }
}
