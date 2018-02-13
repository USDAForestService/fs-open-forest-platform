import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from '../../_services/util.service';

@Component({
  selector: 'app-noncommercial-learn-more',
  templateUrl: './noncommercial-learn-more.component.html'
})
export class NoncommercialLearnMoreComponent {
  items: any;
  constructor(public util: UtilService) {
    this.items = [
      {
        sectionName: 'Who  has to get a permit under the regulation?',
        type: 'anchor',
        sectionCopy: `
        <ul>
        <li>Authorization for non-commercial groups to use national Forest Service land.</li>
        <li>Required for groups of 75 or more people (participants and spectators).</li>
        <li>Important to minimize resource and environmental impacts on forest lands.</li>
        <li>Valid for the event or activity only.</li>
        <li>Free of charge.</li>
        </ul>
        `
      },
      {
        sectionName: 'Applicant requirements',
        type: 'anchor',
        sectionCopy: `
        <ul>
        <li>Must be at least 21 years old.</li>
        <li>Must sign the permit on behalf of the group (but will not be held personally responsible for the group’s actions).</li>
        <li>Insurance is NOT required for non-commercial permits.</li>
        </ul>`
      },
      {
        sectionName: 'Evaluation process',
        type: 'anchor',
        sectionCopy: `
        <p>Permit applications must be submitted at least 72 hours in advance of the proposed activity
        and will be evaluated by the Forest Service within 48 hours of receipt. Otherwise,
        they are deemed granted. All permit applications will be evaluated using the same criteria,
        regardless of the content of the event or gathering.</p>

        <p>A permit can be denied only if it does not meet the evaluation criteria,
        primarily if it violates public safety or public health laws or regulations.
        If the permit is denied, an officer is required to explain the reasons to the applicant in writing.</p>

        <p><a href="https://www.fs.fed.us/specialuses/special_non_com_uses.shtml">For more information about non-commercial group use and regulations, visit our FAQ page:
        https://www.fs.fed.us/specialuses/special_non_com_uses.shtml</a>
        </p>`
      }
    ];
  }
}
