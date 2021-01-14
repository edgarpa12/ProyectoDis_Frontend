import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {StructureService} from './structure.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(public http: HttpClient, public structService: StructureService) {
  }

  uriOrganization = environment.uri + '/auth';
  uriMember = environment.uri + '/member';
  organizationId = '';
  memberList: any;
  member: any;
  msg: any = '';
  approved: boolean;

  // Form estructura
  formSignIn: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  // Form organizacion
  formOrganization: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    legalCertificate: new FormControl('', Validators.required),
    web: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    logoName: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  // Form miembro
  formMiembro: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required)
  });


  // Hace signIn
  signIn() {
    const obj = {
      email: this.formSignIn.controls.email.value,
      password: this.formSignIn.controls.password.value
    };
    return this.http.post(this.uriOrganization + '/signin', obj);
  }

  // Registra una nueva organizacion
  signUp() {
    const obj = {
      name: this.formOrganization.controls.name.value,
      legalCertificate: this.formOrganization.controls.legalCertificate.value,
      web: this.formOrganization.controls.web.value,
      direction: this.formOrganization.controls.direction.value,
      phone: this.formOrganization.controls.phone.value,
      logoName: this.formOrganization.controls.logoName.value,
      country: this.formOrganization.controls.country.value,
      email: this.formOrganization.controls.email.value,
      password: this.formOrganization.controls.password.value
    };

    return this.http.post(this.uriOrganization + '/signup', obj).subscribe(response => {
      this.setFormOrganizacion();
    });
  }

  signOut() {
    this.http.get(this.uriOrganization + '/signout').subscribe(response => {
      return response;
    });
  }

  // Consigue la info de un miembro en especifico
  getMemberInfo(id: string) {
    const obj = {
      id
    };
    this.http.post(this.uriMember + '/getMember', obj).subscribe(response => {
      this.member = response;
    });
  }

  // Edita la info de un miembro
  editMember(member) {
    const data = member;
    data.name = this.formMiembro.controls.name.value;
    data.direction = this.formMiembro.controls.direction.value;
    data.phone = this.formMiembro.controls.phone.value;
    data.email = this.formMiembro.controls.email.value;
    const obj = {
      id: member.id,
      data
    };
    this.http.put(this.uriMember + '/update', obj).subscribe(response => {
      this.setFormMiembro();
    });
  }

  // Borra a un miembro
  async deleteMember(member) {
    const obj = {
      id: member.id
    };
    await this.http.post(this.uriMember + '/delete', obj).toPromise();
  }

  // Cambia a un miembro de un grupo
  changeGroup(idUser: string, idOldGroup: string, idsNewStructure: string[]) {
    const obj = {
      idUser,
      idOldGroup,
      ids: idsNewStructure
    };
    this.http.post(this.uriMember + '/changeGroup', obj).subscribe(response => {
        this.structService.structuresXMember(idUser);
      }, error => {
        alert('Movimiento invalido');
      }
    );
  }

  // Registra a un nuevo miembro
  async createMember(): Promise<boolean> {
    const obj = {
      name: this.formMiembro.controls.name.value,
      phone: this.formMiembro.controls.phone.value,
      email: this.formMiembro.controls.email.value,
      direction: this.formMiembro.controls.direction.value
    };
    await this.http.post(this.uriMember + '/create', obj).subscribe(response => {
      if (response !== 0) {
        this.msg = 'Usuario agregado de manera exitosa';
        this.approved = true;
      } else {
        this.msg = 'Ya existe un miembro con este email.';
        this.approved = false;
      }
    });
    return this.approved;
  }

  // Consigue a todos los miembros
  async getMembers() {
    this.memberList = await this.http.get(this.uriMember + '/getMembers').toPromise();
  }

  async getMonitors() {
    this.memberList = await this.http.get(this.uriMember + '/getMonitors').toPromise();
  }

  // Limpiar el form
  setFormMiembro() {
    this.formMiembro.controls.name.setValue('');
    this.formMiembro.controls.phone.setValue('');
    this.formMiembro.controls.email.setValue('');
    this.formMiembro.controls.direction.setValue('');
  }

  setFormOrganizacion() {
    this.formMiembro.controls.name.setValue('');
    this.formMiembro.controls.phone.setValue('');
    this.formMiembro.controls.email.setValue('');
    this.formMiembro.controls.direction.setValue('');
    this.formMiembro.controls.password.setValue('');
    this.formMiembro.controls.web.setValue('');
    this.formMiembro.controls.legalCertificate.setValue('');
    this.formMiembro.controls.country.setValue('');
    this.formMiembro.controls.logoName.setValue('');
  }


}
