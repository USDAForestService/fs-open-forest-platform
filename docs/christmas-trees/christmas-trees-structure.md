# Christmas trees frontend code structure

All frontend code for the christmas-trees module can be found under two modules without the 
/frontend/src/app directory structure.  

## /trees structure
The main module for the Christmas trees functionality is /trees and includes _services,
admin, and forests respectively. 

### _services
Includes all services.

### admin
Includes all functionality for the forest service administrators, SMEs and LEOs who should
be included in the safelist inside of the VCAP_SERVICES with a name and a forest configured
for access.

### forests
/forests includes all modules for the home page (/forest-finder), the main guideline page for each forest
(/tree-guidelines) and the special map details module for screen readers (/christmas-tree-map-details)

## Permit application
The Christmas tree permit application form can be found under /application-forms/tree-application-form.
It is kept in this part of the application structure because it shares form functionality with
the other forms in the app.

/tree-permit-rules is used for displaying rules within the permit.

/tree-permit-view is used for displaying the permit confirmation page and allowing the user to print.


