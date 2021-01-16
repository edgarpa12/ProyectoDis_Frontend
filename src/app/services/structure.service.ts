import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  constructor(public http: HttpClient) {
  }

  uri = environment.uri + '/structure';
  type: string;
  structureId: any;
  structureList: any;
  structureFlow: any = [];
  memberList: any = [];
  bossList: any = [];
  msg: any = '';
  org: any = [];
  groupsOfMember: any;
  bossType: any = '';

  // Form estructura
  formStructure: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    groupNumber: new FormControl('', Validators.required),
    monitor: new FormControl('', Validators.required),
    idMonitor: new FormControl('', Validators.required)
  });

  setFormStructure() {
    this.formStructure.controls.name.setValue('');
    this.formStructure.controls.groupNumber.setValue('');
    this.formStructure.controls.monitor.setValue('');
  }

  // Guarda un id en el localstorage y en el servicio
  setID(id) {
    this.structureId = id;
    localStorage.setItem('id', id);
  }

  // Obtiene un id del localstorage
  getID() {
    return localStorage.getItem('id');
  }

  // Guarda un id en el localstorage y en el servicio
  setType(type) {
    this.type = type;
    localStorage.setItem('type', type);
  }

  // Obtiene un id del localstorage
  getType() {
    return localStorage.getItem('type');
  }

  // Guarda un flow en el localstorage y en el servicio
  setFlow() {
    localStorage.setItem('flow', JSON.stringify(this.structureFlow));
  }

  // Obtiene un flow del localstorage
  getFlow() {
    this.structureFlow = JSON.parse(localStorage.getItem('flow'));
  }

  // Guarda un flow en el localstorage y en el servicio
  setOrg(org) {
    localStorage.setItem('org', JSON.stringify(org));
  }

  // Obtiene un flow del localstorage
  getOrg() {
    this.org = JSON.parse(localStorage.getItem('org'));
  }

  // Obtiene las subestructuras de una estructura
  getLevel(id: string) {
    const obj = {
      parent: id,
    };
    this.http.post(this.uri + '/getLevel', obj).subscribe((response) => {
      this.setID(id);
      this.structureList = response;
    });
  }

  // Añade una estructura, para esto requiere un nombre y el id de la estructura padre
  async addStructure() {
    if (this.type === 'group') {
      await this.createGroup();
    } else {
      const obj = {
        name: this.formStructure.controls.name.value,
        groupNumber: ' ',
        idParent: this.structureId,
      };
      const added = await this.http.post(this.uri + '/create', obj).toPromise();

      if (added === undefined) {
        this.getLevel(this.structureId);
        this.msg = '';
        this.setFormStructure();
      } else {
        this.msg = 'Ya existe una estructura con este nombre.';
      }
    }

  }

  // Edita una estructura
  editStructure(structure) {
    const data = structure;
    data.name = this.formStructure.controls.name.value;
    const obj = {
      _id: structure._id,
      newName: data.name,
    };
    this.http.put(this.uri + '/update', obj).subscribe((res) => {
      this.getLevel(this.structureId);
      this.setFormStructure();
    });
  }

  // Elimina una estructura
  deleteStructure(id) {
    const obj = {
      id,
    };
    this.http.post(this.uri + '/delete', obj).subscribe((res) => {
      this.getLevel(this.structureId);
    });
  }

  getIds() {
    const ids = [];
    this.structureFlow.forEach((element) => {
      ids.push(element._id);
    });
    return ids;
  }

  async getStructureMembers() {
    const ids = this.getIds();
    const obj = {
      ids,
    };
    this.memberList = await this.http
      .post(this.uri + '/getStructureMembers', obj)
      .toPromise();
  }

  async getStructureBosses() {
    const ids = this.getIds();
    const obj = {
      ids,
    };
    this.bossList = await this.http
      .post(this.uri + '/getStructureBosses', obj)
      .toPromise();
  }

  async addMember(idMember) {
    const ids = this.getIds();
    const obj = {
      idMember,
      ids,
    };
    const responseFromDB = await this.http
      .post(this.uri + '/addMemberToGroup', obj)
      .toPromise();

    return responseFromDB;
  }

  async addBoss(idMember) {
    const ids = this.getIds();
    const obj = {
      ids,
      idBoss: idMember,
    };
    const responseFromDB = await this.http.post(this.uri + '/addBossToGroup', obj).toPromise();
    await this.getStructureBosses();
    this.bossType = 'Boss';
    return responseFromDB;
  }

  async deleteMember(idMember, idGroup) {
    const obj = {
      idMember,
      idGroup,
    };
    const responseFromDB = await this.http
      .post(this.uri + '/removeMemberFromStructure', obj)
      .toPromise();
    await this.getStructureMembers();
    return responseFromDB;
  }

  async deleteBoss(idMember, idBranch, idGroup) {
    const obj = {
      idMember,
      idBranch: idBranch._id,
      idGroup: idGroup._id,
    };
    const deleted = await this.http.post(this.uri + '/removeBossFromStructure', obj).toPromise();
    await this.getStructureBosses();
  }

  async addMonitor(idMember) {
    const ids = this.getIds();
    const obj = {
      ids,
      idMonitor: idMember,
    };
    const responseFromDB = await this.http.post(this.uri + '/addMonitorToGroup', obj).toPromise();
    console.log('Respuesta', responseFromDB);
    await this.getStructureBosses();
    return responseFromDB;
  }

  async createGroup() {
    const obj = {
      name: this.formStructure.controls.name.value,
      groupNumber: this.formStructure.controls.groupNumber.value,
      idParent: this.structureId,
    };
    const response = await this.http.post(this.uri + '/create', obj).toPromise();

    await this.getLevel(this.structureId);
    await this.structureFlow.push(response);

    const monitorAdded = await this.addMonitor(this.formStructure.controls.idMonitor.value);
    alert('Monitor Agregado');

    this.bossType = 'Monitor';
    this.setFormStructure();
  }

  async structuresXMember(id: string) {
    const obj = {
      idUser: id,
    };
    this.groupsOfMember = await this.http.post(this.uri + '/getStructureXMember', obj).toPromise();
  }

  async getDefaultBranches() {
    this.org[10] = await this.http.get(this.uri + '/getDefaultBranches').toPromise();
  }

  async addDefaultBranch() {
    const obj = {
      idOrganization: this.org[0],
      name: this.formStructure.controls.name.value
    };
    const res = await this.http.post(this.uri + '/addDefaultBranch', obj).toPromise();
    await this.getDefaultBranches();
    this.setFormStructure();
  }

  async editDefaultBranch(oldName) {
    const obj = {
      oldName,
      name: this.formStructure.controls.name.value
    };

    await this.http.post(this.uri + '/updateDefaultBranch', obj).toPromise();

    await this.getDefaultBranches();
    this.setFormStructure();
  }

  async deleteDefaultBranch(branch) {
    const obj = {
      name: branch
    };

    await this.http.post(this.uri + '/removeDefaultBranch', obj).toPromise();

    await this.getDefaultBranches();
  }


}
