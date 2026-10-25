import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Asterisk, Check, Diamond, Ghost } from "lucide-react";
import { Button, FAQ, FinalCTA, PageHero, SectionHeading } from "../components";


type Edition = "standard" | "advanced";
type Billing = "Monthly" | "Annual";

const STANDARD_ANNUAL: Array<[number, number]> = [
  [10, 0],
  [15, 112.5],
  [25, 187.5],
  [50, 375],
  [100, 750],
  [200, 1300],
  [300, 1725],
  [400, 2025],
  [500, 2325],
  [600, 2625],
  [800, 3225],
  [1000, 3825],
  [1200, 4025],
  [1400, 4225],
  [1600, 4425],
  [1800, 4625],
  [2000, 4825],
  [2250, 5075],
  [2500, 5325],
];
const ADVANCED_ANNUAL: Array<[number, number]> = [
  [10, 50],
  [15, 150],
  [25, 250],
  [50, 500],
  [100, 1000],
  [200, 1800],
  [300, 2325],
  [400, 2575],
  [500, 2825],
  [600, 3075],
  [800, 3575],
  [1000, 4075],
  [1200, 4475],
  [1400, 4875],
  [1600, 5275],
  [1800, 5675],
  [2000, 6075],
  [2250, 6575],
  [2500, 7075],
];
const monthlyRate = (edition: Edition, users: number) => {
  if (edition === "advanced") {
    if (users <= 10) return 5;
    if (users <= 100) return 1;
    if (users <= 250) return 0.8;
    if (users <= 1000) return 0.25;
    return 0.2;
  }
  if (users <= 10) return 0;
  if (users <= 100) return 0.75;
  if (users <= 250) return 0.55;
  return 0.3;
};
const usd = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });
const normalizeUsers = (value: number) =>
  Math.min(2500, Math.max(1, Math.round(value)));
const EDITION_FEATURES = [
  { slug: "organized-checklists", title: "Organized checklists", advancedOnly: false },
  { slug: "personal-checklists", title: "Personal checklists", advancedOnly: false },
  { slug: "progress-tracking", title: "Progress tracking", advancedOnly: false },
  { slug: "flexible-views", title: "Views & filters", advancedOnly: false },
  { slug: "native-experience", title: "Made for Jira", advancedOnly: false },
  { slug: "mandatory-items", title: "Mandatory items", advancedOnly: true },
  { slug: "completion-locking", title: "Completion & locking", advancedOnly: true },
  { slug: "bulk-actions", title: "Bulk actions", advancedOnly: true },
  { slug: "dashboards", title: "Dashboards", advancedOnly: true },
] as const;

const COMPARE_GROUPS = [
  {
    title: "Checklists",
    rows: [
      { slug: "organized-checklists", title: "Organized checklists", standard: true, advanced: true },
      { slug: "personal-checklists", title: "Personal checklists", standard: true, advanced: true },
      { slug: "flexible-views", title: "Views & filters", standard: true, advanced: true },
      { slug: "native-experience", title: "Made for Jira", standard: true, advanced: true },
    ],
  },
  {
    title: "Controls",
    rows: [
      { slug: "mandatory-items", title: "Mandatory items", standard: false, advanced: true },
      { slug: "completion-locking", title: "Completion & locking", standard: false, advanced: true },
      { slug: "bulk-actions", title: "Bulk actions", standard: false, advanced: true },
    ],
  },
  {
    title: "Visibility",
    rows: [
      { slug: "progress-tracking", title: "Progress tracking", standard: true, advanced: true },
      { slug: "dashboards", title: "Dashboards", standard: false, advanced: true },
    ],
  },
  {
    title: "Billing",
    rows: [
      { title: "Atlassian Marketplace billing", standard: true, advanced: true },
      { title: "Free for up to 10 users", standard: true, advanced: false },
    ],
  },
] as const;

function CompareMark({ included }: { included: boolean }) {
  return (
    <span className={`compare-mark${included ? " is-included" : ""}`} aria-label={included ? "Included" : "Not included"}>
      {included ? <Check size={15} aria-hidden="true" /> : <span aria-hidden="true">—</span>}
    </span>
  );
}

