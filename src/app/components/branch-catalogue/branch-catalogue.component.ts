import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StructureService} from 'src/app/services/structure.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-branch-catalogue',
  templateUrl: './branch-catalogue.component.html',
  styleUrls: ['./branch-catalogue.component.css']
})
export class BranchCatalogueComponent implements OnInit {

  constructor(public router: Router, public structService: StructureService, public memberService: MemberService) {
  }

  selected;
  action;

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

  addDefaultBranch() {
    this.action = 'Crear';
  }

  deleteDefaultBranchAux(branch) {
    this.selected = branch;
  }

  async deleteDefaultBranch() {
    await this.structService.deleteDefaultBranch(this.selected);
    alert(this.structService.msg);
  }

  async aeDefaultBranch() {
    if (this.action === 'Crear') {
      await this.structService.addDefaultBranch();
    } else if (this.action === 'Editar') {
      await this.structService.editDefaultBranch(this.selected);
    }
    this.structService.setFormStructure();
    await this.structService.getDefaultBranches();
    alert(this.structService.msg);
  }

  editDefaultBranch(branch) {
    this.action = 'Editar';
    this.selected = branch;
    this.structService.formStructure.controls['name'].setValue(branch);
  }


}
