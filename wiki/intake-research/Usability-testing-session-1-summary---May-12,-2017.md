# Purpose
To test the basic concept of the “help me find a permit” wizard flow and test the initial state of the application form. 

# Test session details
* 5 testers scheduled.
* 4 total testing sessions performed.
* Testers volunteered from an initial email outreach from 18F
* Each testing session was scheduled for 30 minutes and all 4 sessions lasted between 20-25 minutes.
* All users were sent a scenario script a few days before the scheduled testing session. The script included a scenario to give them context around the tasks they would be performing, as well as links to the location of the prototype and a link to the online meeting. 

# Session overview
Each tester was asked if they had a preference for applying / signing up online vs. using a paper form or over the phone. All four users preferred using an online form. One user said they prefer online forms, but tend to give up and call fairly quickly if the form is difficult to use or confusing.

Each tester was informed that the tasks were designed to test the process flow and user experience of the form, not their technical ability or familiarity with online forms.

Each tester then received a quick overview of the task to give them the basic concept outlined in the scenario to make sure they understood the basic, most important tasks.

# General outcome
Overall, each testing session could be considered successful with only limited or minor issues, delays or confusion.

* No testers had issues with the “help me find a permit” flow.
* Each user only had minor concerns or confusion with the application flow.
* None of the issues were dead ends or critical to the application completion.
* Two testers commented that the form was very quick and easy.

# Results and insights

## Help me find a permit
#### Result: successful
* All four users knew they needed the non-commercial permit application.
* Three of the four users assumed we wanted them to go through the path of finding a permit regardless. One needed to be prompted to go back and use that particular path. This was likely due to lack of understanding the scenario.
* Once on the correct path, all users went through the questions quickly and without issue.
* One user had an issue with the wording “regular person.” It was explained that the working was not final.
* Another user actually liked the wording “regular person” as they thought it might be engaging to general users that feel uncomfortable with the national forest permit environment and vocabulary.

#### Recommendations:
* No changes to basic concept at this point.
* It may be a good idea to use more realistic/final questions and answers for future testing sessions.

## Event title 
#### Result: successful
All four users quickly entered “Smith Wedding” without hesitation or confusion.

#### Recommendations: no changes

## Address
#### Result: somewhat successful
* Two users were a bit confused about what/whose address went here.
* A third user called out that it might be confusing for individuals applying for a non-commercial permit and hard to understand why this was different from the address of the individual identified as the primary permit holder.
* All users expected to receive a confirmation email.

#### Recommendations:
* Add a conditional question (after the event title) asking if the application is for an individual or organization. Deliver a slightly different and more customized experience for each.
* If individual, ask for primary permit holder name and address.
* If organization, ask for organization name and address.
* Follow this up with permit holder details.
* Make the email address a required field to enable confirmations.

## Phone numbers
#### Result: mostly successful
Two users were concerned about which phone number went with which contact (organization or permit holder) and why two phone numbers were required.

#### Recommendations:
Have one required phone field and check box to add additional numbers.

## Event details
#### Result: somewhat successful 
* 3 users included the number of attendants in the description.
* 3 users also included location in description.

#### Recommendations:
Start this section with number of participant and spectators, then location, then show event description.

## Attendants
#### Result: confusing
* Users were confused about what each attendant type was. “Why is this different from a single total?”
* One user thought this would be confusing for an individual that was just having a group of friends or family at an event, especially with the field being required.

#### Recommendations:
* One required field for attendants.
* Additional optional field for spectators, with a definition of what would qualify.

## Start/end date and time
#### Result: mostly successful
* All users filled this out quickly and easily and had no issues with the UI.
* Two users commented and seemed confused about the ending date.
* Three users commented that they felt like most events would end on the same date, so it seemed odd to enter the ending date.

#### Recommendations:
After entering the start date, also auto-fill the end date field with same date.

## Permit holders
#### Result: somewhat successful
* All users quickly and easily understood the UI for entering and adding a permit holder.
* All four users said they thought users might be confused about the difference between the two types of permit holders, what “primary” meant compared to “secondary,” what their responsibilities were, etc. 
* Three users also commented that it was somewhat confusing to be adding a permit holder if an individual was applying. They may feel like they were already added above in the Event information section.

#### Recommendations:
* Collect Event title and add conditional radio buttons asking if applicant is an individual or organization.
* In the case of an individual, the applicant info should double as the contact info for the primary permit holder with an option to add a secondary permit holder, moving the secondary permit holder UI directly below the applicant/primary permit holder info.
* In the case of an organization, the applicant info would be the organization's info with the requirement of adding a primary permit holder name, moving that info directly below the applicant info.
