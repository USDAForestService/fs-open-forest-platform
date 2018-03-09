# ChristmasTreesForests database table

The ChristmasTreesForests database and its related seeders are used to provide data for a minimal set of variables that are shared by all National Forest Christmas tree sites (for example, on the permit svg file and the permit information webpages). The database contains the following:

| Database Fields | Description |
| ----- | :----- |
| ID |  A number that represents each forest; the number is set automatically to start at 1.|
| forest_name 			| The complete forest name, e.g. Arapaho and Roosevelt National Forests. The name should include "National Forest.” |
| forest_name_short:	| The forest name in shortened format, e.g., Arapaho and Roosevelt. |
| forest_url			| A hyperlink to the main USDA Forest Service national forest website, e.g.,https://www.fs.usda.gov/main/arp. |
| tree_height: 		        | Maximum tree height in feet, e.g. 12. If the forest does not have a maximum tree height, this value is set to 0. |
| stump_height:		| Maximum stump height in inches, e.g. 6. If the forest does not have a maximum stump height, this value is set to 0.  |
| stump_diameter:	        | Maximum stump diameter in inches, e.g. 4. If the forest does not have a maximum stump diameter, this value is set to 0.|
| start_date:			| The season start date, e.g. '2018-11-01T06:00:00Z.’ This can be changed on the Admin webpage. |
| end_date:			| The season end date, e.g. '2018-11-01T06:00:00Z.’ This can be changed on the Admin webpage. |
| org_structure_code:	| The USDA organization structure code, e.g. '11-02-10T.’ |
| description:			| A description containing the state and nearby city of the forest, e.g. Arapaho & Roosevelt &#124; Colorado &#124; Fort Collins, CO. This information is used in the search bar.|
| forest_abbr:			| The forest abbreviation as determined by the USDA, e.g., arp. |
| tree_cost:			| Cost per harvested tree in dollars, e.g. 10. |
| max_num_trees:		| Maximum number of trees that can be harvested on a single permit, e.g. 5. |
| timezone:			| The forest’s timezone as determined by a major city, e.g. America/Denver. (Uses moment.js.)  |
| cutting_areas: | A JSON blob representing the cutting areas/special areas for each forest. |
| allow_additional_height | boolean to represent if a forest allows trees to be harvested if they are taller than the tree height |
