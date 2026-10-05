export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "list"; items: string[] }
  | { type: "note"; title: string; text: string }
  | { type: "table"; headers: [string, string]; rows: [string, string][] };

export type GuideSection = {
  id: string;
  number: string;
  title: string;
  summary: string;
  blocks: GuideBlock[];
};

export const guideSections: GuideSection[] = [
  {
    id: "find-your-way",
    number: "01",
    title: "Open the app and find your way",
    summary: "Where the panel lives, and what each control does.",
    blocks: [
      {
        type: "p",
        text: "Open a Jira issue. The checklist panel sits on the right side of the issue view.",
      },
      {
        type: "p",
        text: "At the top of the panel you will see:",
      },
      {
        type: "list",
        items: [
          "A progress bar and a count such as 2/5 (2 of 5 items done).",
          "A search box.",
          "A List / Tab switch.",
          "A + button to add a checklist.",
          "A ⋯ menu for more actions.",
        ],
      },
      {
        type: "p",
        text: "Below that, each checklist has its own header: a name, a small progress count, and its own ⋯ menu.",
      },
    ],
  },
  {
    id: "blank-issue",
    number: "02",
    title: "A blank issue: your first checklist",
    summary: "Create the first checklist and add the first item.",
    blocks: [
      {
        type: "p",
        text: "If the issue has no checklists yet, the panel shows an empty state with one button: Create checklist.",
      },
      {
        type: "steps",
        items: [
          "Click Create checklist.",
          "Type a name, for example Release checks.",
          "Click Create.",
        ],
      },
      {
        type: "p",
        text: "The checklist appears with one empty row already waiting. Type the first item and press Enter. A new empty row appears underneath, so you can keep typing the next item without clicking again.",
      },
      {
        type: "note",
        title: "Name limit",
        text: "A checklist name can be up to 100 characters. If you go past that, the box shows a red border and the Create button stays disabled until you shorten the name.",
      },
    ],
  },
  {
    id: "manage-checklists",
    number: "03",
    title: "Manage checklists",
    summary: "Add, rename, and reorder whole checklists.",
    blocks: [
      { type: "p", text: "Add another checklist" },
      {
        type: "steps",
        items: [
          "Click the + button at the top of the panel.",
          "Type a name.",
          "Click Create.",
        ],
      },
      {
        type: "p",
        text: "You can also open the top ⋯ menu and choose Create checklist. Same result.",
      },
      { type: "p", text: "Rename a checklist" },
      {
        type: "steps",
        items: [
          "Open the ⋯ menu on that checklist’s header.",
          "Choose Rename.",
          "Edit the name.",
          "Click Save. Click Cancel to leave the name unchanged.",
        ],
      },
      { type: "p", text: "Reorder checklists" },
      {
        type: "p",
        text: "Grab the ⋮⋮ handle on the left of a checklist header and drag it up or down. Other checklists shift out of the way. Drop it where you want it.",
      },
      {
        type: "note",
        title: "While a checklist is completed",
        text: "You cannot rename it or drag it. Reopen it first. See Complete and reopen a checklist.",
      },
    ],
  },
  {
    id: "add-items",
    number: "04",
    title: "Add items",
    summary: "Type items in, or create one from the menu.",
    blocks: [
      { type: "p", text: "The fast way" },
      {
        type: "p",
        text: "Click into the empty row at the bottom of a checklist, type, and press Enter. Each Enter both saves the item and opens the next empty row.",
      },
      { type: "p", text: "From the menu" },
      {
        type: "steps",
        items: [
          "Open the checklist’s ⋯ menu.",
          "Choose Create checklist item.",
          "Type the item.",
          "Press Enter.",
        ],
      },
      {
        type: "p",
        text: "An item needs text. If the row is empty, pressing Enter does nothing — it will not create a blank item.",
      },
      {
        type: "note",
        title: "Item text limit",
        text: "Item text can be up to 255 characters.",
      },
    ],
  },
  {
    id: "edit-item",
    number: "05",
    title: "Edit an item",
    summary: "Change the text, or fill in the optional details.",
    blocks: [
      { type: "p", text: "Change the text" },
      {
        type: "steps",
        items: [
          "Click the item’s name.",
          "Edit the text.",
          "Click Save, or press Enter.",
        ],
      },
      {
        type: "p",
        text: "Press Escape to close without saving.",
      },
      { type: "p", text: "Optional details" },
      {
        type: "p",
        text: "Open the item’s ⋯ menu and choose Edit. A dialog opens with four fields. Only the name is required.",
      },
      {
        type: "table",
        headers: ["Field", "What it is for"],
        rows: [
          ["Name", "The item text. Required. Up to 255 characters."],
          [
            "Description",
            "Extra notes. Up to 1,000 characters. If you add one, a small note icon appears on the row. Hover it to read the note.",
          ],
          [
            "Mandatory",
            "Turn this on if the item must be done before the checklist can be completed. A flag icon appears on the row.",
          ],
          [
            "Assignee",
            "Pick a person. Their avatar shows on the row. This field only appears if your admin has enabled it.",
          ],
        ],
      },
      {
        type: "p",
        text: "Click Save. Click Cancel or the X to close without saving.",
      },
    ],
  },
  {
    id: "status-and-fields",
    number: "06",
    title: "Status and the other fields",
    summary: "What you can change directly on a row.",
    blocks: [
      { type: "p", text: "Status" },
      {
        type: "p",
        text: "Every item has a status. Click the status label on the row to change it.",
      },
      {
        type: "table",
        headers: ["Status", "Meaning"],
        rows: [
          ["To Do", "Not started. This is the default for a new item."],
          ["In Progress", "Someone is working on it."],
          ["Done", "Finished. The item name gets a strikethrough."],
          ["Skipped", "You decided not to do this one. It still counts as finished for progress."],
        ],
      },
      {
        type: "p",
        text: "Done and Skipped are the two finished statuses. To Do and In Progress are not.",
      },
      { type: "p", text: "Assignee" },
      {
        type: "p",
        text: "If the assignee column is visible, click the avatar (or the empty person icon) on the row and pick someone. You do not have to open the edit dialog for this.",
      },
      { type: "p", text: "Mandatory" },
      {
        type: "p",
        text: "Mandatory is set in the edit dialog, not from the row. See Edit an item.",
      },
    ],
  },
  {
    id: "reorder-items",
    number: "07",
    title: "Reorder items",
    summary: "Drag a row by its handle.",
    blocks: [
      {
        type: "p",
        text: "Grab the ⋮⋮ handle on the left of a row and drag it up or down within the same checklist. You cannot drag an item into a different checklist.",
      },
      {
        type: "note",
        title: "While a checklist is completed",
        text: "Drag handles are hidden. Reopen the checklist to reorder.",
      },
    ],
  },
  {
    id: "search",
    number: "08",
    title: "Search",
    summary: "Search looks at item names only.",
    blocks: [
      {
        type: "steps",
        items: [
          "Click the search box at the top of the panel.",
          "Type part of an item name.",
        ],
      },
      {
        type: "p",
        text: "The list narrows to matching items as you type. Matching does not care about capital letters.",
      },
      {
        type: "p",
        text: "Search looks at item names only. It does not search descriptions, checklist names, or assignees.",
      },
      {
        type: "p",
        text: "Clear the box to see everything again. Your checklist data is unchanged — search only hides rows.",
      },
    ],
  },
  {
    id: "columns",
    number: "09",
    title: "Show, hide, and resize columns",
    summary: "Pick which fields stay on screen.",
    blocks: [
      {
        type: "steps",
        items: [
          "Open the ⋯ menu at the top of the panel.",
          "Choose Columns settings.",
          "Tick the columns you want to see. Untick the ones you do not.",
        ],
      },
      {
        type: "p",
        text: "You can show or hide: Type, Key, Summary, Status, Priority, Assignee, Due date, and Story points.",
      },
      {
        type: "p",
        text: "The item name column always stays. You cannot hide it.",
      },
      {
        type: "p",
        text: "To resize a column, drag the edge of its header. Your column choices are remembered on this browser.",
      },
    ],
  },
  {
    id: "list-and-tab",
    number: "10",
    title: "List view and Tab view",
    summary: "Stack every checklist, or focus on one.",
    blocks: [
      {
        type: "p",
        text: "Use the List / Tab switch at the top of the panel.",
      },
      {
        type: "list",
        items: [
          "List shows every checklist on the issue, stacked.",
          "Tab shows one checklist at a time. Click a checklist’s tab to switch to it.",
        ],
      },
      {
        type: "p",
        text: "In Tab view, the Rename and Delete actions for the checklist you are looking at are also under the top ⋯ menu.",
      },
    ],
  },
  {
    id: "bulk-actions",
    number: "11",
    title: "Work on many items at once",
    summary: "Select rows, then apply one action.",
    blocks: [
      {
        type: "p",
        text: "Each row has a checkbox on the left. The header has a checkbox that selects every item currently shown.",
      },
      {
        type: "steps",
        items: [
          "Tick the items you want.",
          "A bar appears at the bottom of the panel.",
          "Pick an action.",
        ],
      },
      {
        type: "table",
        headers: ["Action", "What it does"],
        rows: [
          ["Set status", "Sets the same status on every selected item."],
          [
            "Assign",
            "Assigns every selected item to one person. Only shown if your admin has enabled assignees.",
          ],
          [
            "Delete",
            "Deletes every selected item. You will be asked to confirm. This cannot be undone.",
          ],
        ],
      },
      {
        type: "p",
        text: "Click the X on the bar to clear the selection.",
      },
      {
        type: "note",
        title: "While a checklist is completed",
        text: "Its items cannot be selected.",
      },
    ],
  },
  {
    id: "delete",
    number: "12",
    title: "Delete items and checklists",
    summary: "Every delete asks you to confirm.",
    blocks: [
      { type: "p", text: "Delete one item" },
      {
        type: "steps",
        items: [
          "Open the item’s ⋯ menu.",
          "Choose Delete.",
          "Confirm.",
        ],
      },
      {
        type: "p",
        text: "You can also select items and use Delete on the bottom bar. See Work on many items at once.",
      },
      { type: "p", text: "Delete a whole checklist" },
      {
        type: "steps",
        items: [
          "Open the checklist’s ⋯ menu.",
          "Choose Delete.",
          "Confirm.",
        ],
      },
      {
        type: "p",
        text: "This deletes the checklist and every item in it.",
      },
      {
        type: "p",
        text: "Every delete asks you to confirm. The confirm button text tells you exactly what will be removed:",
      },
      {
        type: "table",
        headers: ["You are deleting", "Confirm button"],
        rows: [
          ["One item", "Delete item"],
          ["Several items", "Delete selected"],
          ["A checklist", "Delete checklist"],
        ],
      },
      {
        type: "note",
        title: "No undo",
        text: "Deleted items and checklists cannot be restored.",
      },
    ],
  },
  {
    id: "complete-and-reopen",
    number: "13",
    title: "Complete and reopen a checklist",
    summary: "Lock a finished checklist, then reopen it if work remains.",
    blocks: [
      { type: "p", text: "Complete" },
      {
        type: "steps",
        items: [
          "Finish the items that need to be finished. See What “complete” requires.",
          "Open the checklist’s ⋯ menu.",
          "Choose Complete checklist.",
        ],
      },
      {
        type: "p",
        text: "The checklist collapses to its header and shows a Completed badge. While it is completed you cannot add, edit, check, drag, or delete its items, and you cannot rename or drag the checklist itself.",
      },
      { type: "p", text: "Reopen" },
      {
        type: "steps",
        items: [
          "Open the ⋯ menu on the completed checklist.",
          "Choose Reopen checklist.",
        ],
      },
      {
        type: "p",
        text: "The checklist expands and can be edited again.",
      },
      {
        type: "note",
        title: "If Complete stays disabled",
        text: "Hover the greyed-out Complete checklist entry. The tooltip tells you what is still open. Mandatory items must be Done or Skipped. If your admin requires every item to be finished, every item must be Done or Skipped.",
      },
    ],
  },
  {
    id: "personal-checklist",
    number: "14",
    title: "Your personal checklist",
    summary: "A private list that only you can see.",
    blocks: [
      {
        type: "p",
        text: "Each issue can have one checklist that belongs to you alone. Other people viewing the same issue cannot see it. It is labelled Personal Checklist and shows a lock icon.",
      },
      { type: "p", text: "Create it" },
      {
        type: "steps",
        items: [
          "Open the ⋯ menu at the top of the panel.",
          "Choose Create personal checklist.",
        ],
      },
      {
        type: "p",
        text: "It is created immediately, with the name Personal Checklist. You do not type a name.",
      },
      { type: "p", text: "How it differs" },
      {
        type: "list",
        items: [
          "You cannot rename it.",
          "You cannot drag it to reorder it.",
          "Only you can see it, on every issue you open.",
        ],
      },
      {
        type: "p",
        text: "Adding items, editing, statuses, and completing work the same way as any other checklist.",
      },
      { type: "p", text: "Remove it" },
      {
        type: "p",
        text: "Open its ⋯ menu and choose Delete. Confirm. This removes it from the issue for you.",
      },
    ],
  },
  {
    id: "progress",
    number: "15",
    title: "How progress is counted",
    summary: "Done and Skipped both move the bar forward.",
    blocks: [
      {
        type: "p",
        text: "The bar at the top of the panel, and the small count on each checklist, treat an item as finished when its status is Done or Skipped.",
      },
      {
        type: "p",
        text: "So 2/5 means two items are Done or Skipped, out of five items in total.",
      },
      {
        type: "p",
        text: "To Do and In Progress do not move the bar.",
      },
    ],
  },
  {
    id: "feedback-and-settings",
    number: "16",
    title: "Send feedback and check settings",
    summary: "Both live in the top menu.",
    blocks: [
      {
        type: "p",
        text: "Both live in the ⋯ menu at the top of the panel.",
      },
      { type: "p", text: "Feedback" },
      {
        type: "steps",
        items: [
          "Choose Feedback.",
          "Write your message.",
          "Add your email if you want a reply. Email is optional.",
          "Click Send feedback.",
        ],
      },
      {
        type: "p",
        text: "You should see Feedback sent. Thank you. If sending fails, you will see Could not send feedback, please try again later. and your message is kept so you can retry.",
      },
      { type: "p", text: "Settings" },
      {
        type: "p",
        text: "Choose Settings to open the app’s settings page. What you can change there depends on whether you are an admin.",
      },
    ],
  },
  {
    id: "common-tasks",
    number: "17",
    title: "Common tasks, shortest path",
    summary: "The shortest path for the jobs people do most.",
    blocks: [
      {
        type: "table",
        headers: ["I want to…", "Do this"],
        rows: [
          ["Add a checklist", "Click + at the top, type a name, click Create."],
          ["Add items quickly", "Type in the empty row, press Enter, repeat."],
          ["Mark one item done", "Click its status and choose Done."],
          ["Assign without opening a dialog", "Click the avatar on the row."],
          ["Change several statuses at once", "Tick the rows, then Set status on the bottom bar."],
          ["Find an item", "Type part of its name in the search box."],
          ["Hide a column", "Top ⋯ menu, then Columns settings, then untick it."],
          ["Lock a finished checklist", "Checklist ⋯ menu, then Complete checklist."],
          ["Edit a locked checklist", "Checklist ⋯ menu, then Reopen checklist."],
          ["Keep notes only I can see", "Top ⋯ menu, then Create personal checklist."],
        ],
      },
    ],
  },
  {
    id: "not-in-this-app",
    number: "18",
    title: "Things you will not find here",
    summary: "These paths are not in the product. Do not look for them.",
    blocks: [
      {
        type: "p",
        text: "These are not in the product. Do not look for them.",
      },
      {
        type: "list",
        items: [
          "No templates. Checklists are not created from a template.",
          "No import or export.",
          "No undo after a delete.",
          "Items cannot be moved or copied to another checklist. You can only reorder within the same checklist.",
          "You cannot create, edit, or search from this panel’s search box. Search only filters item names.",
          "Checklist names and item text have no rich text, links, or @mentions. They are plain text.",
          "You cannot rename or reorder a checklist while it is completed.",
          "The personal checklist cannot be renamed or reordered, and there is only one per issue.",
        ],
      },
    ],
  },
  {
    id: "menu-map",
    number: "19",
    title: "Where every action lives",
    summary: "A map of the three menus.",
    blocks: [
      { type: "p", text: "Top ⋯ menu (the whole panel)" },
      {
        type: "list",
        items: [
          "Create checklist",
          "Create personal checklist",
          "Columns settings",
          "Feedback",
          "Settings",
        ],
      },
      { type: "p", text: "Checklist ⋯ menu" },
      {
        type: "list",
        items: [
          "Create checklist item",
          "Rename",
          "Complete checklist / Reopen checklist",
          "Delete",
        ],
      },
      { type: "p", text: "Item ⋯ menu" },
      {
        type: "list",
        items: ["Edit", "Delete"],
      },
      { type: "p", text: "Bottom bar (only while items are selected)" },
      {
        type: "list",
        items: ["Set status", "Assign", "Delete", "Clear selection"],
      },
    ],
  },
  {
    id: "locks-and-errors",
    number: "20",
    title: "When something will not work",
    summary: "What is locked, and what to do when an action fails.",
    blocks: [
      { type: "p", text: "The usual reason is that the checklist is completed. Reopen it." },
      {
        type: "p",
        text: "The other reason is a limit:",
      },
      {
        type: "list",
        items: [
          "Checklist name over 100 characters: the box turns red and Create or Save stays disabled.",
          "Item text cannot exceed 255 characters.",
          "A description cannot exceed 1,000 characters.",
          "An item with no text will not be created.",
        ],
      },
      { type: "p", text: "If an action fails, the panel shows a short message:" },
      {
        type: "list",
        items: [
          "Couldn’t create checklist, please try again later.",
          "Couldn’t rename checklist, please try again lster.",
          "Couldn’t delete checklist, please try again later.",
          "Couldn’t save checklist item, please try again later.",
          "Couldn’t delete checklist item, please try again later.",
          "Couldn’t update checklist item, please try again later.",
          "Couldn’t assign checklist item, please try again later.",
          "Couldn’t update checklist item status, please try again later.",
          "Couldn’t reorder, please try again later.",
          "Couldn’t complete checklist, please try again later.",
          "Couldn’t reopen checklist, please try again later.",
          "Could not send feedback, please try again later.",
        ],
      },
      {
        type: "p",
        text: "Wait a moment and try the same action again. If it keeps failing, use Feedback in the top ⋯ menu and describe what you clicked.",
      },
    ],
  },
];
