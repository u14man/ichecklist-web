import {
  LayoutList,
  ShieldCheck,
  LockKeyhole,
  MousePointer2,
  ChartNoAxesCombined,
  SlidersHorizontal,
  CircleUserRound,
  PanelsTopLeft,
  Code2,
  Bug,
  Rocket,
  Target,
} from "lucide-react";

export const features = [
  {
    slug: "organized-checklists",
    title: "Organized checklists",
    short: "A place for every little detail.",
    icon: LayoutList,
    color: "lavender",
    headline: "Less scrolling.\nMore structure.",
    description:
      "Give development, design, and release QA their own space — without sending your team to another issue.",
    body: "Create named checklists right inside an issue. Keep acceptance criteria together, put release checks in order, and make the next step easy to find.",
    points: [
      "Create and rename checklists inline",
      "Switch between focused tabs and a full list",
      "Reorder checklists and drag Checklist Items into place",
    ],
    detailTitle: "One issue. A clearer picture.",
    detail:
      "An issue can hold a lot of work. Named checklists make it easier to see what belongs together, while individual counters tell you how each checklist is progressing. Items without a named checklist stay safely in Uncategorized.",
    extras: [
      {
        title: "Your order, your way",
        text: "Move checklists to the top or bottom, then drag Checklist Items into the sequence that makes sense.",
      },
      {
        title: "Room to focus",
        text: "Collapse everything for a quick overview, or open a single checklist to work through the details.",
      },
      {
        title: "Nothing left behind",
        text: "Uncategorized keeps unassigned Checklist Items visible until you decide where they belong.",
      },
    ],
  },
  {
    slug: "mandatory-items",
    title: "Mandatory items",
    short: "Make your must-dos a must.",
    icon: ShieldCheck,
    color: "mint",
    headline: "“Done” should mean\nnothing was missed.",
    description:
      "Turn acceptance criteria into a real checkpoint. Mandatory Items need to be resolved before the checklist can be completed.",
    body: "Mark the checks that matter with a simple asterisk. When someone completes the checklist, validation catches any Mandatory Items that are still open.",
    points: [
      "Flag essential Checklist Items with an asterisk",
      "See exactly which Mandatory Items remain open",
      "Jump directly to the first incomplete item",
    ],
    detailTitle: "A helpful checkpoint. Not another roadblock.",
    detail:
      "Instead of a vague error, your team sees a clear list of incomplete Mandatory Items. “View incomplete items” takes them straight to the first unresolved check so they can keep moving.",
    extras: [
      {
        title: "Clear expectations",
        text: "Put the non-negotiable acceptance criteria where the work happens, not in a comment someone has to find.",
      },
      {
        title: "Actionable validation",
        text: "Completion checks the underlying Checklist Items, even when the current view is filtered.",
      },
      {
        title: "An honest boundary",
        text: "This gate controls checklist completion. It is not a Jira issue transition validator.",
      },
    ],
  },
  {
    slug: "completion-locking",
    title: "Completion & locking",
    short: "Finish with a little certainty.",
    icon: LockKeyhole,
    color: "lavender",
    headline: "Check it. Complete it.\nKeep it that way.",
    description:
      "Protect the state of completed work with a deliberate, read-only finish — and a clear path to reopen it.",
    body: "Once Mandatory Items are resolved, confirm completion to lock editing. A completion banner records who finished the checklist and when.",
    points: [
      "Validate Mandatory Items before completing",
      "Lock edits, additions, deletions, and reordering",
      "Reopen deliberately when the work needs another pass",
    ],
    detailTitle: "A finish line that stays put.",
    detail:
      "Completed checklists become read-only, so a stray click cannot change a status, due date, assignee, or item. If the work changes, an authorized user can confirm reopening and restore editing.",
    extras: [
      {
        title: "Know who completed it",
        text: "The completed state includes the person and completion timestamp for a clear handoff.",
      },
      {
        title: "Protect the details",
        text: "The lock covers Checklist Items and their properties, not just the completion checkbox.",
      },
      {
        title: "Room for another pass",
        text: "Reopening records who reopened the checklist and when. Reopening is intentional, not accidental.",
      },
    ],
  },
  {
    slug: "personal-checklists",
    title: "Personal checklists",
    short: "Your own corner of the issue.",
    icon: CircleUserRound,
    color: "peach",
    headline: "Teamwork has room\nfor a little me-work.",
    description:
      "Keep your debugging notes, reminders, and next steps close to the issue — and out of everyone else’s way.",
    body: "A Personal Checklist is visible only to its creator. Your private Checklist Items stay separate from the team’s Overall Progress.",
    points: [
      "One Personal Checklist per person, per issue",
      "Visible only to the person who created it",
      "Never counted in the team’s Overall Progress",
    ],
    detailTitle: "Personal by design. Not just by label.",
    detail:
      "Your Personal Checklist cannot be renamed or assigned to someone else. Its Checklist Items stay yours, while shared checklists keep the whole team aligned.",
    extras: [
      {
        title: "Keep the context",
        text: "Write down the next thing to investigate while you are already working in the issue.",
      },
      {
        title: "Keep the team focused",
        text: "Private Checklist Items do not appear for collaborators or add noise to shared checklists.",
      },
      {
        title: "Keep progress meaningful",
        text: "Checking off a personal reminder never changes the team’s completion percentage.",
      },
    ],
  },
  {
    slug: "bulk-actions",
    title: "Bulk actions",
    short: "One action. Plenty of progress.",
    icon: MousePointer2,
    color: "lavender",
    headline: "Less click, click, click.\nMore getting it done.",
    description:
      "Assign a round of reviews, reschedule release checks, or update a whole set of Checklist Items in one go.",
    body: "Enter multi-select mode, choose the Checklist Items you need, and apply changes together. Individual loading states make it clear what is being updated.",
    points: [
      "Update status, priority, assignee, and due date",
      "Apply tags to selected Checklist Items",
      "Duplicate or delete in bulk, with confirmation for deletion",
    ],
    detailTitle: "A small action with a bigger reach.",
    detail:
      "Select individual Checklist Items or all visible results. Filtering first lets you narrow the work down before assigning, updating, duplicating, or deleting it.",
    extras: [
      {
        title: "Select what matters",
        text: "Work with the Checklist Items in the current view instead of changing unrelated work.",
      },
      {
        title: "Stay in the flow",
        text: "Menus stay open during duplication and show feedback as the operation progresses.",
      },
      {
        title: "Change with confidence",
        text: "Deletion asks for confirmation, while property-level indicators show updates in progress.",
      },
    ],
  },
  {
    slug: "progress-tracking",
    title: "Progress tracking",
    short: "The whole picture, at a glance.",
    icon: ChartNoAxesCombined,
    color: "mint",
    headline: "Know what’s done.\nSee what’s next.",
    description:
      "A live, shared view of progress that stays meaningful — even when everyone is looking at a different filtered view.",
    body: "Overall Progress shows completed and total shared Checklist Items, alongside a percentage. Each checklist has its own counter for a closer look.",
    points: [
      "See overall and per-checklist completion",
      "Keep consistent totals while searching or filtering",
      "Exclude Personal Checklists from shared progress",
    ],
    detailTitle: "Numbers your team can actually read.",
    detail:
      "Done and Skipped both count as resolved in Overall Progress. The percentage is based on all shared Checklist Items, not just the currently visible search results. An empty checklist starts at zero.",
    extras: [
      {
        title: "Useful at every level",
        text: "Read the issue-wide percentage or check the smaller counter beside an individual checklist.",
      },
      {
        title: "Stable while saving",
        text: "The previous status is preserved during a save so network delays do not make progress jump.",
      },
      {
        title: "Shared work only",
        text: "Personal reminders stay outside the calculation, whether they are open or completed.",
      },
    ],
  },
  {
    slug: "flexible-views",
    title: "Views & filters",
    short: "Your work, through your lens.",
    icon: SlidersHorizontal,
    color: "peach",
    headline: "Find your focus.\nLeave the noise.",
    description:
      "A long checklist does not have to feel like a long checklist. Choose the view, fields, and filters that work for you.",
    body: "Switch between List and Tab views, search names and descriptions, and combine filters to see the Checklist Items that need your attention.",
    points: [
      "Filter by status, assignee, priority, and tags",
      "Sort by name, priority, due date, status, or assignee",
      "Choose which columns you see and keep your preference",
    ],
    detailTitle: "The right amount of information.",
    detail:
      "Show priority and due dates when planning. Hide extra columns when checking things off. Your column preferences persist, while Name always stays visible so the work stays readable.",
    extras: [
      {
        title: "Two ways to work",
        text: "List view brings every checklist together. Tab view helps you focus on one at a time.",
      },
      {
        title: "Quick ways to narrow it down",
        text: "Use My Items or the completed filter for an instant slice of your shared work.",
      },
      {
        title: "Space that adapts",
        text: "Extra tabs fold into an overflow menu, keeping even a busy issue comfortable to navigate.",
      },
    ],
  },
  {
    slug: "native-experience",
    title: "Made for Jira",
    short: "Right where your work lives.",
    icon: PanelsTopLeft,
    color: "lavender",
    headline: "Feels familiar.\nWorks a little harder.",
    description:
      "An issue-level checklist experience designed around the way Jira teams already work, in light mode or dark.",
    body: "Assign Checklist Items using Jira users, keep issue context close, and add the next check without breaking your train of thought.",
    points: [
      "Quick inline creation with Enter and Escape",
      "Familiar Jira user assignment and issue context",
      "Thoughtful light and dark mode support",
    ],
    detailTitle: "Less context switching. More doing.",
    detail:
      "Checklist Items live alongside issue status, priority, assignee, reporter, and sprint context. A full item editor is there when you need a description, dates, tags, and more detail.",
    extras: [
      {
        title: "Keyboard-friendly flow",
        text: "Type a Checklist Item, press Enter, and keep going. Escape cancels when you change your mind.",
      },
      {
        title: "Details when you need them",
        text: "Open the item editor to add rich descriptions, priorities, due dates, tags, and ownership.",
      },
      {
        title: "Comfort in either theme",
        text: "Light and dark modes use considered contrast and status colors to keep the interface readable.",
      },
    ],
  },
];

