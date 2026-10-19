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

const MONTHLY_RATE = (users: number) =>
  users <= 10 ? 0 : users <= 100 ? 0.75 : users <= 250 ? 0.55 : 0.3;
const ANNUAL_TIERS: Array<[number, number]> = [
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
const ANNUAL_PRICE = (users: number) =>
  ANNUAL_TIERS.find(([max]) => users <= max)![1];
const usd = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function PricingPage() {
  const [billing, setBilling] = useState<"Monthly" | "Annual">("Monthly");
  const [teamUsers, setTeamUsers] = useState(25);
  const [orgUsers, setOrgUsers] = useState(500);
  const annual = billing === "Annual";
  const teamPrice = annual ? ANNUAL_PRICE(teamUsers) : teamUsers * MONTHLY_RATE(teamUsers);
  const orgPrice = annual ? ANNUAL_PRICE(orgUsers) : orgUsers * MONTHLY_RATE(orgUsers);
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
        description="Every plan includes the full checklist experience. Free for up to 10 users, and priced by team size as you scale — billed through the Atlassian Marketplace."
      />
      <section className="container pricing-page">
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
            <span className="save-tag">SAVE ~17%</span>
          </button>
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
              <strong>$0</strong>
              <span className="price-unit">/{annual ? "year" : "month"}</span>
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
              Get Started Free
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
              {usd(MONTHLY_RATE(teamUsers))}/user/month
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
              to={`/contact?topic=Pricing&team=${teamUsers}%20users&billing=${billing}`}
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
              {usd(MONTHLY_RATE(orgUsers))}/user/month
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
                From $0.30/user/month above 250 users
              </li>
            </ul>
            <Button
              to={`/contact?topic=Pricing&team=${orgUsers}%20users&billing=${billing}`}
              variant="outline"
            >
              Talk to Sales
              <ArrowRight size={16} />
            </Button>
          </article>
        </div>
        <p className="pricing-footnote">
          All plans are billed through the Atlassian Marketplace. Annual
          billing saves ~17% (10-month pricing). Prices in USD, excluding tax.
        </p>
      </section>
      <section className="section container included-section">
        <SectionHeading
          eyebrow="NO PREMIUM TIERS. NO FEATURE GATING."
          title="Everything Included"
          description="Every team gets the full Jira Checklist experience — on every plan, at every size."
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
              "Monthly billing uses per-user tiers: USD 0.75 per user/month for 11–100 users, USD 0.55 for 101–250, and USD 0.30 above 250. Up to 10 users is completely free. Annual billing uses flat tiers per team size, which saves about 17% (10-month pricing).",
          },
          {
            question: "What does the Free tier include?",
            answer:
              "Everything. Up to 10 users get the full checklist experience free — no trial expiration, no feature gates, nothing held back. It is the standard Atlassian Marketplace model for small teams.",
          },
          {
            question: "How does annual billing work?",
            answer:
              "You pick the tier that matches your team size and pay one flat annual price for everyone in it. If your team grows within the same tier, the price does not change until you cross into the next one.",
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
