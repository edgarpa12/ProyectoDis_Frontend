import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-sendnews',
  templateUrl: './sendnews.component.html',
  styleUrls: ['./sendnews.component.css']
})
export class SendNewsComponent {

  constructor(public router: Router, public memberService: MemberService, public location: Location, private cd: ChangeDetectorRef) {
  }

  goBack() {
    this.location.back();
  }

  async sendNews() {
    await this.memberService.sendNews();
    for (const control of Object.values(this.memberService.formNews.controls)) {
      control.reset();
    }
    alert('Noticias enviadas');
    this.goBack();
  }

  onFileChange(event) {
    const field = 'imagesData';
    if (event.target.files && event.target.files.length) {
      const formFiles = [];
      for (const file of event.target.files) {
        // just checking if it is an image, ignore if you want
        if (!file.type.startsWith('image')) {
          this.memberService.formNews.get(field).setErrors({
            required: true
          });
          console.log('Error: Not an image');
          this.cd.markForCheck();
        } else {
          // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
          formFiles.push(file);
        }
      }

      console.log('Form files: ', formFiles);
      this.memberService.formNews.patchValue({
        [field]: formFiles
      });
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
    }
  }

}
