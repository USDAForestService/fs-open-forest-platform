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
        type: 'anchor',
        sectionCopy: `
        <ul>
          <li>Authorization to conduct short-term outfitted or guided use on national Forest
  Service land.</li>
          <li>Held by an outfitter qualified to provide the service.</li>
          <li>Valid for up to 200
<a href="https://www.fs.usda.gov/detail/mbs/passes-permits/event-commercial/?cid=stelprdb5295777">service days</a>
in a 180-day period per <a href="https://www.fs.usda.gov/detail/mbs/passes-permits/event-commercial/?cid=stelprdb5295777">use area</a>.</li>
          <li>Based on a flat-rate fee schedule (see “Costs” below).</li>
          <li>Non-renewable and non-competitive.</li>
          <li>Revocable, suspendable and not appealable.</li>
        </ul>
        `
      },
      {
        sectionName: 'Applicant requirements',
        type: 'anchor',
        sectionCopy: `
        <p>Qualified applicants must submit the following documentation as part of the
permit application process:</p>
        <ul>
          <li>Annual use reports</li>
          <li>Liability insurance</li>
          <li>Operating plan</li>
          <li>NOTE: Violations of laws, customer complaints, and adverse performance
and/or permit compliance will be considered in evaluating qualifications.</li>
        </ul>
        `
      },
      {
        sectionName: 'Number of permits and service days',
        type: 'anchor',
        sectionCopy: `
        <p>Permits and service days are managed by use area.
The maximum allowable <a href="https://www.fs.usda.gov/detail/mbs/passes-permits/event-commercial/?cid=stelprdb5295777">service days</a>
varies by <a href="https://www.fs.usda.gov/detail/mbs/passes-permits/event-commercial/?cid=stelprdb5295777">use area</a> and is dependent
on their availability and demand. Only one temporary permit may be obtained per use area every 180 days up to the maximum number of service
days per use area (no more than 200 service days). See the various <a href="https://www.fs.usda.gov/detail/mbs/passes-permits/event-commercial/?cid=stelprdb5295496">permit pool documents</a>
for descriptions of use areas and the maximum number of service days that may be permitted for each area.</p>
        <ul>
          <li><strong>Example 1:</strong> Use Area "A" = 1000 total
<a href="https://www.fs.usda.gov/detail/mbs/passes-permits/event-commercial/?cid=stelprdb5295777">pool days</a> with with a maximum of 200 days per permit.
This means you can apply for 1 permit up to 200 days, every 6 months.</li>
          <li><strong>Example 2:</strong> Use Area "B" = 150 total pool days, with a maximum of 50 days per permit.
This means you can apply for 1 permit up to 50 days, every 6 months.</li>
          <li><strong>Example 3:</strong> Use Area "A" + "B" = a maximum of 200 days for "A" + a
maximum of 50 days for "B" = a maximum of 250 days for use areas "A" and "B." This means you can apply for days from multiple use areas at the
same time.</li>
        </ul>
        `
      },
      {
        sectionName: 'Benefits of a temporary use permit',
        type: 'anchor',
        sectionCopy: `
        <ul>
          <li>Allows for short-term allocation of use to meet seasonal needs</li>
          <li>Provides an opportunity to try new activities and locations</li>
          <li>Increases flexibility in locations</li>
          <li>Decreases time spent processing paperwork</li>
          <li>Promotes opportunities for church, youth, and educational groups to obtain short term permits for brief and non-recurring outings</li>
        </ul>
        `
      },
      {
        sectionName: 'Activities and locations',
        type: 'anchor',
        sectionCopy: `
        <ul>
          <li>Land-based outfitting and guide permits are available throughout the forest at the discretion of district rangers.</li>
          <li><a href="https://www.fs.usda.gov/detail/mbs/passes-permits/event-commercial/?cid=stelprdb5295496"> River-based guiding permits are currently only available for select locations</a>.</li>
          <li>Permit inquiries for other forests should be directed to those forests.</li>
        </ul>
        <p><a href="https://www.fs.fed.us/">Information for National Forests within the United States can be
found here</a>.</p>
        <p>NOTE: The Forest Service may add, remove, or modify the activities and locations at our discretion.</p>
        `
      },
      {
        sectionName: 'Costs',
        type: 'anchor',
        sectionCopy: `
        <h3>Cost chart</h3>
        <table class="faq-table">
          <tr>
            <th>Number of service days</th>
            <th>Flat fee</th>
            <th>Maximum gross revenue for each period of service days</th>
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
        type: 'anchor',
        sectionCopy: `
        <p><a href="https://www.fs.usda.gov/detail/mbs/passes-permits/event-commercial/?cid=stelprdb5295496">
        Administration of the temporary permits varies by pool and is specified in the land or river pool permit documents found here</a>.</p>
        <p>Ideally, there would be plenty of service days available to allow all temporary use permits
to be issued on a first-come, first-served basis. However, some permit pools have high demand and are limited in service day capacity.
In this case, we will allocate the permits using a lottery based on due date. Due dates are months ahead of their respective permit period so that applicants who
are granted a permit by means of our lottery will have plenty of time to advertise and prepare. In the event there are unallocated
days left over after the lottery, additional permits may be issued on a first-come,
first-served basis.</p>
        <p><a href="https://www.fs.fed.us/specialuses/special_outfitting.shtml">For more information on Forest Service outfitter and guide policies and
regulations, visit the national website.</a></p>
        `
      }
    ];
  }
}
