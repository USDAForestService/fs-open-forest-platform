# Christmas tree forest json instructions

To remove a species from a given forest simply delete the json for the species from the forest's treeSpecies json.

To associate a species to a forest add the data into the json. For example to add Lodgepole Pine to Mt. Hood:

Open up */assets/config/christmasTreesForests-mthood.json
At the correct position in the json add the treeSpecies json within the treeSpecies object.
      {
         "id": "pacific-yew",
         "name": "Pacific Yew",
         "status": "prohibited"
      },
      {
         "id": "lodgepole-pine",
         "name": "Lodgepole Pine",
         "status": "not recommended"
      }
    ]

To change the status of a tree species simply update the status to one of the following:

  prohibited
  recommended
  not recommended
