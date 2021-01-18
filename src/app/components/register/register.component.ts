import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, public memberService: MemberService, public location: Location, private cd: ChangeDetectorRef) {
  }

  pageNumber = 1;

  pageBack() {
    this.pageNumber = 1;
  }

  pageForward() {
    this.pageNumber = 2;
  }

  ngOnInit() {
  }

  onFileChange(event) {
    const field = 'logo';
    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      console.log(file);
      // just checking if it is an image, ignore if you want
      if (!file.type.startsWith('image')) {
        this.memberService.formOrganization.get(field).setErrors({
          required: true
        });
        console.log('Error: Not an image');
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.memberService.formOrganization.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }

  signUp() {
    this.memberService.signUp();
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }

}
