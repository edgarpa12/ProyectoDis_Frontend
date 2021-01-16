import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { StructureService } from 'src/app/services/structure.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-structure-crud',
  templateUrl: './structure-crud.component.html',
  styleUrls: ['./structure-crud.component.css']
})
export class StructureCrudComponent implements OnInit {

  constructor(
    public structService: StructureService, public router: Router, public memberService: MemberService, public location: Location
  ) {
  }

  selected;
  action;

  ngOnInit() {
    this.structService.getLevel(this.structService.getID());
    this.structService.type = this.structService.getType();
    this.structService.getFlow();
    this.structService.getOrg();
  }

  changeCategory() {
    const type = this.structService.type;
    if (type === 'zone') {
      this.structService.setType('branch');
    } else if (type === 'branch') {
      this.structService.setType('group');
    }
  }

  goStructure(structure) {
    if (this.structService.type !== 'group') {
      this.structService.structureFlow.push(structure);
      this.structService.setFlow();
      this.changeCategory();
      this.structService.getLevel(structure._id);
    }
  }

  goNews(structure) {
    localStorage.setItem('newsStructure', structure);
    this.router.navigate(['sendNews']);
  }

  editStructure(structure) {
    this.action = 'Editar';
    this.selected = structure;
    this.structService.formStructure.controls.name.setValue(structure.name);
  }

  createAction() {
    this.action = 'Crear';
  }

  aeStructure() {
    if (this.action === 'Crear') {
      this.structService.addStructure();
    } else if (this.action === 'Editar') {
      this.structService.editStructure(this.selected);
    }
  }

  deleteStructure() {
    this.structService.deleteStructure(this.selected);
  }

  deleteStructureAux(id) {
    this.selected = id;
  }

  infoStructure(structure) {
    this.structService.setType(this.structService.type);
    this.structService.structureFlow.push(structure);
    this.structService.setFlow();
    this.router.navigate(['/info']);
  }

  breadcrumb(type) {
    if (type === 0) {
      this.structService.setID(this.structService.org[0]);
      this.structService.getLevel(this.structService.org[0]);
      this.structService.setType('zone');
      this.structService.structureFlow = [];
      this.structService.setFlow();
    } else if (type === 1) {
      this.structService.setID(this.structService.structureFlow[0]._id);
      this.structService.getLevel(this.structService.structureFlow[0]._id);
      this.structService.setType('branch');
      this.structService.structureFlow = this.structService.structureFlow.slice(0, 1);
      this.structService.setFlow();
    }
  }

  loadMembers() {
    this.memberService.getMembers();
  }

  loadMonitors() {
    this.memberService.getMonitors();
  }

  loadBranches() {
    this.structService.getDefaultBranches();
  }

  selectBranch(branch) {
    this.structService.formStructure.controls.name.setValue(branch);
  }

  selectMonitor(member) {
    this.structService.formStructure.controls.monitor.setValue(member.name);
    this.structService.formStructure.controls.idMonitor.setValue(member.id);
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

}
