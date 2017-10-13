import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from '../../_services/util.service';

@Component({
  selector: 'app-temporary-outfitters-learn-more',
  templateUrl: './temporary-outfitters-learn-more.component.html'
})
export class TemporaryOutfittersLearnMoreComponent {
  items: any;
  constructor(public util: UtilService) {
    this.items = [
      {
        sectionName: 'A temporary use permit is',
        sectionCopy: `
        <ul>
        <li>Authorization to conduct short-term outfitted or guided use on national Forest
Service land.</li>
        <li>Held by an outfitter qualified to provide the service.</li>
        <li>Valid for up to 200 days in a 180-day period per use area.</li>
        <li>Based on a flat-rate fee schedule (see “Costs” below).</li>
        <li>Non-renewable and non-competitive.</li>
        <li>Revocable, suspendable and not appealable.</li>
        </ul>
        `
      },
      {
        sectionName: 'Applicant requirements',
        sectionCopy: `
        <p>Qualified applicants must submit the following documentation as part of the
permit application process:</p>
        <ul>
          <li>Annual use reports</li>
          <li>Liability insurance</li>
          <li>Operating plan</li>
          <li>NOTE: Violations of laws, customer complaints and adverse performance
and/or permit compliance will be considered in evaluating qualifications.</li>
        </ul>
        `
      },
      {
        sectionName: 'Number of permits and service days',
        sectionCopy: `
        <p>Permits and service days are managed by use area. The maximum allowable
service days varies by use area, depending on their availability and demand.
Only one temporary permit may be obtained per use area every 180 days up to
the maximum number of service days per use area (no more than 200 service
days). See the various permit pool documents for descriptions of use areas and
the max number of service days that may be applied for in each area.</p>
        <ul>
          <li><strong>Example 1:</strong> Use Area "A" = 1000 total pool days with a max days/permit = 200.
This means you can apply for 1 permit up to 200 days, every 6 months.</li>
          <li><strong>Example 2:</strong> Use Area "B" = 150 total pool days with a max days/permit = 50.
This means you can apply for 1 permit up to 50 days, every 6 months.</li>
          <li><strong>Example 3:</strong> Use Area "A" + "B" = 200 days "A" + 50 days "B" = 250 days "A"
and "B". This means you can apply for days from multiple use areas at the
same time.</li>
        </ul>
        `
      },
      {
        sectionName: 'Benefits of a temporary use permit',
        sectionCopy: `
        <ul>
          <li>Allows for a short-term allocation of use to meet a seasonal need.</li>
          <li>Provides an opportunity to try new activities/locations.</li>
          <li>Adds clients or trips for special events or offerings.</li>
          <li>Increases flexibility in locations.</li>
          <li>Less time spent processing paperwork.</li>
          <li>Opportunities for church, youth and educational groups to obtain short-term permits for brief and non-recurring outings</li>
        </ul>
        `
      },
      {
        sectionName: 'Activities and locations',
        sectionCopy: `
        <ul>
          <li>Land-based outfitting and guide permits are available throughout the forest, at
the discretion of District Rangers.</li>
          <li>River-based guiding permits are currently only available for select locations.</li>
          <li>Permit inquiries for other forests should be directed to those forests.</li>
        </ul>
        <p>Information for National Forests within the United States can be
found here.</p>
        <p>NOTE: The Forest Service may add, remove or modify the activities and
locations at its discretion.</p>
        `
      },
      {
        sectionName: 'Costs',
        sectionCopy: `
        <p>Cost chart</p>
        <table class="faq-table">
          <tr>
            <th>Number of service days</th>
            <th>Flat fee</th>
            <th>Maximum gross revenue for each bracket of service days</th>
          </tr>
          <tr>
            <td>1 to 50</td>
            <td>$150</td>
            <td>$10,000</td>
          </tr>
          <tr>
            <td>51 to 100</td>
            <td>$300</td>
            <td>$20,000</td>
          </tr>
          <tr>
            <td>101 to 150</td>
            <td>$450</td>
            <td>$30,000</td>
          </tr>
          <tr>
            <td>151 to 200</td>
            <td>$600</td>
            <td>$40,000</td>
          </tr>
        </table>
        <p>(See <a href="http://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5295497.pdf">FSH 2709.11</a>, sec. 37.21c)</p>
        `
      },
      {
        sectionName: 'Application due dates',
        sectionCopy: `
        <p>Administration of the temporary permits varies by pool and is specified in the
lands or river pool permit documents.</p>
        <p>Ideally, there would be plenty of days available to allow all temporary use permits
to be issued on a first-come, first-served basis. However, some permit pools are
limited and with high demand, there are simply not enough days to go around. In
this case, we will allocate the permits using a lottery based on due date. The due
dates are months ahead of the permit period to allow applicants plenty of lead
time to advertise and prepare for the trips. In the event there are unallocated
days left over after the lottery, additional permits may be issued on a first-come,
first-served basis.</p>
        <p>For more information on Forest service outfitter and guide policies and
regulations, visit the national website.</p>
        `
      }
    ];
  }
}
