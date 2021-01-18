import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class StructureService {
  constructor(public http: HttpClient) { }

  uri = environment.uri + "/structure";
  type: string;
  structureId: any;
  structureList: any;
  structureFlow: any = [];
  memberList: any = [];
  bossList: any = [];
  msg: any = "";
  org: any = [];
  groupsOfMember: any;
  bossType: any = "";

  // Form estructura
  formStructure: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    groupNumber: new FormControl("", Validators.required),
    monitor: new FormControl("", Validators.required),
    idMonitor: new FormControl("", Validators.required),
  });

  setFormStructure() {
    this.formStructure.controls.name.setValue("");
    this.formStructure.controls.groupNumber.setValue("");
    this.formStructure.controls.monitor.setValue("");
  }

  // Guarda un id en el localstorage y en el servicio
  setID(id) {
    this.structureId = id;
    localStorage.setItem("id", id);
  }

  // Obtiene un id del localstorage
  getID() {
    return localStorage.getItem("id");
  }

  // Guarda un id en el localstorage y en el servicio
  setType(type) {
    this.type = type;
    localStorage.setItem("type", type);
  }

  // Obtiene un id del localstorage
  getType() {
    return localStorage.getItem("type");
  }

  // Guarda un flow en el localstorage y en el servicio
  setFlow() {
    localStorage.setItem("flow", JSON.stringify(this.structureFlow));
  }

  // Obtiene un flow del localstorage
  getFlow() {
    this.structureFlow = JSON.parse(localStorage.getItem("flow"));
  }

  // Guarda un flow en el localstorage y en el servicio
  setOrg(org) {
    this.org = org;
    localStorage.setItem("org", JSON.stringify(org));
  }

  // Obtiene un flow del localstorage
  getOrg() {
    this.org = JSON.parse(localStorage.getItem("org"));
  }

  // Obtiene las subestructuras de una estructura
  getLevel(id: string) {
    const obj = {
      parent: id,
    };
    this.http.post(this.uri + "/getLevel", obj).subscribe((response) => {
      this.setID(id);
      this.structureList = response;
    });
  }

  // Añade una estructura, para esto requiere un nombre y el id de la estructura padre
  async addStructure() {
    if (this.type === "group") {
      await this.createGroup();
    } else {
      const obj = {
        name: this.formStructure.controls.name.value,
        groupNumber: " ",
        idParent: this.structureId,
      };
      const response = await this.http
        .post(this.uri + "/create", obj)
        .toPromise();
      if (response !== 0) {
        this.getLevel(this.structureId);
        this.msg = "Estructura añadida correctamente";
        this.setFormStructure();
      } else {
        this.msg = "Ya existe una estructura con este nombre.";
      }
    }
  }

  // Edita una estructura
  async editStructure(structure) {
    const data = structure;
    data.name = this.formStructure.controls.name.value;
    const obj = {
      _id: structure._id,
      newName: data.name,
    };
    const response = await this.http.put(this.uri + "/update", obj).toPromise();
    console.log("response", response);
    if (response["msg"] != 0) {
      this.getLevel(this.structureId);
      this.msg = "Estructura editada correctamente";
    } else {
      this.msg = "Usted quiere usar un nombre que ya existe";
    }
    this.setFormStructure();
  }

  // Elimina una estructura
  async deleteStructure(id) {
    const obj = {
      id,
    };
    const response = await this.http
      .post(this.uri + "/delete", obj)
      .toPromise();
    console.log('response["msg"]', response["msg"]);
    if (response["msg"] != 0) {
      this.getLevel(this.structureId);
      this.msg = "Estructurada Eliminada Correctamente";
    } else {
      this.msg = "Ocurrio un error eliminando, intente de nuevo";
    }
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
      .post(this.uri + "/getStructureMembers", obj)
      .toPromise();
  }

  async getStructureBosses() {
    const ids = this.getIds();
    const obj = {
      ids,
    };
    this.bossList = await this.http
      .post(this.uri + "/getStructureBosses", obj)
      .toPromise();
  }

  async addMember(idMember) {
    const ids = this.getIds();
    const obj = {
      idMember,
      ids,
    };
    const response = await this.http
      .post(this.uri + "/addMemberToGroup", obj)
      .toPromise();

    if (response["msg"] != 0) {
      this.msg = "Usuario Añadido";
    } else {
      this.msg = "Este usuario ya existe en una estructura cercana";
    }
  }

  async addBoss(idMember) {
    const ids = this.getIds();
    const obj = {
      ids,
      idBoss: idMember,
    };
    const response = await this.http
      .post(this.uri + "/addBossToGroup", obj)
      .toPromise();
    if (response["msg"] != 0) {
      await this.getStructureBosses();
      this.bossType = "Boss";
      this.msg = "Jefe añadido correctamente";
    } else {
      this.msg = "Ocurrio un problema, intente de nuevo";
    }
  }

  async deleteMember(idMember, idGroup) {
    const obj = {
      idMember,
      idGroup,
    };
    const response = await this.http
      .post(this.uri + "/removeMemberFromStructure", obj)
      .toPromise();
    if (response["msg"] != 0) {
      await this.getStructureMembers();
      this.msg = "Usuario eliminado correctamente";
    } else {
      this.msg = "Ocurrio un problema, intente de nuevo";
    }
  }

  async deleteBoss(idMember, idBranch, idGroup) {
    const obj = {
      idMember,
      idBranch: idBranch._id,
      idGroup: idGroup._id,
    };
    const deleted = await this.http
      .post(this.uri + "/removeBossFromStructure", obj)
      .toPromise();
    await this.getStructureBosses();
  }

  async addMonitor(idMember, group) {
    const ids = this.getIds();
    ids.push(group["_id"]);
    const obj = {
      ids,
      idMonitor: idMember,
    };
    const response = await this.http
      .post(this.uri + "/addMonitorToGroup", obj)
      .toPromise();

    if (response["msg"] !== 0) {
      await this.getStructureBosses();
      this.msg = "Monitor Añadido";
    } else {
      this.msg = "Ocurrió un error";
    }
  }

  async createGroup() {
    const obj = {
      name: this.formStructure.controls.name.value,
      groupNumber: this.formStructure.controls.groupNumber.value,
      idParent: this.structureId,
    };
    const response = await this.http
      .post(this.uri + "/create", obj)
      .toPromise();
    if (response !== 0) {
      this.getLevel(this.structureId);
      this.msg = "Estructura añadida correctamente";

      await this.addMonitor(
        this.formStructure.controls.idMonitor.value,
        response
      );

      this.bossType = "Monitor";
      this.setFormStructure();
    } else {
      this.msg = "Ya existe una estructura con este nombre.";
    }
  }

  async structuresXMember(id: string) {
    const obj = {
      idUser: id,
    };
    this.groupsOfMember = await this.http
      .post(this.uri + "/getStructureXMember", obj)
      .toPromise();
  }

  async isMember(id: string){
    if(this.structuresXMember(id)){
      return true;
    }else{
      return false;
    }
  }

  async getDefaultBranches() {
    this.org[9] = await this.http
      .get(this.uri + "/getDefaultBranches")
      .toPromise();
  }

  async addDefaultBranch() {
    const obj = {
      idOrganization: this.org[0],
      name: this.formStructure.controls.name.value,
    };
    const response = await this.http
      .post(this.uri + "/addDefaultBranch", obj)
      .toPromise();
    // await this.getDefaultBranches();
    if (response["msg"] != 0) {
      this.msg = "Rama añadida correctamente"
    } else {
      this.msg = "Ya existe una rama con el mismo nombre"
    }

  }

  async editDefaultBranch(oldName) {
    const obj = {
      oldName,
      name: this.formStructure.controls.name.value,
    };

    const response = await this.http.post(this.uri + "/updateDefaultBranch", obj).toPromise();
    if (response["msg"] != 0) {
      this.msg = "Rama editada correctamente"
    } else {
      this.msg = "Existe una rama con el mismo nombre intente de nuevo"
    }
  }

  async deleteDefaultBranch(branch) {
    const obj = {
      name: branch,
    };

    const response = await this.http
      .post(this.uri + "/removeDefaultBranch", obj)
      .toPromise();

    if (response["msg"] != 0) {
      await this.getDefaultBranches();
      this.msg = "Rama removida correctamente"
    } else {
      this.msg = "Ocurrio un error intente de nuevo"
    }
  }

  async getNews(userId: string){
    const response = await this.structuresXMember(userId);
    console.log("Estructuras: ", response);
    return response;
  }

  async enabledCCGs(structure){
    const obj = {
      _id: structure._id,
    }
    await this.http.put(this.uri + '/enabledCCGs',obj).toPromise();
  }

}
