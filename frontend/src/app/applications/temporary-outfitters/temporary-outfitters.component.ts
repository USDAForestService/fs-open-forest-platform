import { Component, OnInit } from '@angular/core';
import { Application } from '../../_models/application';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { ApplicationService } from '../../_services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileSelectDirective, FileDropDirective, FileUploader, FileLikeObject, FileItem } from '../../../../node_modules/ng2-file-upload/ng2-file-upload';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-temporary-outfitters',
  templateUrl: './temporary-outfitters.component.html'
})
export class TemporaryOutfittersComponent implements OnInit {

  apiErrors: any;
  application = new Application();
  applicationId: number;
  forest = 'Mt. Baker-Snoqualmie National Forest';
  mode = 'Observable';
  submitted = false;
  uploadFiles = false;

  applicationForm: FormGroup;

  constructor(
    private applicationService: ApplicationService,
    private applicationFieldsService: ApplicationFieldsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.applicationForm = this.formBuilder.group({
      district: ['11', [Validators.required]],
      region: ['06', [Validators.required]],
      forest: ['05', [Validators.required]],
      type: ['tempOutfitters', [Validators.required]],
      signature: ['', [Validators.required]],
      applicantInfo: this.formBuilder.group({
        emailAddress: ['', Validators.required],
        organizationName: [''],
        primaryFirstName: ['', [Validators.required]],
        primaryLastName: ['', [Validators.required]],
        website: ['']
      })
    });
  }

  onSubmit(form) {
    this.submitted = true;
    if (!form.valid) {
      window.scroll(0, 0);
    } else {
      this.applicationService.create(JSON.stringify(this.applicationForm.value), '/special-uses/temp-outfitters/')
        .subscribe(
          (persistedApplication) => {
            this.applicationId = persistedApplication.applicationId;
            this.uploadFiles = true;
            // TODO post file upload functionality
             this.router.navigate(['applications/submitted/' + persistedApplication.applicationId]);
          },
          (e: any) => {
            this.apiErrors =  e;
            window.scroll(0, 0);
          }
        );
    }
  }

  ngOnInit() {
  }
}