export const solutions = [
  {
    slug: "developers",
    title: "For developers",
    role: "Developers",
    icon: Code2,
    color: "lavender",
    headline: "Ship the code.\nNot the loose ends.",
    description:
      "Keep the small, important engineering checks next to the issue they belong to. No extra sub-tasks. No forgotten edge cases.",
    checklist: "Development",
    items: [
      "Validate database migrations",
      "Cover retry and error paths",
      "Add unit tests for edge cases",
      "Prepare the pull request",
    ],
    benefit: "A cleaner board. A more considered pull request.",
    details: [
      "Capture self-review steps as you work",
      "Make critical acceptance criteria Mandatory Items",
      "Keep debugging notes in a Personal Checklist",
    ],
    feature: "organized-checklists",
  },
  {
    slug: "qa-teams",
    title: "For QA teams",
    role: "QA teams",
    icon: Bug,
    color: "mint",
    headline: "Every test point.\nA clear outcome.",
    description:
      "Give regression checks and acceptance testing a structured home. Assign ownership, flag priorities, and see what is still waiting.",
    checklist: "Release QA",
    items: [
      "Verify the happy path",
      "Retest the reported defect",
      "Check keyboard navigation",
      "Complete regression checks",
    ],
    benefit: "Test details that do not get lost in the comments.",
    details: [
      "Organize test points into named checklists",
      "Use tags to distinguish Bug and Regression checks",
      "Track resolved Checklist Items without creating sub-tasks",
    ],
    feature: "progress-tracking",
  },
  {
    slug: "product-managers",
    title: "For product teams",
    role: "Product teams",
    icon: Target,
    color: "peach",
    headline: "Acceptance criteria.\nActually accepted.",
    description:
      "Make the Definition of Done visible, actionable, and harder to skip over. Bring expectations into the place where delivery happens.",
    checklist: "Acceptance criteria",
    items: [
      "Confirm the primary user journey",
      "Review empty and error states",
      "Verify accessibility criteria",
      "Sign off the final experience",
    ],
    benefit: "A shared understanding of what “done” looks like.",
    details: [
      "Turn critical acceptance criteria into Mandatory Items",
      "Find incomplete checks before checklist completion",
      "Lock a completed checklist for a deliberate handoff",
    ],
    feature: "mandatory-items",
  },
  {
    slug: "release-teams",
    title: "For release teams",
    role: "Release teams",
    icon: Rocket,
    color: "lavender",
    headline: "Release day.\nWithout the guesswork.",
    description:
      "Keep pre-release verification, configuration checks, and rollback preparation together. Give every little step a clear owner.",
    checklist: "Release readiness",
    items: [
      "Verify environment configuration",
      "Review the rollback procedure",
      "Confirm monitoring is ready",
      "Complete the release checklist",
    ],
    benefit: "A clearer view of what stands between now and ready.",
    details: [
      "Split preparation, verification, and rollback into checklists",
      "Set assignees and due dates for every check",
      "Use Overall Progress to follow shared readiness",
    ],
    feature: "completion-locking",
  },
];

