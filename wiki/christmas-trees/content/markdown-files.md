# Markdown content

The guidelines and rules of the Christmas tree content are maintained in the `frontend/src/assest/content/` directory and are forest specific, although they share commit permit rules and species information found in the `frontend/src/assest/content/common` directory.

The common permit rules and the tree-cutting-rules.md are copied on every build to the server to be used in the permit generation and rules sheet print out.

Below is a list of content sections, their location and the files that can be modified with markdown to update the content.

| Content section      | Directory                                                     | File name                                     | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| When to cut your tree         | frontend/src/assets/content/{forestAbbr}/                     | when-to-cut-your-tree.md                     | Start dates for various districts within the forest if they differ from the overall start date and end dates.                                     |
| How to cut your tree | frontend/src/assets/content/{forestAbbr}/how-to-cut | helpful-tips.md <br> measuring.md         | Information to help the user locate trees they can harvest and avoid those they cannot harvest. <br> Information to help the user harvest a tree. |
| Rules for cutting        | frontend/src/assets/content/{forestAbbr}/                    | tree-cutting-rules.md                                      | Rules people must follow when cutting down a tree. <br> Rules people must follow when selecting a tree.                                           |
| Permit rules        | frontend/src/assets/content/common/                    | permit-rules.md                                      | Rules people must follow when cutting down a tree. <br> Rules people must follow when selecting a tree.                                           |
| How to plan your trip      | frontend/src/assets/content/{forestAbbr}/        | how-to-plan-your-trip.md                      | Helpful information before leaving home to visit the forest.                                                                                      |
| Where to cut your tree      | frontend/src/assets/content/{forestAbbr}/where-to-cut-your-tree       | cutting-area-maps.md                                    | Information on where harvesting is allowed in the forest along with links to maps found in /assets/images.                                        |
| Where to cut your tree       | frontend/src/assets/content/{forestAbbr}/where-to-cut-your-tree       | prohibited.md                                 | Information on where harvesting is not allowed in the forest. 
| Where to cut your tree       | frontend/src/assets/content/{forestAbbr}/where-to-cut-your-tree/map-alt-text       | MAP_NAMe.md                                 | Descriptive alternate text for the provided maps                                                                                             |
| Contact information  | frontend/src/assets/content/{forestAbbr}/           | contact-us.md                                 | Contact information for the forest.    |         
