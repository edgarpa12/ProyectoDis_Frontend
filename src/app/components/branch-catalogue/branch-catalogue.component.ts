import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StructureService} from 'src/app/services/structure.service';

@Component({
  selector: 'app-branch-catalogue',
  templateUrl: './branch-catalogue.component.html',
  styleUrls: ['./branch-catalogue.component.css']
})
export class BranchCatalogueComponent implements OnInit {

  constructor(public router: Router, public structService: StructureService) {
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

  deleteDefaultBranch() {
    this.structService.deleteDefaultBranch(this.selected);
  }

  aeDefaultBranch() {
    if (this.action === 'Crear') {
      this.structService.addDefaultBranch();
    } else if (this.action === 'Editar') {
      this.structService.editDefaultBranch(this.selected);
    }
  }

  editDefaultBranch(branch) {
    this.action = 'Editar';
    this.selected = branch;
    this.structService.formStructure.controls['name'].setValue(branch);
  }


}