function EditionCard({
  edition,
  users,
  billing,
}: {
  edition: Edition;
  users: number;
  billing: Billing;
}) {
  const annual = billing === "Annual";
  const advanced = edition === "advanced";
  const name = advanced ? "Advanced" : "Standard";
  const tiers = advanced ? ADVANCED_ANNUAL : STANDARD_ANNUAL;
  const tierIndex = tiers.findIndex(([max]) => users <= max);
  const tier = tiers[tierIndex];
  const rate = monthlyRate(edition, users);
  const price = annual ? tier?.[1] : rate;
  const free = price === 0;
  const tierMin = tierIndex <= 0 ? 1 : tiers[tierIndex - 1][0] + 1;
  const quoteParams = new URLSearchParams({
    topic: "Pricing",
    edition,
    team: `${users} users`,
    billing,
  });

  return (
    <article className={`edition-card${advanced ? " edition-card-advanced" : ""}`} aria-labelledby={`${edition}-title`}>
      <header className="edition-heading">
        <span className="edition-kicker">{advanced ? "ADVANCED EDITION" : "STANDARD EDITION"}</span>
        <h2 id={`${edition}-title`}>{name}</h2>
        <p>{advanced ? "Adds the controls for teams that need more certainty." : "The day-to-day checklist a team can start with."}</p>
      </header>
      <div className="edition-price-block">
        <div className="edition-price" aria-live="polite" aria-atomic="true">
          <strong>{price === undefined ? "Contact sales" : free ? "Free" : usd(price)}</strong>
          {price !== undefined && !free && <span>{annual ? "/ year" : "/ user / month"}</span>}
        </div>
        <p className="edition-price-detail">
          {price === undefined
            ? "Contact us for pricing beyond the published tiers."
            : free
              ? "Standard is free for up to 10 users"
              : annual
                ? `${tierMin.toLocaleString("en-US")}–${tier[0].toLocaleString("en-US")} users · Total annual price`
                : `${users.toLocaleString("en-US")} users · ${usd(rate * users)} total per month`}
        </p>
        <span className="edition-billing-note">
          {annual ? "Billed annually, based on your team size tier" : "Billed monthly, with a per-user rate based on team size"}
        </span>
      </div>
      <Button to={free ? "/demo" : `/contact?${quoteParams}`} variant={advanced ? "primary" : "outline"}>
        {free ? "Try it free" : "Contact us about this edition"}
        <ArrowRight size={18} aria-hidden="true" />
      </Button>
      <div className="edition-feature-section">
        <h3>{advanced ? "Everything in Standard, plus" : "Features included"}</h3>
        <ul>
          {EDITION_FEATURES.map((feature) => {
            const included = advanced || !feature.advancedOnly;
            return (
              <li
                key={feature.slug}
                className={included ? undefined : "is-unavailable"}
                aria-label={`${feature.title}, ${included ? "included" : "not included"}`}
              >
                <span className="feature-mark" aria-hidden="true">
                  {included ? <Check size={14} /> : <Ghost size={15} />}
                </span>
                <Link to={`/features/${feature.slug}`}>{feature.title}</Link>
              </li>
            );
          })}
        </ul>
        <span className="edition-marketplace">Billed through the Atlassian Marketplace</span>
      </div>
    </article>
  );
}

