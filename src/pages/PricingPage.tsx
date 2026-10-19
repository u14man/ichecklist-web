import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import {
  Button,
  FAQ,
  FinalCTA,
  PageHero,
  SectionHeading,
} from "../components";
import { features } from "../content";

type Edition = "standard" | "advanced";

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
  [500, 2325],
  [600, 2625],
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
const annualPrice = (edition: Edition, users: number) => {
  const tiers = edition === "advanced" ? ADVANCED_ANNUAL : STANDARD_ANNUAL;
  return (
    tiers.find(([max]) => users <= max)?.[1] ?? tiers[tiers.length - 1][1]
  );
};
const usd = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

const STANDARD_INCLUDES = [
  ["organized-checklists", "Organized checklists"],
  ["personal-checklists", "Personal checklists"],
  ["progress-tracking", "Progress tracking"],
  ["flexible-views", "Views & filters"],
  ["native-experience", "Made for Jira"],
] as const;

const ADVANCED_EXTRAS = [
  ["mandatory-items", "Mandatory items"],
  ["completion-locking", "Completion & locking"],
  ["bulk-actions", "Bulk actions"],
  ["dashboards", "Dashboards"],
] as const;

const TEAM_PRESETS = [10, 25, 100, 250, 500, 1000];

export function PricingPage() {
  const [billing, setBilling] = useState<"Monthly" | "Annual">("Monthly");
  const [users, setUsers] = useState(10);
  const annual = billing === "Annual";
  const setTeamSize = (value: number) => {
    if (!Number.isFinite(value)) return;
    setUsers(Math.min(2500, Math.max(1, Math.round(value))));
  };
  const total = (edition: Edition) =>
    annual ? annualPrice(edition, users) : users * monthlyRate(edition, users);
  const quote = (edition: Edition) =>
    `/contact?topic=Pricing&edition=${edition}&team=${users}%20users&billing=${billing}`;
  return (
    <>
      <PageHero
        gradient
        eyebrow="SIMPLE PRICING. EVERY FEATURE. NO SURPRISES."
        title={
          <>
            Free where it counts.
            <br />
            <span>Fair as you grow.</span>
          </>
        }
        description="Set your team size once. Standard and Advanced update together, billed through the Atlassian Marketplace."
      />
      <section className="container pricing-page">
        <div className="pricing-toolbar">
          <div className="team-size-field">
            <label htmlFor="team-size">Team size</label>
            <div className="team-size-input-row">
              <input
                id="team-size"
                type="number"
                min={1}
                max={2500}
                value={users}
                onChange={(event) => setTeamSize(Number(event.target.value))}
              />
              <input
                type="range"
                min={1}
                max={2500}
                value={users}
                aria-label="Team size slider"
                onChange={(event) => setTeamSize(Number(event.target.value))}
              />
            </div>
            <div className="preset-row">
              {TEAM_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={users === preset ? "active" : ""}
                  aria-pressed={users === preset}
                  onClick={() => setTeamSize(preset)}
                >
                  {preset.toLocaleString("en-US")}
                </button>
              ))}
            </div>
          </div>
          <div className="billing-tabs" role="tablist" aria-label="Billing period">
            <button
              role="tab"
              type="button"
              aria-selected={!annual}
              className={!annual ? "active" : ""}
              onClick={() => setBilling("Monthly")}
            >
              Monthly
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={annual}
              className={annual ? "active" : ""}
              onClick={() => setBilling("Annual")}
            >
              Annual
            </button>
          </div>
        </div>
        <div className="edition-grid">
          {(["standard", "advanced"] as const).map((edition) => {
            const price = total(edition);
            const advanced = edition === "advanced";
            return (
              <article
                key={edition}
                className={`plan-card edition-card${advanced ? " is-advanced" : ""}`}
              >
                <h3>{advanced ? "Advanced" : "Standard"}</h3>
                <p className="plan-desc">
                  {advanced
                    ? "The controls for teams that need more certainty."
                    : "The checklist a team can start with."}
                </p>
                <div className="plan-price">
                  <strong>{price === 0 ? "Free" : usd(price)}</strong>
                  {price > 0 && (
                    <span className="price-unit">/{annual ? "year" : "month"}</span>
                  )}
                </div>
                <span className="price-sub">
                  {price === 0
                    ? "Up to 10 users"
                    : annual
                      ? `Flat tier for ${users.toLocaleString("en-US")} users`
                      : `${usd(monthlyRate(edition, users))} per user`}
                </span>
                <Button
                  to={price === 0 ? "/demo" : quote(edition)}
                  variant={advanced ? "primary" : "outline"}
                >
                  {price === 0 ? "Get started free" : "Get started"}
                  <ArrowRight size={16} />
                </Button>
                <div className="edition-features">
                  <h4>
                    {advanced ? "Everything from Standard, plus" : "Includes"}
                  </h4>
                  <ul className="plan-features">
                    {(advanced ? ADVANCED_EXTRAS : STANDARD_INCLUDES).map(
                      ([slug, title]) => (
                        <li key={slug}>
                          <Check size={15} />
                          <Link to={`/features/${slug}`}>{title}</Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
        <p className="pricing-footnote">
          Monthly prices are per user. Annual prices are a flat tier for the
          selected team size. Standard annual billing is about 10 months of the
          monthly rate. Prices in USD, excluding tax.
        </p>
      </section>
      <section className="section container included-section">
        <SectionHeading
          eyebrow="STANDARD STARTS THE WORK."
          title="Advanced adds the controls"
          description="Standard covers the day-to-day checklist. Advanced adds mandatory items, completion locking, bulk actions, and dashboards."
        />
        <div className="included-grid">
          {features.map((feature) => (
            <div className="included-item" key={feature.slug}>
              <Check size={17} />
              <span>
                <strong>
                  <Link to={`/features/${feature.slug}`}>{feature.title}</Link>
                </strong>
                <small>{feature.short}</small>
              </span>
            </div>
          ))}
          <div className="included-item">
            <Check size={17} />
            <span>
              <strong>1-click Setup</strong>
              <small>Enable on any Jira project in under a minute</small>
            </span>
          </div>
        </div>
      </section>
      <FAQ
        items={[
          {
            question: "How is the price calculated?",
            answer:
              "Standard monthly is free for up to 10 users, then USD 0.75 per user/month for 11–100, USD 0.55 for 101–250, and USD 0.30 above 250. Advanced monthly is USD 5 per user for 1–10, USD 1 for 11–100, USD 0.80 for 101–250, USD 0.25 for 251–1,000, and USD 0.20 above 1,000. Annual billing uses a flat tier for each edition and team size.",
          },
          {
            question: "What does the Free tier include?",
            answer:
              "Standard is free for up to 10 users and includes organized checklists, personal checklists, progress tracking, views, and the native Jira experience. Advanced is USD 5 per user each month for 1–10 users, or USD 50 per year, and adds mandatory items, locking, bulk actions, and dashboards.",
          },
          {
            question: "How does annual billing work?",
            answer:
              "You pick Standard or Advanced, then the tier that matches your team size, and pay one flat annual price. If your team grows within the same tier, the price does not change until you cross into the next one.",
          },
          {
            question: "Can I try the experience before buying?",
            answer:
              "Yes. The interactive demo is available without an account. It uses sample Checklist Items and does not connect to your Jira instance.",
          },
        ]}
      />
      <FinalCTA />
    </>
  );
}
