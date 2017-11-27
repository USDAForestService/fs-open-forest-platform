import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tree-application-form',
  templateUrl: './tree-application-form.component.html'
})
export class TreeApplicationFormComponent implements OnInit {
  id: any;
  forest: any;
  cost: number;
  submitted: boolean;

  public christmasTreeForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    numTrees: ['', Validators.pattern(/^(\d+)$/)]
  })
  constructor(private route: ActivatedRoute, public fb: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.forest = data.forest;
    });
    this.cost = 0;
    this.submitted = false;
  }
  onSubmit() {
    if (this.christmasTreeForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }
  updateNumTrees(num) {
    if (!isNaN(parseInt(num, 10))) {
      this.cost = parseInt(num, 10) * 5;
    } else {
      this.cost = 0;
    }
  }

}