export function PricingPage() {
  const [billing, setBilling] = useState<Billing>("Monthly");
  const [users, setUsers] = useState(10);
  const [usersInput, setUsersInput] = useState("10");
  const updateUsers = (value: string) => {
    setUsersInput(value);
    if (value.trim() !== "" && Number.isFinite(Number(value))) {
      setUsers(normalizeUsers(Number(value)));
    }
  };
  const commitUsers = () => {
    const value = usersInput.trim() === "" ? users : Number(usersInput);
    const next = Number.isFinite(value) ? normalizeUsers(value) : users;
    setUsers(next);
    setUsersInput(String(next));
  };

  return (
    <>
      <PageHero
        gradient
        eyebrow="SIMPLE PRICING. EVERY FEATURE. NO SURPRISES."
        title={<>Free where it counts.<br /><span>Fair as you grow.</span></>}
        description="Set your team size and compare Standard and Advanced side by side. Transparent pricing, billed through the Atlassian Marketplace."
      />
      <section className="container pricing-page" aria-label="Compare editions and pricing">
        <div className="edition-toolbar">
          <div className="edition-team-controls">
            <div className="edition-team-input">
              <label htmlFor="pricing-team-size">Team size</label>
              <div className="edition-number-field">
                <input id="pricing-team-size" type="number" inputMode="numeric" min={1} max={2500} step={1} value={usersInput} onChange={(event) => updateUsers(event.target.value)} onBlur={commitUsers} aria-describedby="pricing-team-help" />
                <span aria-hidden="true">users</span>
              </div>
            </div>
            <div className="edition-presets" role="group" aria-label="Common team sizes">
              {[10, 25, 100, 500, 1000, 2500].map((preset) => (
                <button key={preset} type="button" aria-pressed={users === preset} onClick={() => { setUsers(preset); setUsersInput(String(preset)); }}>
                  {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <fieldset className="edition-billing">
            <legend>Billing period</legend>
            <div className="edition-billing-switch">
              {(["Monthly", "Annual"] as const).map((period) => (
                <label key={period}>
                  <input type="radio" name="pricing-billing" value={period} checked={billing === period} onChange={() => setBilling(period)} />
                  <span className={period === "Annual" ? "billing-option has-save" : "billing-option"}>
                    {period}
                    {period === "Annual" && <span className="save-tag">SAVE ~17%</span>}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="edition-comparison">
          <EditionCard edition="standard" users={users} billing={billing} />
          <EditionCard edition="advanced" users={users} billing={billing} />
        </div>
        <p className="edition-pricing-footnote">All prices are in USD, excluding tax. Monthly pricing shows the per-user rate and team total. Annual pricing shows the total annual price for your team size tier.</p>
      </section>
      <section className="section container compare-plans">
        <SectionHeading
          eyebrow="COMPARE PLANS"
          title="Compare plans & features"
          description="The same checklist features, shown side by side. Advanced adds the controls and dashboard."
        />
        <div className="compare-table-wrap">
          <table aria-label="Compare plans and features">
            <colgroup>
              <col className="feature-col" />
              <col className="plan-col" />
              <col className="plan-col" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Plans</th>
                <th scope="col">
                  <span className="compare-plan">
                    <Asterisk size={18} aria-hidden="true" />
                    Standard
                  </span>
                </th>
                <th scope="col">
                  <span className="compare-plan is-advanced">
                    <Diamond size={16} aria-hidden="true" />
                    Advanced
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_GROUPS.map((group) => (
                <Fragment key={group.title}>
                  <tr className="compare-group">
                    <th scope="colgroup" colSpan={3}>{group.title}</th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.title}>
                      <th scope="row">
                        {"slug" in row ? <Link to={`/features/${row.slug}`}>{row.title}</Link> : row.title}
                      </th>
                      <td><CompareMark included={row.standard} /></td>
                      <td><CompareMark included={row.advanced} /></td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <FAQ items={[
        { question: "How is pricing calculated?", answer: "Standard monthly pricing is free for up to 10 users, then $0.75 per user for 11–100 users, $0.55 for 101–250, and $0.30 above 250. Advanced monthly pricing is $5 per user for 1–10 users, $1 for 11–100, $0.80 for 101–250, $0.25 for 251–1,000, and $0.20 above 1,000. The rate for your team size applies to every user; pricing is not calculated progressively across tiers." },
        { question: "What does it cost for up to 10 users?", answer: "Standard is free for up to 10 users. Advanced costs $5 per user per month for 1–10 users, so 10 users cost $50 per month. With annual billing, the total annual price for the 1–10 user tier is $50. Monthly per-user pricing and annual tier pricing use different billing models." },
        { question: "How does annual billing work?", answer: "Each edition matches your team size to its annual pricing tier. The card shows the applicable user range and total annual price, not a per-user annual rate. Changing the number of users within the same tier does not change the annual total. For more than 2,500 users, contact us for a quote." },
        { question: "Can I try the experience before buying?", answer: "Yes. The interactive demo is available without an account. It uses sample Checklist Items and does not connect to your Jira instance." },
      ]} />
      <FinalCTA />
    </>
  );
}
