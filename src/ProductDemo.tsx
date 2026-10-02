import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Columns3,
  GripVertical,
  LayoutDashboard,
  LayoutList,
  ListFilter,
  LockKeyhole,
  Moon,
  MoreHorizontal,
  MousePointer2,
  PanelsTopLeft,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import { Modal } from "./components";

type Status = "To Do" | "In Progress" | "Done" | "Skipped";
type Item = {
  id: number;
  name: string;
  status: Status;
  checklist: string;
  mandatory: boolean;
  assignee: string;
  priority: string;
  due: string;
  description?: string;
};
const seed: Item[] = [
  {
    id: 1,
    name: "Review acceptance criteria",
    status: "Done",
    checklist: "Development",
    mandatory: true,
    assignee: "JD",
    priority: "High",
    due: "Today",
  },
  {
    id: 2,
    name: "Cover the edge cases",
    status: "Done",
    checklist: "Development",
    mandatory: false,
    assignee: "AL",
    priority: "Medium",
    due: "Today",
  },
  {
    id: 3,
    name: "Write unit tests",
    status: "Done",
    checklist: "Development",
    mandatory: true,
    assignee: "JD",
    priority: "High",
    due: "Today",
  },
  {
    id: 4,
    name: "Check accessibility",
    status: "In Progress",
    checklist: "Development",
    mandatory: true,
    assignee: "MK",
    priority: "High",
    due: "Tomorrow",
  },
  {
    id: 5,
    name: "Prepare the pull request",
    status: "To Do",
    checklist: "Development",
    mandatory: false,
    assignee: "AL",
    priority: "Medium",
    due: "Tomorrow",
  },
  {
    id: 6,
    name: "Verify the happy path",
    status: "Done",
    checklist: "Release QA",
    mandatory: true,
    assignee: "MK",
    priority: "High",
    due: "Today",
  },
  {
    id: 7,
    name: "Retest the reported defect",
    status: "Done",
    checklist: "Release QA",
    mandatory: false,
    assignee: "MK",
    priority: "Medium",
    due: "Today",
  },
  {
    id: 8,
    name: "Complete regression checks",
    status: "To Do",
    checklist: "Release QA",
    mandatory: true,
    assignee: "JD",
    priority: "High",
    due: "Tomorrow",
  },
  {
    id: 9,
    name: "Confirm monitoring is ready",
    status: "Done",
    checklist: "Release",
    mandatory: true,
    assignee: "AL",
    priority: "High",
    due: "Today",
  },
  {
    id: 10,
    name: "Review the rollback procedure",
    status: "To Do",
    checklist: "Release",
    mandatory: false,
    assignee: "JD",
    priority: "Medium",
    due: "Tomorrow",
  },
  {
    id: 11,
    name: "Revisit the empty state idea",
    status: "To Do",
    checklist: "Personal",
    mandatory: false,
    assignee: "JD",
    priority: "Medium",
    due: "Today",
  },
  {
    id: 12,
    name: "Read through my debugging notes",
    status: "Done",
    checklist: "Personal",
    mandatory: false,
    assignee: "JD",
    priority: "Low",
    due: "Tomorrow",
  },
];
const statuses: Status[] = ["To Do", "In Progress", "Done", "Skipped"];
const resolved = (item: Item) =>
  item.status === "Done" || item.status === "Skipped";

