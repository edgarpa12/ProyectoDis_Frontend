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
  integrante;
  listaSeleccionados = [];

  ngOnInit() {
    this.structService.getLevel(this.structService.getID());
    this.structService.type = this.structService.getType();
    this.structService.getFlow();
    this.structService.getOrg();
    this.structService.isMember(this.memberService.loggedUser.id);
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
    localStorage.setItem('newsStructure', JSON.stringify(structure));
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

  async aeStructure() {
    if (this.action === 'Crear') {
      await this.structService.addStructure();
      await this.structService.getStructureBosses();
    } else if (this.action === 'Editar') {
      await this.structService.editStructure(this.selected);
    }
    this.structService.setFormStructure();
    alert(this.structService.msg);
  }

  async deleteStructure() {
    await this.structService.deleteStructure(this.selected);
    alert(this.structService.msg);
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

  async loadMembers(integrante) {
    this.integrante = integrante;
    await this.memberService.getMembers();
    this.memberService.memberList = await this.memberService.memberList.filter((member) => this.structService.filtrarMiembros(member, this.listaSeleccionados));
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
    this.listaSeleccionados.push(member);
  }

  selectMember(member) {
    this.structService.formStructure.controls[this.integrante].setValue(member.name);
    this.structService.formStructure.controls["id" + this.integrante].setValue(member.id);
    this.listaSeleccionados.push(member);
  }

  goBack() {
    this.location.back();
  }
}