export const guides = [
  {
    slug: "definition-of-done",
    category: "TEAM PRACTICES",
    title: "A Definition of Done that lives with the work",
    description:
      "Turn good intentions into visible, actionable acceptance criteria.",
    time: "5 min read",
    color: "lavender",
    icon: ShieldCheck,
    sections: [
      {
        title: "Start with observable outcomes",
        text: "“Works well” is difficult to verify. “The form shows a useful error when a required field is empty” gives someone a concrete check. Write acceptance criteria as outcomes that a teammate can observe.",
      },
      {
        title: "Separate essential from useful",
        text: "Mark only non-negotiable Checklist Items as mandatory. This makes the completion gate meaningful and helps the team distinguish a release requirement from a nice-to-have review.",
      },
      {
        title: "Put a person beside the check",
        text: "Assign each criterion to the person best placed to verify it. Use a due date when the check needs to happen before a shared milestone.",
      },
      {
        title: "Finish intentionally",
        text: "Review the remaining Mandatory Items, resolve them, and complete the checklist. The read-only state preserves that completed moment. Remember: checklist completion is separate from Jira issue transitions.",
      },
    ],
  },
  {
    slug: "checklists-vs-subtasks",
    category: "WORKING IN JIRA",
    title: "A checklist or a sub-task? How to choose.",
    description: "Keep the board meaningful without losing the small details.",
    time: "4 min read",
    color: "mint",
    icon: LayoutList,
    sections: [
      {
        title: "Use a sub-task for an independent workstream",
        text: "If work needs its own Jira workflow, separate reporting, or an independent discussion, a sub-task may be the right level of structure. Do not compress complex work just to keep the board small.",
      },
      {
        title: "Use a Checklist Item for a contained step",
        text: "A migration verification, review point, or acceptance check often belongs inside an existing issue. A Checklist Item can carry a status, assignee, priority, due date, description, and tags without creating another issue.",
      },
      {
        title: "Group related checks",
        text: "Create separate checklists for development, QA, and release readiness. The issue keeps its focus while the details stay organized and visible.",
      },
    ],
  },
  {
    slug: "release-readiness",
    category: "RELEASE PRACTICES",
    title: "Make the last mile of a release less stressful",
    description:
      "A practical approach to ownership, readiness, and final checks.",
    time: "6 min read",
    color: "peach",
    icon: Rocket,
    sections: [
      {
        title: "Build the sequence before release day",
        text: "Arrange verification steps in the order they need to happen. Keep preparation, release checks, and rollback readiness in distinct checklists so the sequence is readable.",
      },
      {
        title: "Make ownership explicit",
        text: "Assign each Checklist Item, add a due date where it matters, and use priority to highlight checks that need attention first. Filter by assignee during a handoff.",
      },
      {
        title: "Read progress in context",
        text: "Overall Progress includes shared Checklist Items marked Done or Skipped. A resolved percentage is a useful signal, not a substitute for understanding why something was skipped.",
      },
      {
        title: "Close the loop",
        text: "Resolve mandatory checks before completing and locking the checklist. Reopen deliberately if the scope changes or another verification pass is needed.",
      },
    ],
  },
];

