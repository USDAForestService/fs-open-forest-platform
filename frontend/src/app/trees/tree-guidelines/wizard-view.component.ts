import { Component, Input, OnInit } from '@angular/core';
import { TreesService } from '../_services/trees.service';

@Component({
  selector: 'app-wizard-view',
  templateUrl: './wizard-view.component.html'
})
export class WizardViewComponent implements OnInit {
  @Input() forest: any;
  sectionInfo: any;
  currentStep: any;
  currentSubsection: any;
  numberOfSteps: number;

  constructor(private service: TreesService) {}

  previousStep() {
    if (this.currentStep.subsections) {
      if (!this.currentSubsection) {
        this.currentSubsection = this.findSubsectionStep(this.currentStep, this.currentStep.subsections.length - 1);
      } else {
        this.currentSubsection = this.findSubsectionStep(this.currentStep, this.currentSubsection.step - 1);
        if (!this.currentSubsection) {
          this.currentStep = this.findSectionByStepNumber(this.currentStep.step - 1);
          if (this.currentStep.subsections) {
            this.currentSubsection = this.findSubsectionStep(this.currentStep, this.currentStep.subsections.length - 1);
          }
        }
      }
    } else {
      this.currentStep = this.findSectionByStepNumber(this.currentStep.step - 1);
      if (this.currentStep.subsections) {
        this.currentSubsection = this.findSubsectionStep(this.currentStep, this.currentStep.subsections.length - 1);
      } else {
        this.currentSubsection = null;
      }
    }
    localStorage.setItem('wizard-step', `${this.currentStep}`);
  }

  nextStep() {
    if (this.currentStep.subsections) {
      if (!this.currentSubsection) {
        this.currentSubsection = this.findSubsectionStep(this.currentStep, 0);
      } else {
        this.currentSubsection = this.findSubsectionStep(this.currentStep, this.currentSubsection.step + 1);
        if (!this.currentSubsection) {
          this.currentStep = this.findSectionByStepNumber(this.currentStep.step + 1);
          if (this.currentStep.subsections) {
            this.currentSubsection = this.findSubsectionStep(this.currentStep, 0);
          }
        }
      }
    } else {
      this.currentStep = this.findSectionByStepNumber(this.currentStep.step + 1);
      if (this.currentStep.subsections) {
        this.currentSubsection = this.findSubsectionStep(this.currentStep, 0);
      } else {
        this.currentSubsection = null;
      }
    }
    localStorage.setItem('wizard-step', `${this.currentStep}`);
  }

  jumpToStep(item) {
    this.currentStep = this.findSectionByStepNumber(item.step);
    if (item.subsections) {
      this.currentSubsection = this.findSubsectionStep(item, 0);
    }
  }

  findSectionByStepNumber(step) {
    for (let section of this.sectionInfo) {
      if (section.step === step) {
        return section;
      }
    }
  }

  findSubsectionStep(currentStep, subsectionStep) {
    for (let section of currentStep.subsections) {
      if (section.step === subsectionStep) {
        return section;
      }
    }
    return null;
  }

  ngOnInit() {
    this.sectionInfo = this.service.getSectionInfo();
    this.currentStep = this.findSectionByStepNumber(0);
    // if (localStorage.getItem('wizard-step')) {
    //   this.currentStep = parseInt(localStorage.getItem('wizard-step'), 10);
    // } else {
    //   this.currentStep = 1;
    // }
    this.numberOfSteps = this.sectionInfo.length;
  }
}
