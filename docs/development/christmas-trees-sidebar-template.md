# Christmas trees Sidebar template

A sidebar template for the tree guidelines page at `/frontend/src/app/trees/forests/tree-guidelines/sidebar-view.component.html`

A sidebar component was created at `/frontend/src/app/sidebar/sidebar.component.ts` that takes a JSON object with all of the sidebar items and IDs of elements on the page that are linked to. The sidebar component creates both desktop and mobile menus.

The JSON that is sent to the sidebar component only dynamically creates the sidebar and mobile menus. The component or section to which the items are linked to must be coded in.

The ids in the sidebar JSON must match the ids in the tree-guidelines.component.html for the sidebar scrolling and section indicator to work correctly.
