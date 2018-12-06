# Purpose
To test the basic concept of the “help me find a permit” wizard flow and test the second state of the application form. 

# Test session details
* 3 testers scheduled
* 3 total testing sessions performed
* Testers volunteered from a selection of acquaintances and known users of national parks/forest system
* Each testing session was scheduled for 30 minutes and all 3 sessions lasted between 15-20 minutes
* All users were sent a scenario script a few days before the scheduled testing session. The script included a scenario to give them context around the tasks they would be performing, as well as links to the location of the prototype and a link to the online meeting. 

# Session overview
Each tester was asked if they had a preference for applying / signing up online vs. using a paper form or over the phone. All three users preferred using an online form. 

Each tester was informed that the tasks were designed to test the process flow and user experience of the form, not their technical ability or familiarity with online forms.

Each tester then received a quick overview of the task to give them the basic concept outlined in the scenario to make sure they understood the basic, most important tasks.

### Changes made based on the first testing session
* Two options for applicant type, Organization and Individual. This choice results in a slightly different experience for “Applicant Information.” For Individuals, the main contact was the primary permit holder. For Organizations, the main contact was the organization and the primary permit holder was listed below.
* Permit holders were moved to the beginning of the application, to associate them more closely to the applicant information.
* The secondary phone number was made optional and triggered by a check box to match other conditional elements.
* The secondary permit holder UI was changed to a check box to match other conditional elements.
* Event description was reorganized to eliminate users adding number of participants and location to description. New order: Location, number of participants/spectators, description.
* Number of spectators was made optional.
* End date was pre-filled with start date value.

# General outcome
Overall, each testing session could be considered successful with only limited or minor issues, delays or confusion.

* No testers had issues with the “help me find a permit” flow. Some users missed this flow. Instead of following the scenario, they made an educated guess as to the correct application. This is a hard flow to test using participants with familiarity with the National Forest permitting process.
* Each user only had minor concerns or confusion with the application flow (less confusion than the first round of testing).
* None of the issues were dead ends or critical to the application completion.
* All testers commented that the form was very quick and easy.

# Results and insights

## Help me find a permit
#### Result: successful
* All four users knew they needed the Non-Commercial Permit application.
* Three of the four assumed we wanted them to go through the path of finding a permit regardless. One needed to be prompted to go back and use that particular path, likely due to lack of understanding the scenario.
* Once on the correct path, all users went through the questions quickly and without issue.

#### Recommendations:
* No changes to basic concept at this point.
* It may be a good idea to use more realistic/final questions and answers for future testing sessions.

## Individual or organization
#### Result: successful
* All users understood this. They chose Individual, without pause or issue.

#### Recommendations: none

## Primary permit holder name and address
#### Result: successful
* After selecting “Individual,” all users quickly completed Primary Permit Holder Name and Address.

#### Recommendations:
* Test organization scenario 

## Phone numbers *(switched “required” second phone number to “optional” with checkbox)*
#### Result: successful
No issue. All users added one phone number.

#### Recommendations: none

## Secondary permit holder
#### Result: successful
* All users quickly added a secondary permit holder. One user commented, while hovering over the “Secondary permit holder address same as primary permit holder address” that they were going to use the same address.

#### Recommendations: 
* Design issue noticed during review: The “add a secondary permit holder” checkbox feels like it is kind of hanging out on its own. Maybe add the Headline and have the checkbox below.

## Event title
#### Result: successful
* All users filled this out quickly.

#### Recommendations: none

## Event location
#### Result: somewhat successful 
* Users were confused about which park they should enter as the location. This doesn’t seem like an issue that needs to be addressed. If the permit is labeled as being for a particular Forest or the user chooses a Forest as one of the steps made before getting the application, users will understand the context of “location” is within the defined Forest.

#### Recommendations:
* Possibly label the application with the Forest name iand include in the location field description.

## Attendants
#### Result: somewhat successful
* “Spectators” seems to be a concept that confuses all users. Mainly in the use case of applying for an individual permit. One user expected spectators to be defined as someone who’s paying to attend the event. I would guess that most non-commercial permit applicants would skip over this and assume it does not apply to them. These issues were likely caused by too much analysis of the process, not a UX flaw.

#### Recommendations: 
* We should discuss how often spectators are included in non-commercial events and use cases. 
* Consider editing the description.

## Start/end date and time
#### Result: mostly successful 
* As in the first tests, users filled this out quickly with little difficulty.
* There was one user that had issue with having to enter “minutes” after choosing 10:00.
* Two users suggested adding a calendar picker but did not have an issue with the current date entry UI. The comments seemed more like a “nice to have” than a required solution to a problem.

#### Recommendations:
* Have the default value of “Minutes” set to “:00”