export default function ProductDemo({
  expanded = false,
}: {
  expanded?: boolean;
}) {
  const [items, setItems] = useState<Item[]>(() =>
    seed.map((item) => ({ ...item })),
  );
  const [tab, setTab] = useState("Development");
  const [view, setView] = useState<"tabs" | "list">("tabs");
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filter, setFilter] = useState("All statuses");
  const [mine, setMine] = useState(false);
  const [bulk, setBulk] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [completedAt, setCompletedAt] = useState("");
  const [dialog, setDialog] = useState<
    "gate" | "complete" | "reopen" | "delete" | "edit" | null
  >(null);
  const [editing, setEditing] = useState<Item | null>(null);
  const [newName, setNewName] = useState("");
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [columns, setColumns] = useState({
    status: true,
    priority: true,
    assignee: true,
  });
  const [sort, setSort] = useState("default");
  const [notice, setNotice] = useState("");
  const id = useId();
  const nextId = useRef(20);
  const dragId = useRef<number | null>(null);
  const closeDialog = useCallback(() => {
    setDialog(null);
    setEditing(null);
  }, []);
  const checklistNames = ["Development", "Release QA", "Release", "Personal"];
  const shared = items.filter((item) => item.checklist !== "Personal");
  const done = shared.filter(resolved).length;
  const percent = shared.length ? Math.round((done / shared.length) * 100) : 0;
  const incomplete = shared.filter((item) => item.mandatory && !resolved(item));
  const visible = useMemo(() => {
    const result = items.filter(
      (item) =>
        (view === "list" || item.checklist === tab) &&
        (!query ||
          `${item.name} ${item.description || ""}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (filter === "All statuses" || item.status === filter) &&
        (!mine || item.assignee === "JD"),
    );
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "status")
      result.sort(
        (a, b) => statuses.indexOf(a.status) - statuses.indexOf(b.status),
      );
    if (sort === "priority") {
      const priorities = ["Highest", "High", "Medium", "Low", "Lowest"];
      result.sort(
        (a, b) =>
          priorities.indexOf(a.priority) - priorities.indexOf(b.priority),
      );
    }
    return result;
  }, [items, tab, view, query, filter, mine, sort]);
  useEffect(() => {
    setSelected([]);
  }, [tab, view, query, filter, mine]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  const update = (itemId: number, patch: Partial<Item>) => {
    if (!locked)
      setItems((previous) =>
        previous.map((item) =>
          item.id === itemId ? { ...item, ...patch } : item,
        ),
      );
  };
  const reset = () => {
    setItems(seed.map((item) => ({ ...item })));
    setLocked(false);
    setCompletedAt("");
    setBulk(false);
    setSelected([]);
    setQuery("");
    setSearchOpen(false);
    setFilter("All statuses");
    setMine(false);
    setTab("Development");
    setView("tabs");
    setSort("default");
    setNotice("Sample checklist reset. Make yourself at home.");
  };
  const addItem = (event: FormEvent) => {
    event.preventDefault();
    if (!newName.trim() || locked) return;
    setItems((previous) => [
      ...previous,
      {
        id: nextId.current++,
        name: newName.trim(),
        status: "To Do",
        checklist: tab,
        mandatory: false,
        assignee: "JD",
        priority: "Medium",
        due: "Tomorrow",
      },
    ]);
    setNewName("");
    setQuery("");
    setFilter("All statuses");
    setNotice("Checklist Item added.");
  };
  const bulkStatus = (status: Status) => {
    if (locked || !selected.length) return;
    setItems((previous) =>
      previous.map((item) =>
        selected.includes(item.id) ? { ...item, status } : item,
      ),
    );
    setNotice(`${selected.length} Checklist Items updated.`);
    setSelected([]);
  };
  const drop = (target: Item) => {
    if (locked || sort !== "default" || dragId.current === null) return;
    setItems((previous) => {
      const source = previous.find((item) => item.id === dragId.current);
      if (!source || source.checklist !== target.checklist) return previous;
      const result = previous.filter((item) => item.id !== source.id);
      result.splice(
        result.findIndex((item) => item.id === target.id),
        0,
        source,
      );
      return result;
    });
    dragId.current = null;
  };
  const focusIncomplete = () => {
    const item = incomplete[0];
    closeDialog();
    setTab(item.checklist);
    setView("tabs");
    setQuery("");
    setFilter("All statuses");
    setMine(false);
    setTimeout(() => {
      const element = document.getElementById(`${id}-item-${item.id}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      element?.focus();
    }, 100);
  };
  const renderItem = (item: Item) => (
    <div
      className={`demo-item ${resolved(item) ? "is-done" : ""} ${selected.includes(item.id) ? "is-selected" : ""}`}
      key={item.id}
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => drop(item)}
    >
      <span
        className={`drag-handle ${locked ? "disabled" : ""}`}
        draggable={!locked && sort === "default"}
        onDragStart={() => {
          dragId.current = item.id;
        }}
        title="Drag to reorder"
      >
        <GripVertical size={13} />
      </span>
      <input
        id={`${id}-item-${item.id}`}
        className="item-checkbox"
        type="checkbox"
        checked={bulk ? selected.includes(item.id) : resolved(item)}
        disabled={locked}
        aria-label={bulk ? `Select ${item.name}` : `Complete ${item.name}`}
        onChange={() =>
          bulk
            ? setSelected((previous) =>
                previous.includes(item.id)
                  ? previous.filter((value) => value !== item.id)
                  : [...previous, item.id],
              )
            : update(item.id, { status: resolved(item) ? "To Do" : "Done" })
        }
      />
      <button
        className="item-name"
        disabled={locked}
        onClick={() => {
          setEditing({ ...item });
          setDialog("edit");
        }}
      >
        {item.name}
        {item.mandatory && (
          <span className="mandatory-star" aria-label="Mandatory Item">
            *
          </span>
        )}
      </button>
      {columns.status && (
        <select
          aria-label={`Status for ${item.name}`}
          className={`status-select status-${item.status.toLowerCase().replace(" ", "-")}`}
          disabled={locked}
          value={item.status}
          onChange={(event) =>
            update(item.id, { status: event.target.value as Status })
          }
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      )}
      {columns.priority && (
        <select
          className={`priority-select ${item.priority === "High" || item.priority === "Highest" ? "high" : ""}`}
          aria-label={`Priority for ${item.name}`}
          value={item.priority}
          disabled={locked}
          onChange={(event) =>
            update(item.id, { priority: event.target.value })
          }
        >
          {["Highest", "High", "Medium", "Low", "Lowest"].map((priority) => (
            <option key={priority} value={priority}>
              {priority === "High" || priority === "Highest"
                ? "↑"
                : priority === "Medium"
                  ? "＝"
                  : "↓"}{" "}
              {priority}
            </option>
          ))}
        </select>
      )}
      {columns.assignee && (
        <select
          className={`assignee-select avatar-${item.assignee.toLowerCase()}`}
          aria-label={`Assignee for ${item.name}`}
          value={item.assignee}
          disabled={locked || item.checklist === "Personal"}
          onChange={(event) =>
            update(item.id, { assignee: event.target.value })
          }
        >
          <option value="JD">JD</option>
          <option value="AL">AL</option>
          <option value="MK">MK</option>
        </select>
      )}
    </div>
  );
  return (
    <div
      className={`product-demo ${expanded ? "expanded" : ""} ${dark ? "demo-dark" : ""}`}
    >
      <div className="browser-bar">
        <div className="traffic-lights">
          <i />
          <i />
          <i />
        </div>
        <span>
          <LockKeyhole size={10} />
          Your Jira workspace
          <span className="browser-path"> / issue / PLAT-128</span>
        </span>
        <button
          className="demo-icon-button"
          onClick={() => setDark(!dark)}
          aria-label={
            dark ? "Switch demo to light mode" : "Switch demo to dark mode"
          }
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
      <div className="jira-app">
        <aside className="jira-sidebar">
          <div className="jira-wordmark">
            <span className="jira-diamond" />
            Jira
          </div>
          <div className="demo-project">
            <span>P</span>
            <div>
              <strong>Platform</strong>
              <small>Software project</small>
            </div>
            <ChevronDown size={12} />
          </div>
          <span className="sidebar-caption">PLANNING</span>
          <div className="sidebar-line">
            <LayoutDashboard size={15} />
            Board
          </div>
          <div className="sidebar-line">
            <LayoutList size={15} />
            Backlog
          </div>
          <div className="sidebar-line selected">
            <PanelsTopLeft size={15} />
            Issues<span>12</span>
          </div>
          <div className="sidebar-divider" />
          <div className="sidebar-line">
            <Settings2 size={15} />
            Project settings
          </div>
          <div className="sidebar-bottom">
            <span className="avatar avatar-purple">JD</span>
            <span>
              Jamie Davis<small>Sample workspace</small>
            </span>
          </div>
        </aside>
        <div className="jira-main">
          <div className="issue-breadcrumb">
            Platform
            <ChevronRight size={11} />
            PLAT-128
            <span className="issue-ellipsis">
              <MoreHorizontal size={19} />
            </span>
          </div>
          <h3 className="issue-title">A smoother onboarding experience</h3>
          <div className="issue-meta">
            <span className="issue-in-progress">
              In progress
              <ChevronDown size={10} />
            </span>
            <span>
              <span className="tiny-avatar">JD</span>Jamie Davis
            </span>
            <span className="issue-sprint">Sprint 24</span>
          </div>
          <div className="issue-tabs">
            <span>Overview</span>
            <span className="active">
              <CheckCheck size={13} />
              Checklist
            </span>
            <span>Activity</span>
          </div>
          <div className="checklist-panel">
            <div className="checklist-heading">
              <h4>
                <CheckCheck size={18} />
                Checklist
              </h4>
              <div className="checklist-heading-actions">
                <span className="demo-sample">Interactive preview</span>
                <button
                  className="demo-icon-button"
                  onClick={reset}
                  aria-label="Reset demo"
                  title="Reset demo"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
            {locked && (
              <div className="demo-locked-banner">
                <CircleCheck size={17} />
                <span>
                  <strong>Checklist completed</strong>
                  <small>Jamie Davis · {completedAt}</small>
                </span>
                <LockKeyhole size={16} />
              </div>
            )}
            <div className="overall-progress">
              <div>
                <span>Overall Progress</span>
                <strong aria-live="polite">
                  {done}
                  <span>/{shared.length} completed</span>
                  <b>{percent}%</b>
                </strong>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Overall Progress"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${percent}%` }} />
              </div>
            </div>
            <div className="demo-toolbar">
              <div className="demo-toolbar-left">
                {searchOpen ? (
                  <label className="demo-search">
                    <Search size={13} />
                    <input
                      autoFocus
                      placeholder="Find a Checklist Item…"
                      aria-label="Search Checklist Items"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          setQuery("");
                          setSearchOpen(false);
                        }
                      }}
                    />
                    <button
                      className="demo-icon-button"
                      aria-label="Close search"
                      onClick={() => {
                        setQuery("");
                        setSearchOpen(false);
                      }}
                    >
                      <X size={12} />
                    </button>
                  </label>
                ) : (
                  <button
                    className="demo-tool"
                    onClick={() => setSearchOpen(true)}
                  >
                    <Search size={14} />
                    <span>Search</span>
                  </button>
                )}
                <label className="demo-filter">
                  <ListFilter size={14} />
                  <select
                    aria-label="Filter by status"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                  >
                    <option>All statuses</option>
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
                {expanded && (
                  <button
                    className={`demo-tool ${mine ? "active" : ""}`}
                    onClick={() => setMine(!mine)}
                    aria-pressed={mine}
                  >
                    My items
                  </button>
                )}
              </div>
              <div className="demo-toolbar-right">
                <button
                  className={`demo-icon-button ${bulk ? "active" : ""}`}
                  disabled={locked}
                  onClick={() => {
                    setBulk(!bulk);
                    setSelected([]);
                  }}
                  aria-label="Toggle bulk edit"
                  title="Bulk edit"
                  aria-pressed={bulk}
                >
                  <MousePointer2 size={14} />
                </button>
                <div className="columns-control">
                  <button
                    className={`demo-icon-button ${columnsOpen ? "active" : ""}`}
                    onClick={() => setColumnsOpen(!columnsOpen)}
                    aria-label="Configure columns"
                    aria-expanded={columnsOpen}
                  >
                    <Columns3 size={14} />
                  </button>
                  {columnsOpen && (
                    <div className="columns-popover">
                      <strong>Visible columns</strong>
                      {(["status", "priority", "assignee"] as const).map(
                        (column) => (
                          <label key={column}>
                            <input
                              type="checkbox"
                              checked={columns[column]}
                              onChange={() =>
                                setColumns((previous) => ({
                                  ...previous,
                                  [column]: !previous[column],
                                }))
                              }
                            />
                            {column}
                          </label>
                        ),
                      )}
                      <button onClick={() => setColumnsOpen(false)}>
                        Done
                      </button>
                    </div>
                  )}
                </div>
                <div className="view-toggle">
                  <button
                    aria-label="Tab view"
                    aria-pressed={view === "tabs"}
                    className={view === "tabs" ? "active" : ""}
                    onClick={() => setView("tabs")}
                  >
                    <PanelsTopLeft size={14} />
                  </button>
                  <button
                    aria-label="List view"
                    aria-pressed={view === "list"}
                    className={view === "list" ? "active" : ""}
                    onClick={() => setView("list")}
                  >
                    <LayoutList size={14} />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="checklist-tabs"
              role="tablist"
              aria-label="Checklists"
            >
              {checklistNames.map((name) => (
                <button
                  role="tab"
                  aria-selected={tab === name}
                  key={name}
                  className={tab === name ? "active" : ""}
                  onClick={() => {
                    setTab(name);
                    if (view === "list") setView("tabs");
                  }}
                >
                  {name === "Personal" && <LockKeyhole size={11} />}
                  {name}
                  <span>
                    {
                      items.filter(
                        (item) => item.checklist === name && resolved(item),
                      ).length
                    }
                    /{items.filter((item) => item.checklist === name).length}
                  </span>
                </button>
              ))}
            </div>
            {tab === "Personal" && view === "tabs" && (
              <div className="personal-note">
                <LockKeyhole size={12} />
                Only you can see this. Not included in Overall Progress.
              </div>
            )}
            {bulk && (
              <div className="bulk-toolbar">
                <label>
                  <input
                    aria-label="Select all visible items"
                    type="checkbox"
                    checked={
                      visible.length > 0 &&
                      visible.every((item) => selected.includes(item.id))
                    }
                    onChange={(event) =>
                      setSelected(
                        event.target.checked
                          ? visible.map((item) => item.id)
                          : [],
                      )
                    }
                  />
                  {selected.length} selected
                </label>
                <select
                  aria-label="Bulk status"
                  value=""
                  disabled={!selected.length}
                  onChange={(event) => bulkStatus(event.target.value as Status)}
                >
                  <option value="" disabled>
                    Set status
                  </option>
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
                <button
                  disabled={!selected.length}
                  onClick={() => setDialog("delete")}
                >
                  Delete
                </button>
                <button
                  aria-label="Exit bulk edit"
                  onClick={() => {
                    setBulk(false);
                    setSelected([]);
                  }}
                >
                  <X size={13} />
                </button>
              </div>
            )}
            {expanded && (
              <div className="demo-sort-row">
                <span>{visible.length} Checklist Items</span>
                <label>
                  Sort by{" "}
                  <select
                    aria-label="Sort Checklist Items"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="default">Custom order</option>
                    <option value="name">Name</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                  </select>
                </label>
              </div>
            )}
            <div className="demo-items">
              {visible.length === 0 ? (
                <div className="demo-empty">
                  <Search size={20} />
                  <strong>No matching Checklist Items</strong>
                  <button
                    onClick={() => {
                      setQuery("");
                      setFilter("All statuses");
                      setMine(false);
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : view === "list" ? (
                checklistNames.map((name) => {
                  const group = visible.filter(
                    (item) => item.checklist === name,
                  );
                  return group.length ? (
                    <div key={name}>
                      <div className="list-group-label">
                        {name === "Personal" ? (
                          <LockKeyhole size={12} />
                        ) : (
                          <ChevronDown size={12} />
                        )}
                        {name}
                        {name === "Personal" && (
                          <small>Only you · excluded from progress</small>
                        )}
                      </div>
                      {group.map(renderItem)}
                    </div>
                  ) : null;
                })
              ) : (
                visible.map(renderItem)
              )}
            </div>
            <form className="inline-add" onSubmit={addItem}>
              <Plus size={15} />
              <input
                aria-label="New Checklist Item"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                disabled={locked}
                maxLength={255}
                placeholder={
                  locked
                    ? "Reopen the checklist to make changes"
                    : `Add a Checklist Item${view === "list" ? ` to ${tab}` : ""}…`
                }
                onKeyDown={(event) => {
                  if (event.key === "Escape") setNewName("");
                }}
              />
              {newName ? (
                <button type="submit">
                  Add
                  <ChevronRight size={12} />
                </button>
              ) : (
                <span className="keycap">↵</span>
              )}
            </form>
            <div className="demo-panel-footer">
              <span>
                <ShieldCheck size={12} />
                {locked
                  ? "The details are protected."
                  : "The little details make the difference."}
              </span>
              <button
                className="complete-button"
                onClick={() =>
                  setDialog(
                    locked ? "reopen" : incomplete.length ? "gate" : "complete",
                  )
                }
              >
                {locked ? <RotateCcw size={13} /> : <CheckCheck size={14} />}
                {locked ? "Reopen checklist" : "Complete checklist"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {notice && (
        <div className="demo-toast" role="status">
          <CircleCheck size={16} />
          {notice}
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={14} />
          </button>
        </div>
      )}
      {dialog && (
        <Modal
          title={
            dialog === "gate"
              ? "A few important details remain"
              : dialog === "complete"
                ? "All set to complete?"
                : dialog === "reopen"
                  ? "Make room for another pass?"
                  : dialog === "delete"
                    ? "Delete selected Checklist Items?"
                    : "Edit Checklist Item"
          }
          onClose={closeDialog}
        >
          {dialog === "gate" && (
            <>
              <div className="modal-feature-icon mint">
                <ShieldCheck size={26} />
              </div>
              <p>
                {incomplete.length} Mandatory Items are not completed. Resolve
                these before completing and locking the checklist.
              </p>
              <ul className="incomplete-list">
                {incomplete.map((item) => (
                  <li key={item.id}>
                    <span className="mandatory-star">*</span>
                    {item.name}
                    <small>{item.checklist}</small>
                  </li>
                ))}
              </ul>
              <div className="modal-actions">
                <button className="button button-outline" onClick={closeDialog}>
                  Keep working
                </button>
                <button
                  className="button button-primary"
                  onClick={focusIncomplete}
                >
                  View incomplete items
                  <ArrowIcon />
                </button>
              </div>
            </>
          )}
          {dialog === "complete" && (
            <>
              <div className="modal-feature-icon lavender">
                <LockKeyhole size={26} />
              </div>
              <p>
                Completing this checklist makes all Checklist Items read-only.
                Additions, edits, status changes, and reordering will be locked
                until you reopen it.
              </p>
              <div className="modal-actions">
                <button className="button button-outline" onClick={closeDialog}>
                  Not yet
                </button>
                <button
                  className="button button-primary"
                  onClick={() => {
                    setLocked(true);
                    setCompletedAt(
                      new Date().toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }),
                    );
                    setBulk(false);
                    setSelected([]);
                    closeDialog();
                    setNotice("Checklist completed and locked. Nicely done.");
                  }}
                >
                  Complete & lock
                  <LockKeyhole size={16} />
                </button>
              </div>
            </>
          )}
          {dialog === "reopen" && (
            <>
              <p>
                Reopening restores editing for this sample checklist. You can
                change Checklist Items and complete it again when everything is
                ready.
              </p>
              <div className="modal-actions">
                <button className="button button-outline" onClick={closeDialog}>
                  Keep it locked
                </button>
                <button
                  className="button button-primary"
                  onClick={() => {
                    setLocked(false);
                    closeDialog();
                    setNotice(
                      `Reopened by Jamie Davis · ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`,
                    );
                  }}
                >
                  Reopen checklist
                  <RotateCcw size={15} />
                </button>
              </div>
            </>
          )}
          {dialog === "delete" && (
            <>
              <p>
                This removes {selected.length} selected Checklist Items from the
                sample. You can restore the original sample with Reset demo.
              </p>
              <div className="modal-actions">
                <button className="button button-outline" onClick={closeDialog}>
                  Cancel
                </button>
                <button
                  className="button button-dark"
                  onClick={() => {
                    setItems((previous) =>
                      previous.filter((item) => !selected.includes(item.id)),
                    );
                    setSelected([]);
                    closeDialog();
                    setNotice("Selected Checklist Items deleted.");
                  }}
                >
                  Delete {selected.length} items
                </button>
              </div>
            </>
          )}
          {dialog === "edit" && editing && (
            <form
              className="item-edit-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (!editing.name.trim()) return;
                update(editing.id, { ...editing, name: editing.name.trim() });
                closeDialog();
                setNotice("Checklist Item updated.");
              }}
            >
              <label>
                Name
                <input
                  required
                  maxLength={255}
                  value={editing.name}
                  onChange={(event) =>
                    setEditing({ ...editing, name: event.target.value })
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  rows={3}
                  value={editing.description || ""}
                  onChange={(event) =>
                    setEditing({ ...editing, description: event.target.value })
                  }
                  placeholder="A little context goes a long way."
                />
              </label>
              <div className="form-row">
                <label>
                  Status
                  <select
                    value={editing.status}
                    onChange={(event) =>
                      setEditing({
                        ...editing,
                        status: event.target.value as Status,
                      })
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Checklist
                  <select
                    disabled={editing.checklist === "Personal"}
                    value={editing.checklist}
                    onChange={(event) =>
                      setEditing({ ...editing, checklist: event.target.value })
                    }
                  >
                    {checklistNames
                      .filter((name) =>
                        editing.checklist === "Personal"
                          ? name === "Personal"
                          : name !== "Personal",
                      )
                      .map((name) => (
                        <option key={name}>{name}</option>
                      ))}
                  </select>
                </label>
              </div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={editing.mandatory}
                  onChange={(event) =>
                    setEditing({ ...editing, mandatory: event.target.checked })
                  }
                />
                Mandatory Item
              </label>
              <div className="modal-actions">
                <button
                  type="button"
                  className="button button-outline"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
                <button type="submit" className="button button-primary">
                  Save changes
                  <Check size={16} />
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}

function ArrowIcon() {
  return <ChevronRight size={16} />;
}
