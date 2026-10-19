import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Asterisk,
  Flower,
  Flower2,
  Check,
  User,
} from "lucide-react";
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

export function PricingPage() {
  const [edition, setEdition] = useState<Edition>("standard");
  const [billing, setBilling] = useState<"Monthly" | "Annual">("Monthly");
  const [teamUsers, setTeamUsers] = useState(25);
  const [orgUsers, setOrgUsers] = useState(500);
  const annual = billing === "Annual";
  const advanced = edition === "advanced";
  const teamPrice = annual
    ? annualPrice(edition, teamUsers)
    : teamUsers * monthlyRate(edition, teamUsers);
  const orgPrice = annual
    ? annualPrice(edition, orgUsers)
    : orgUsers * monthlyRate(edition, orgUsers);
  const freePrice = advanced ? (annual ? 50 : 5) : 0;
  const quote = (team: number) =>
    `/contact?topic=Pricing&edition=${edition}&team=${team}%20users&billing=${billing}`;
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
        description="Standard is free for up to 10 users. Advanced starts at $5 per user. Both editions include the full checklist and are billed through the Atlassian Marketplace."
      />
      <section className="container pricing-page">
        <div className="pricing-controls">
          <div className="billing-tabs" role="tablist" aria-label="Edition">
            <button
              role="tab"
              aria-selected={!advanced}
              className={!advanced ? "active" : ""}
              onClick={() => setEdition("standard")}
            >
              Standard
            </button>
            <button
              role="tab"
              aria-selected={advanced}
              className={advanced ? "active" : ""}
              onClick={() => setEdition("advanced")}
            >
              Advanced
            </button>
          </div>
          <div className="billing-tabs" role="tablist" aria-label="Billing period">
            <button
              role="tab"
              aria-selected={!annual}
              className={!annual ? "active" : ""}
              onClick={() => setBilling("Monthly")}
            >
              Monthly
            </button>
            <button
              role="tab"
              aria-selected={annual}
              className={annual ? "active" : ""}
              onClick={() => setBilling("Annual")}
            >
              Annual
              {!advanced && <span className="save-tag">SAVE ~17%</span>}
            </button>
          </div>
        </div>
        <div className="plans-grid">
          <article className="plan-card">
            <div className="plan-title-row">
              <span className="plan-glyph free">
                <Asterisk size={24} />
              </span>
              <h3>Free</h3>
            </div>
            <p className="plan-desc">For small teams and startups</p>
            <div className="plan-price">
              <strong>{usd(freePrice)}</strong>
              <span className="price-unit">
                {advanced && !annual ? "/user/month" : `/${annual ? "year" : "month"}`}
              </span>
            </div>
            <span className="price-sub">Up to 10 users</span>
            <div className="team-size-row">
              <span className="size-label">TEAM SIZE</span>
              <strong>Up to 10 users</strong>
            </div>
            <div className="free-avatars" aria-label="Up to 10 users">
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index}>
                  <User size={13} />
                </span>
              ))}
            </div>
            <ul className="plan-features">
              <li>
                <Check size={15} />All features included
              </li>
              <li>
                <Check size={15} />No trial expiration
              </li>
              <li>
                <Check size={15} />Billed via Atlassian Marketplace
              </li>
            </ul>
            <Button to="/demo" variant="outline">
              {advanced ? "Get Started" : "Get Started Free"}
              <ArrowRight size={16} />
            </Button>
          </article>
          <article className="plan-card plan-featured bg-gradient-black">
            <div className="plan-title-row">
              <span className="plan-glyph team">
                <Flower2 size={24} />
              </span>
              <h3>Team</h3>
              <span className="popular-tag">POPULAR</span>
            </div>
            <p className="plan-desc">For growing teams</p>
            <div className="plan-price">
              <strong>{usd(teamPrice)}</strong>
              <span className="price-unit">/{annual ? "year" : "month"}</span>
            </div>
            <span className="price-sub">
              {usd(monthlyRate(edition, teamUsers))}/user/month
            </span>
            <div className="team-size-row">
              <span className="size-label">TEAM SIZE</span>
              <strong>{teamUsers} users</strong>
            </div>
            <input
              type="range"
              min={11}
              max={100}
              value={teamUsers}
              aria-label="Team size"
              onChange={(event) => setTeamUsers(Number(event.target.value))}
            />
            <div className="range-bounds">
              <span>11</span>
              <span>100</span>
            </div>
            <ul className="plan-features">
              <li>
                <Check size={15} />All features included
              </li>
              <li>
                <Check size={15} />Same feature set as Free
              </li>
              <li>
                <Check size={15} />Billed via Atlassian Marketplace
              </li>
            </ul>
            <Button
              to={quote(teamUsers)}
            >
              Start Free Trial
              <ArrowRight size={16} />
            </Button>
          </article>
          <article className="plan-card">
            <div className="plan-title-row">
              <span className="plan-glyph org">
                <Flower size={24} />
              </span>
              <h3>Organization</h3>
            </div>
            <p className="plan-desc">For scaling teams</p>
            <div className="plan-price">
              <strong>{usd(orgPrice)}</strong>
              <span className="price-unit">/{annual ? "year" : "month"}</span>
            </div>
            <span className="price-sub">
              {usd(monthlyRate(edition, orgUsers))}/user/month
            </span>
            <div className="team-size-row">
              <span className="size-label">TEAM SIZE</span>
              <strong>{orgUsers.toLocaleString("en-US")} users</strong>
            </div>
            <div className="preset-row">
              {[
                [250, "250"],
                [500, "500"],
                [1000, "1K"],
                [2500, "2.5K"],
              ].map(([value, label]) => (
                <button
                  key={label}
                  className={orgUsers === value ? "active" : ""}
                  aria-pressed={orgUsers === value}
                  onClick={() => setOrgUsers(value as number)}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="range"
              min={101}
              max={2500}
              value={orgUsers}
              aria-label="Organization size"
              onChange={(event) => setOrgUsers(Number(event.target.value))}
            />
            <div className="range-bounds">
              <span>101</span>
              <span>2,500</span>
            </div>
            <ul className="plan-features">
              <li>
                <Check size={15} />
                Volume discounts applied
              </li>
              <li>
                <Check size={15} />
                All features included
              </li>
              <li>
                <Check size={15} />
                {advanced
                  ? "From $0.20/user/month above 1,000 users"
                  : "From $0.30/user/month above 250 users"}
              </li>
            </ul>
            <Button
              to={quote(orgUsers)}
              variant="outline"
            >
              Talk to Sales
              <ArrowRight size={16} />
            </Button>
          </article>
        </div>
        <p className="pricing-footnote">
          {advanced
            ? "Advanced annual prices are flat tiers by team size. All plans are billed through the Atlassian Marketplace. Prices in USD, excluding tax."
            : "All plans are billed through the Atlassian Marketplace. Annual billing saves ~17% (10-month pricing). Prices in USD, excluding tax."}
        </p>
      </section>
      <section className="section container included-section">
        <SectionHeading
          eyebrow="TWO EDITIONS. NO FEATURE GATING."
          title="Everything Included"
          description="Standard and Advanced both include the full checklist. Team size changes the price, not the features."
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
              "On Standard, up to 10 users get the full checklist free. On Advanced, the same 1–10 user plan is USD 5 per user each month, or USD 50 per year. Neither edition gates features by team size.",
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