export const faqs = [
  {
    question: "How is this different from Jira sub-tasks?",
    answer:
      "A Checklist Item is a lightweight execution step inside an existing issue. It can have a status, assignee, priority, due date, tags, and description, without adding another issue to your board. Sub-tasks are still useful for work that needs its own Jira workflow.",
  },
  {
    question: "What happens when a Mandatory Item is incomplete?",
    answer:
      "Checklist completion is blocked and the incomplete Mandatory Items are listed. “View incomplete items” takes you to the first unresolved item. This validates checklist completion, not Jira issue status transitions.",
  },
  {
    question: "Can teammates see my Personal Checklist?",
    answer:
      "No. A Personal Checklist is visible only to the person who created it. There is one per person, per issue, and its Checklist Items do not count toward the team’s Overall Progress.",
  },
  {
    question: "How is Overall Progress calculated?",
    answer:
      "It is the rounded percentage of shared Checklist Items with a Done or Skipped status. Personal Checklist Items are excluded. Searching and filtering do not change the underlying total.",
  },
  {
    question: "Can a completed checklist be edited?",
    answer:
      "Completing a checklist locks additions, edits, status changes, reordering, and deletion. An authorized person can confirm reopening to restore editing. Completion and reopening record the person and timestamp.",
  },
  {
    question: "Can I explore the product before contacting you?",
    answer:
      "Yes. The interactive demo lets you try Checklist Items, views, filters, bulk status changes, Personal Checklists, and the completion flow using sample data. It does not connect to your Jira site.",
  },
];
