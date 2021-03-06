import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StructureService } from './structure.service';
import { isArray } from 'rxjs/internal-compatibility';

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
  loggedUser: any;
  ccg: any;

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
    logo: new FormControl(null, Validators.required),
    logoName: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  // Form miembro
  formMiembro: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  // Form CCG
  formCCG: FormGroup = new FormGroup({
    from: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    type: new FormControl('Petition', Validators.required)
  });

  // Form News
  formNews: FormGroup = new FormGroup({
    body: new FormControl('', Validators.required),
    images: new FormControl([], Validators.required),
    imagesData: new FormControl([]),
  });

  // Guarda el miembro loggeado en el localstorage y en el servicio
  setLoggedUser(member) {
    this.loggedUser = member;
    localStorage.setItem('loggedUser', JSON.stringify(member));
  }

  // Obtiene un flow del localstorage
  getLoggedUser() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }


  // Hace signIn
  signIn() {
    const obj = {
      email: this.formSignIn.controls.email.value,
      password: this.formSignIn.controls.password.value
    };
    return this.http.post(this.uriOrganization + '/signin', obj);
  }

  // Registra una nueva organizacion
  async signUp() {
    const ceo = {
      name: this.formMiembro.controls.name.value,
      phone: this.formMiembro.controls.phone.value,
      email: this.formMiembro.controls.email.value,
      direction: this.formMiembro.controls.direction.value,
      role: this.formMiembro.controls.role.value,
      password: this.formMiembro.controls.password.value
    };

    const organization = {
      name: this.formOrganization.controls.name.value,
      legalCertificate: this.formOrganization.controls.legalCertificate.value,
      web: this.formOrganization.controls.web.value,
      direction: this.formOrganization.controls.direction.value,
      phone: this.formOrganization.controls.phone.value,
      logo: this.formOrganization.controls.logo.value,
      logoName: this.formOrganization.controls.logoName.value,
      country: this.formOrganization.controls.country.value,
      email: this.formOrganization.controls.email.value
    };

    const obj = {
      ceo,
      organization,
      logo: organization.logo as File
    };

    const response = await this.http.post(this.uriOrganization + '/signup', this.toFormData(obj)).toPromise();

    this.setFormMiembro();
    this.setFormOrganizacion();
  }

  toFormData<T>(formValue: T) {
    return Object.keys(formValue).reduce((formData, key) => {
      if (isArray(formValue[key])) {
        for (const file of formValue[key]) {
          formData.append(key, file);
        }
      } else {
        formData.append(key,
          formValue[key] instanceof File
            ? formValue[key]
            : JSON.stringify(formValue[key])
        );
      }
      return formData;
    }, new FormData());
  }

  async signOut() {
    localStorage.clear();
    return await this.http.get(this.uriOrganization + '/signout').toPromise();
  }

  // Consigue la info de un miembro en especifico
  async getMemberInfo(id: string) {
    const obj = {
      id
    };
      const response = await this.http.post(this.uriMember + '/getMember', obj).toPromise();
      this.member = response;
  }

  // Edita la info de un miembro
  async editMember(member) {
    const name = this.formMiembro.controls.name.value;
    const direction = this.formMiembro.controls.direction.value;
    const phone = this.formMiembro.controls.phone.value;
    const email = this.formMiembro.controls.email.value;
    const role = this.formMiembro.controls.role.value ? 'MONITOR' : 'MEMBER';

    const data = {
      name: name !== '' ? name : member.name,
      direction: direction !== '' ? direction : member.direction,
      phone: phone !== '' ? phone : member.phone,
      email: email !== '' ? email : member.email,
      role
    };

    console.log(data);
    const obj = {
      id: member.id,
      data
    };

    const response = await this.http.put(this.uriMember + '/update', obj).toPromise();

    if ((response as any).msg != 0) {
      this.msg = 'Usuario Editado Correctamente';
    } else {
      this.msg = 'Ocurrio un error';
    }
  }

  // Borra a un miembro
  async deleteMember(member) {
    const obj = {
      id: member.id
    };
    await this.http.post(this.uriMember + '/delete', obj).toPromise();
    this.msg = 'Usuario eliminado correctamente';
  }

  // Cambia a un miembro de un grupo
  async changeGroup(idUser: string, idOldGroup: string, idsNewStructure: string[]) {
    const obj = {
      idUser,
      idOldGroup,
      ids: idsNewStructure
    };

    const response = await this.http.post(this.uriMember + '/changeGroup', obj).toPromise();
    if ((response as any).msg != 0) {
      this.structService.structuresXMember(idUser);
      this.msg = 'Se realizo el cambio de grupo correctamente!';
    } else {
      this.msg = 'No se pudo realizar el cambio';
    }
  }

  // Registra a un nuevo miembro
  async createMember(): Promise<boolean> {

    const obj = {
      name: this.formMiembro.controls.name.value,
      phone: this.formMiembro.controls.phone.value,
      email: this.formMiembro.controls.email.value,
      password: this.formMiembro.controls.password.value,
      direction: this.formMiembro.controls.direction.value,
      role: this.formMiembro.controls.role.value ? 'MONITOR' : 'MEMBER'
    };

    const response = await this.http.post(this.uriMember + '/create', obj).toPromise();
    if (response !== 0) {
      this.msg = 'Usuario agregado de manera exitosa';
      return true;
    }
    this.msg = 'Ya existe un miembro con este email';
    return false;
  }

  // Consigue a todos los miembros
  async getMembers() {
    this.memberList = await this.http.get(this.uriMember + '/getMembers').toPromise();
  }

  // Consigue a todos los miembros
  async getMonitors() {
    this.memberList = await this.http.get(this.uriMember + '/getMonitors').toPromise();
  }

  async sendCCG() {
    const obj = {
      from: this.loggedUser._id,
      body: this.formCCG.controls.body.value,
      type: this.formCCG.controls.type.value
    };

    await new Promise((resolve, reject) => {

      this.http.post(this.uriMember + '/sendCCG', obj).subscribe(response => {
        alert('CCG mandado exitosamente');
        resolve(response);
      }, error => {
        console.log(error);
        reject(error);
      });

    });
  }

  // Limpiar el form
  setFormMiembro() {
    this.formMiembro.controls.name.setValue('');
    this.formMiembro.controls.phone.setValue('');
    this.formMiembro.controls.email.setValue('');
    this.formMiembro.controls.password.setValue('');
    this.formMiembro.controls.direction.setValue('');
    this.formMiembro.controls.role.setValue(false);
  }

  setFormOrganizacion() {
    this.formOrganization.controls.name.setValue('');
    this.formOrganization.controls.phone.setValue('');
    this.formOrganization.controls.email.setValue('');
    this.formOrganization.controls.direction.setValue('');
    this.formOrganization.controls.web.setValue('');
    this.formOrganization.controls.legalCertificate.setValue('');
    this.formOrganization.controls.country.setValue('');
    this.formOrganization.controls.logoName.setValue('');
  }

  setFormCCG() {
    this.formCCG.controls.body.setValue('');
  }

  setFormSignIn() {
    this.formSignIn.controls.email.setValue('');
    this.formSignIn.controls.password.setValue('');
  }

  // formNews: FormGroup = new FormGroup({
  //   body: new FormControl('', Validators.required),
  //   images: new FormControl('', Validators.required)
  // });


  async sendNews() {
    const obj = {
      from: this.loggedUser._id,
      body: this.formNews.controls.body.value,
      images: this.formNews.controls.imagesData.value,
      to: JSON.parse(localStorage.getItem('newsStructure'))._id
    };
    console.log(await this.http.post(this.uriMember + '/sendNews', this.toFormData(obj)).toPromise());
  }
}
