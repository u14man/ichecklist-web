export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type BlogSource = {
  label: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  sections: BlogSection[];
  sources?: BlogSource[];
};

export const blogCategories = [
  {
    slug: "checklists",
    title: "Checklists",
    description: "How a checklist stays useful after the issue gets busy.",
    image: "/blog/checklists.png",
  },
  {
    slug: "jira-workflows",
    title: "Jira workflows",
    description: "Ways to keep the work inside the issue, not beside it.",
    image: "/blog/jira-workflows.png",
  },
  {
    slug: "release-readiness",
    title: "Release readiness",
    description: "What a team can see before it calls the work done.",
    image: "/blog/release-readiness.png",
  },
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "build-checklists-around-real-workflows",
    title: "Build a checklist around the work, not the template",
    excerpt: "A useful checklist fits the moment and the people doing the work. Start with the workflow, then write only the checks that help it move safely.",
    category: "Checklists",
    categorySlug: "checklists",
    author: "Lena Ortiz",
    role: "Product",
    date: "October 22, 2026",
    readTime: "6 min read",
    image: "/blog/checklists.png",
    sections: [
      {
        id: "start-with-the-work",
        title: "Start with the work",
        paragraphs: [
          "Templates are convenient, but they are not a substitute for understanding how a task actually happens. Watch the handoffs, tools, and decisions in the workflow before deciding what belongs on the list.",
          "The World Health Organization’s surgical safety checklist is a specialized clinical example: it is organized around key moments in an operating-room workflow, rather than presented as a generic collection of reminders. The transferable lesson is to place checks where the work can use them—not to reuse clinical steps in other settings.",
        ],
      },
      {
        id: "find-the-decision-points",
        title: "Find the decision points",
        paragraphs: [
          "Look for transitions where context changes or a missed step becomes costly: before a handoff, before a deployment, or before an issue is marked complete. Those moments are stronger anchors than arbitrary sections such as “miscellaneous.”",
          "For each checkpoint, ask what someone needs to know or confirm at that moment. If a check does not change a decision, prevent an omission, or help the next person continue, it may belong in documentation instead.",
        ],
      },
      {
        id: "test-in-the-real-context",
        title: "Test it in the real context",
        paragraphs: [
          "A checklist that reads clearly at a desk may be awkward on a busy shift or inside a crowded issue. Try it with the people who will use it, in the order they will use it, and notice where they stop to interpret a line.",
          "Revise based on observed friction. A small pilot catches missing owners, duplicated checks, and bad timing before a template becomes a permanent part of everyone’s day.",
        ],
      },
    ],
    sources: [{ label: "WHO Surgical Safety Checklist Implementation Manual", url: "https://iris.who.int/handle/10665/44186" }],
  },
  {
    slug: "write-checklist-items-that-can-be-verified",
    title: "Write checklist items someone can actually verify",
    excerpt: "Replace vague reminders with actions that have a clear owner, a visible outcome, and an unambiguous finish.",
    category: "Checklists",
    categorySlug: "checklists",
    author: "Samir Adeyemi",
    role: "Customer education",
    date: "October 20, 2026",
    readTime: "5 min read",
    image: "/blog/checklists.png",
    sections: [
      {
        id: "replace-vague-language",
        title: "Replace vague language",
        paragraphs: [
          "“Check the release” sounds like an action but leaves the important work unstated. Does the person review the notes, verify the build, confirm the rollback, or inspect a dashboard?",
          "Use a verb and a concrete object: “Run the smoke tests on the staging build” or “Attach the support handoff notes.” Specific wording helps two teammates reach the same interpretation without a follow-up conversation.",
        ],
      },
      {
        id: "define-done",
        title: "Define what done looks like",
        paragraphs: [
          "A check is easier to complete when the expected evidence is visible. “Confirm keyboard navigation” can be strengthened with a scope: “Verify tab order and focus visibility on the signup flow.”",
          "Not every item needs a document attached. Sometimes the outcome is a decision or a clear acknowledgment. The key is to make the completion condition explicit enough that the next person can trust it.",
        ],
      },
      {
        id: "keep-one-action-per-item",
        title: "Keep one action per item",
        paragraphs: [
          "A line that asks someone to review copy, test permissions, update documentation, and notify support is four tasks disguised as one. It is hard to assign, hard to estimate, and easy to partially complete.",
          "Split bundled work when different people or outcomes are involved. Keep related checks together only when they are performed as one deliberate step and share the same owner.",
        ],
      },
    ],
    sources: [{ label: "WHO Surgical Safety Checklist Implementation Manual", url: "https://iris.who.int/handle/10665/44186" }],
  },
  {
    slug: "checklists-as-team-conversations",
    title: "A checklist can be a team conversation, not a form",
    excerpt: "For work with handoffs, the value of a checklist is often in making people align at the right moment—not in collecting more ticks.",
    category: "Jira workflows",
    categorySlug: "jira-workflows",
    author: "Priya Nair",
    role: "Implementation",
    date: "October 18, 2026",
    readTime: "6 min read",
    image: "/blog/jira-workflows.png",
    sections: [
      {
        id: "make-the-handoff-visible",
        title: "Make the handoff visible",
        paragraphs: [
          "A checkbox can show that someone marked a step complete. It cannot always show whether the next person understood the result or knows what to do with it.",
          "When work crosses roles, write the checkpoint so the receiving person can respond: confirm the decision, acknowledge the handoff, or record a blocker. That small interaction helps expose a mismatch before it travels downstream.",
        ],
      },
      {
        id: "use-checkpoints-not-constant-interruption",
        title: "Use checkpoints, not constant interruption",
        paragraphs: [
          "Not every task needs a meeting. A team checkpoint is most useful at a real transition—before a risky change, after a review, or when responsibility moves to another role.",
          "The WHO checklist manual describes a clinical protocol built around team communication at defined phases. For software and operations teams, treat that as an example of timing and coordination, not as a process to copy literally.",
        ],
      },
      {
        id: "leave-a-readable-record",
        title: "Leave a readable record",
        paragraphs: [
          "After a conversation, capture the outcome where the work lives: what was confirmed, who owns the next action, and what remains blocked. That keeps the checklist useful to teammates who were not present.",
          "A list should support communication, not pretend to replace it. If the team repeatedly needs context that cannot fit in the item, link the relevant decision or note beside the check.",
        ],
      },
    ],
    sources: [{ label: "WHO Surgical Safety Checklist Implementation Manual", url: "https://iris.who.int/handle/10665/44186" }],
  },
  {
    slug: "release-checklist-after-deployment",
    title: "Your release checklist should continue after deployment",
    excerpt: "A release is not finished when code ships. Planning, readiness, rollout, support, and follow-up belong in the same view of the work.",
    category: "Release readiness",
    categorySlug: "release-readiness",
    author: "Lena Ortiz",
    role: "Product",
    date: "October 15, 2026",
    readTime: "6 min read",
    image: "/blog/release-readiness.png",
    sections: [
      {
        id: "plan-the-full-release",
        title: "Plan the full release",
        paragraphs: [
          "Teams often build a detailed pre-deploy checklist and stop there. But release work also includes communicating the change, watching the rollout, supporting users, and learning from what happened.",
          "Atlassian’s product release guide describes a lifecycle that includes planning, development and testing, deployment, and post-release follow-up. Use those phases as a starting point, then tailor each one to your release size and risk.",
        ],
      },
      {
        id: "make-readiness-specific",
        title: "Make readiness specific",
        paragraphs: [
          "“Ready to ship” is not a useful item unless the team agrees what readiness means. Name the observable checks: build validated, change owner identified, support notes available, and rollback path understood where applicable.",
          "Keep the list proportional. A small internal change may need only a few checks; a customer-facing migration may need explicit dependencies, communication, and recovery steps.",
        ],
      },
      {
        id: "add-aftercare",
        title: "Add aftercare to the plan",
        paragraphs: [
          "Give someone ownership of the first post-release review. Decide which signals to watch, where user feedback goes, and what condition would pause or reverse the rollout.",
          "Closing those items turns the release into a learning loop. The next checklist can reflect real incidents and recurring questions instead of growing from speculation alone.",
        ],
      },
    ],
    sources: [{ label: "Atlassian Product release guide", url: "https://www.atlassian.com/agile/product-management/product-release" }],
  },
  {
    slug: "testing-checklist-across-test-levels",
    title: "Build a testing checklist across the right test levels",
    excerpt: "A strong test checklist balances fast automated checks with focused end-to-end and exploratory testing for high-risk user journeys.",
    category: "Release readiness",
    categorySlug: "release-readiness",
    author: "Priya Nair",
    role: "Implementation",
    date: "October 12, 2026",
    readTime: "7 min read",
    image: "/blog/release-readiness.png",
    sections: [
      {
        id: "choose-tests-by-purpose",
        title: "Choose tests by purpose",
        paragraphs: [
          "Different tests answer different questions. Unit checks focus on small pieces, integration checks exercise connections, and end-to-end checks follow a complete user journey.",
          "Atlassian’s overview of software testing also describes acceptance, performance, smoke, and exploratory testing. A checklist should name the purpose of each check so “tested” does not conceal important gaps.",
        ],
      },
      {
        id: "automate-the-repeatable",
        title: "Automate the repeatable",
        paragraphs: [
          "Automated tests are useful for checks teams need to repeat frequently, especially when code changes. They provide fast feedback when their scope is clear and the expected outcome is stable.",
          "Manual exploratory sessions still matter for questions that are harder to script: confusing behavior, unexpected combinations, and usability details. Give those sessions a focused area and a time box rather than a vague instruction to “click around.”",
        ],
      },
      {
        id: "prioritize-by-risk",
        title: "Prioritize by risk and impact",
        paragraphs: [
          "A checklist cannot prove that every possible bug is absent. It can help a team spend attention where failure would matter most: critical paths, recently changed behavior, integrations, and recovery flows.",
          "After a defect is found, add a regression check when it can prevent the same failure from returning. Keep the suite readable and remove checks that no longer protect a meaningful behavior.",
        ],
      },
    ],
    sources: [{ label: "Atlassian: The different types of software testing", url: "https://www.atlassian.com/continuous-delivery/software-testing/types-of-software-testing" }],
  },
  {
    slug: "pilot-a-checklist-before-scaling",
    title: "Pilot a checklist before you roll it out to everyone",
    excerpt: "A short trial can reveal missing context, awkward timing, and unclear ownership before a checklist becomes another ignored template.",
    category: "Checklists",
    categorySlug: "checklists",
    author: "Samir Adeyemi",
    role: "Customer education",
    date: "October 9, 2026",
    readTime: "5 min read",
    image: "/blog/checklists.png",
    sections: [
      {
        id: "start-with-a-small-group",
        title: "Start with a small group",
        paragraphs: [
          "A draft checklist looks complete to the person who wrote it because that person already knows the missing context. A small pilot puts it in front of people who approach the work differently.",
          "Choose a representative workflow and a few intended users. Ask them to use the draft during real work, not just review it in a meeting. Notice where they pause, skip a line, or ask what an item means.",
        ],
      },
      {
        id: "collect-friction-not-opinions-only",
        title: "Collect friction, not opinions only",
        paragraphs: [
          "“Looks good” is a weak success signal. Track practical evidence: which items were misunderstood, which checks duplicated another control, and whether the checklist appeared at the right point in the workflow.",
          "WHO’s implementation manual recommends adapting its clinical checklist to local settings and building support with the people who use it. That principle applies broadly, while the medical content itself must remain within qualified clinical guidance.",
        ],
      },
      {
        id: "revise-and-review-again",
        title: "Revise, then review again",
        paragraphs: [
          "Remove low-value items, clarify ambiguous verbs, and add only the missing checks the pilot exposed. If the list becomes long, split it by phase or role instead of shrinking the type until it is hard to use.",
          "After rollout, set a point to revisit the checklist. Work changes, tools change, and old checks can become noise. A lightweight review keeps the list aligned with how the team actually operates.",
        ],
      },
    ],
    sources: [{ label: "WHO Surgical Safety Checklist Implementation Manual", url: "https://iris.who.int/handle/10665/44186" }],
  },
  {
    slug: "checklist-that-stays-in-the-issue",
    title: "A checklist that stays inside the issue",
    excerpt: "The useful checklist is the one a teammate can finish without opening another tool or reconstructing the plan from comments.",
    category: "Checklists",
    categorySlug: "checklists",
    author: "Lena Ortiz",
    role: "Product",
    date: "October 8, 2026",
    readTime: "6 min read",
    image: "/blog/checklists.png",
    featured: true,
    sections: [
      {
        id: "where-the-list-lives",
        title: "Where the list lives",
        paragraphs: [
          "A release note in a document and a definition of done in a comment are easy to write once. They are harder to trust a month later, when the issue has moved and the person who wrote the note is in another meeting.",
          "Keeping the checklist on the issue does not make the work smaller. It makes the next action visible in the same place the status, assignee, and discussion already live.",
        ],
      },
      {
        id: "separate-the-shared-work",
        title: "Separate the shared work",
        paragraphs: [
          "Some items belong to the issue: the migration step, the review, the note for support. Other items belong to one person: a reminder to update a local config, or a question to ask before signing off.",
          "Mixing those two lists makes both of them noisy. A shared checklist should describe the work. A personal checklist should describe what one person still needs to remember.",
        ],
      },
      {
        id: "progress-without-a-meeting",
        title: "Progress without a meeting",
        paragraphs: [
          "A percentage is only useful if someone can see which items produced it. Three of eight is a better status than a comment that says the issue is almost ready.",
          "When the count sits on the issue, a lead can scan a board without asking each owner to retell the same update.",
        ],
      },
      {
        id: "leave-a-record",
        title: "Leave a record",
        paragraphs: [
          "The checklist is also a record of what the team agreed to check. That matters when a similar issue comes back, or when someone new joins halfway through.",
          "A finished list should still be readable. Locking it after completion keeps the record from drifting into a second, unofficial plan.",
        ],
      },
    ],
  },
  {
    slug: "personal-lists-for-shared-issues",
    title: "Personal lists for work that is still shared",
    excerpt: "A private reminder can sit on a shared issue without turning the team's checklist into one person's notebook.",
    category: "Checklists",
    categorySlug: "checklists",
    author: "Samir Adeyemi",
    role: "Customer education",
    date: "September 24, 2026",
    featured: true,
    readTime: "5 min read",
    image: "/blog/checklists.png",
    sections: [
      {
        id: "two-kinds-of-memory",
        title: "Two kinds of memory",
        paragraphs: [
          "Teams remember decisions. People remember the small things those decisions created: a credential to rotate, a screenshot to attach, a question for the next standup.",
          "Those reminders are real work, but they do not belong in a list every watcher has to read.",
        ],
      },
      {
        id: "keep-the-shared-list-short",
        title: "Keep the shared list short",
        paragraphs: [
          "A shared checklist gets ignored when it collects private notes. The fix is not a longer template. It is a second list that only the owner sees.",
          "The shared list can then stay limited to items the team actually needs to complete together.",
        ],
      },
      {
        id: "handoffs",
        title: "Handoffs stay cleaner",
        paragraphs: [
          "When an issue changes owner, the shared checklist should still make sense. Personal notes can move with the person, or be rewritten for the new owner, without rewriting the team's plan.",
          "That separation is especially useful on long issues, where several people touch the work without owning all of it.",
        ],
      },
      {
        id: "what-to-write",
        title: "What belongs on each list",
        paragraphs: [
          "Put an item on the shared list if another person could reasonably complete it or would be blocked by it. Put it on the personal list if only you need the reminder.",
          "If you are unsure, start personal. Promoting an item is easier than asking a team to ignore one.",
        ],
      },
    ],
  },
  {
    slug: "mandatory-items-without-a-stall",
    title: "Mandatory items without stalling the issue",
    excerpt: "A required check should stop a premature completion, not stop people from doing the rest of the work.",
    category: "Jira workflows",
    categorySlug: "jira-workflows",
    author: "Priya Nair",
    role: "Implementation",
    date: "September 11, 2026",
    featured: true,
    readTime: "6 min read",
    image: "/blog/jira-workflows.png",
    sections: [
      {
        id: "required-is-not-first",
        title: "Required is not the same as first",
        paragraphs: [
          "Some checks can only happen near the end: a security review, a changelog line, a confirmation from support. Marking them mandatory does not mean the team should wait to start everything else.",
          "The point of a mandatory item is the moment someone tries to call the issue done. Until then, it is a visible obligation, not a lock on the rest of the list.",
        ],
      },
      {
        id: "name-the-check",
        title: "Name the check, not the anxiety",
        paragraphs: [
          "“Make sure this is fine” is not a mandatory item. “Confirm the rollback step is written” is. A required item should tell the next person exactly what evidence closes it.",
          "Vague requirements get checked early just to clear the warning. Specific ones get checked when the work is actually ready.",
        ],
      },
      {
        id: "who-can-close-it",
        title: "Decide who can close it",
        paragraphs: [
          "If anyone can tick a mandatory item, the rule is only a reminder. If only the reviewer can, the rule is part of the handoff. Both can be valid. They should not be accidental.",
          "Write that expectation into the item title when it is not obvious. “QA confirms the repro is gone” is clearer than “Verify.”",
        ],
      },
      {
        id: "use-them-sparingly",
        title: "Use them sparingly",
        paragraphs: [
          "A list where everything is mandatory is a list where nothing is. Keep the required set to the checks that would make a completed issue unsafe or incomplete.",
          "The other items can still matter. They just should not block completion when the team has consciously chosen to defer them.",
        ],
      },
    ],
  },
  {
    slug: "filters-for-a-crowded-issue",
    title: "Filters for a crowded issue",
    excerpt: "A long checklist is easier to finish when you can see your items, the open items, or the ones that still block completion.",
    category: "Jira workflows",
    categorySlug: "jira-workflows",
    author: "Lena Ortiz",
    role: "Product",
    date: "August 27, 2026",
    readTime: "5 min read",
    image: "/blog/jira-workflows.png",
    sections: [
      {
        id: "length-is-not-the-problem",
        title: "Length is not the problem",
        paragraphs: [
          "Some issues really do have twenty checks. Hiding them in sub-tasks does not reduce the number. It only moves the scrolling to another view.",
          "What people need is a way to look at one slice: mine, still open, or required before completion.",
        ],
      },
      {
        id: "views-for-different-jobs",
        title: "Views for different jobs",
        paragraphs: [
          "The assignee wants the next unchecked item. The reviewer wants the mandatory items. The reporter wants to know whether the list has started at all.",
          "Those are different questions. A single flat list answers all of them badly. A filter answers one of them quickly and leaves the full list intact.",
        ],
      },
      {
        id: "do-not-filter-away-context",
        title: "Do not filter away the context",
        paragraphs: [
          "A filter should change what is emphasized, not what exists. The count of remaining items still needs to include the ones currently hidden.",
          "Otherwise a person can clear their own view and believe the issue is done.",
        ],
      },
      {
        id: "start-with-three",
        title: "Start with three filters",
        paragraphs: [
          "Open, mine, and mandatory cover most of a working day. Add another filter only after the same search keeps happening.",
          "A checklist with twelve saved views is another system to learn. Three obvious ones are enough to make a long list usable.",
        ],
      },
    ],
  },
  {
    slug: "what-ready-to-release-means",
    title: "What ready to release actually means",
    excerpt: "A release is ready when the remaining checks are visible, owned, and small enough to finish before the window closes.",
    category: "Release readiness",
    categorySlug: "release-readiness",
    author: "Priya Nair",
    role: "Implementation",
    date: "August 12, 2026",
    readTime: "7 min read",
    image: "/blog/release-readiness.png",
    sections: [
      {
        id: "ready-is-a-list",
        title: "Ready is a list, not a feeling",
        paragraphs: [
          "“Looks good” is not a release state. It usually means nobody has found the unchecked item yet. A readiness list names the checks that still stand between the build and the window.",
          "The list can be short. It cannot be implied. If the team cannot point to the remaining items, it cannot tell whether the release is close or merely quiet.",
        ],
      },
      {
        id: "separate-blockers",
        title: "Separate blockers from nice-to-haves",
        paragraphs: [
          "A missing rollback note and a missing screenshot for the announcement are not the same kind of gap. One can stop the release. The other can follow it.",
          "Mandatory items are a practical way to make that difference visible without creating a second status field.",
        ],
      },
      {
        id: "across-issues",
        title: "Look across the issues",
        paragraphs: [
          "A single issue can look finished while the release still has three open checks elsewhere. A dashboard is useful here because the question is no longer “is this issue done?” It is “which issues still hold the release?”",
          "That view should be boring. Issue, owner, remaining items. Anything more decorative gets ignored at the moment it is needed.",
        ],
      },
      {
        id: "after-the-window",
        title: "After the window",
        paragraphs: [
          "Once the release ships, the checklist is evidence. Locking a completed list keeps a later edit from rewriting what the team actually checked.",
          "If something was skipped, leave it unchecked and note why. A clean list that hides an exception is less useful than an honest one.",
        ],
      },
    ],
  },
  {
    slug: "lock-the-list-after-completion",
    title: "Lock the list after the work is done",
    excerpt: "A completed checklist should stay readable. Later edits belong in a new issue, not in a quiet rewrite of the record.",
    category: "Release readiness",
    categorySlug: "release-readiness",
    author: "Samir Adeyemi",
    role: "Customer education",
    date: "July 30, 2026",
    readTime: "5 min read",
    image: "/blog/release-readiness.png",
    sections: [
      {
        id: "completion-is-a-moment",
        title: "Completion is a moment",
        paragraphs: [
          "An issue can be reopened. A checklist can be copied. But the moment a team says the checks are done should still be recoverable.",
          "Without a lock, the list keeps accepting small edits. A week later it describes the current preference, not the check that actually happened.",
        ],
      },
      {
        id: "what-locking-protects",
        title: "What locking protects",
        paragraphs: [
          "It protects the order of the checks, the items that were mandatory, and the fact that they were completed. It does not prevent a new checklist on a follow-up issue.",
          "That distinction matters. Locking is not a way to freeze the product. It is a way to stop the record from being used as a scratch pad.",
        ],
      },
      {
        id: "when-to-unlock",
        title: "When an unlock is reasonable",
        paragraphs: [
          "A mistaken tick, found the same day, is a correction. A new requirement found next week is a new item, usually on a new issue.",
          "If the team unlocks often, the completion rule is probably unclear. The fix is a better definition of done, not a permanently editable list.",
        ],
      },
      {
        id: "tell-people-it-is-locked",
        title: "Tell people it is locked",
        paragraphs: [
          "A lock that looks like a broken checkbox creates support tickets. The issue should say the list is complete and locked, and where a follow-up belongs.",
          "People accept a closed record when the reason is visible. They work around one when it looks accidental.",
        ],
      },
    ],
  },
];

export function postsInCategory(slug?: string) {
  return slug ? blogPosts.filter((post) => post.categorySlug === slug) : blogPosts;
}
