import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-view',
  templateUrl: './wizard-view.component.html'
})
export class WizardViewComponent implements OnInit {
  @Input() forest: any;
  @Input() treeInfo: any;
  currentStep: number;
  numberOfSteps: number;

  previousStep() {
    this.currentStep--;
    localStorage.setItem('wizard-step', `${this.currentStep}`);
  }

  nextStep() {
    this.currentStep++;
    localStorage.setItem('wizard-step', `${this.currentStep}`);
  }

  ngOnInit() {
    if (localStorage.getItem('wizard-step')) {
      this.currentStep = parseInt(localStorage.getItem('wizard-step'));
    } else {
      this.currentStep = 1;
    }
    this.numberOfSteps = this.treeInfo.length;
  }
}
