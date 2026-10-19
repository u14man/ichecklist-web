import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button, FAQ, FinalCTA, PageHero, SectionHeading } from "../components";
import { features } from "../content";

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
const usd = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });
const normalizeUsers = (value: number) =>
  Math.min(2500, Math.max(1, Math.round(value)));
const COMMON_FEATURES = [
  "有序清单与个人清单",
  "进度追踪与灵活视图",
  "Jira 原生使用体验",
  "完整清单功能，不按人数限制",
];

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
        <p>{advanced ? "另一种版本选择，同样清晰的团队报价。" : "从小团队开始，随团队规模灵活计费。"}</p>
      </header>
      <div className="edition-price-block">
        <div className="edition-price" aria-live="polite" aria-atomic="true">
          <strong>{price === undefined ? "联系报价" : free ? "免费" : usd(price)}</strong>
          {price !== undefined && !free && <span>{annual ? "/ 年" : "/ 人 / 月"}</span>}
        </div>
        <p className="edition-price-detail">
          {price === undefined
            ? "超出公开阶梯范围，请联系我们。"
            : free
              ? "最多 10 人，Standard 免费使用"
              : annual
                ? `适用 ${tierMin.toLocaleString()}–${tier[0].toLocaleString()} 人阶梯 · 全年总价`
                : `${users.toLocaleString()} 人团队 · 每月合计 ${usd(rate * users)}`}
        </p>
        <span className="edition-billing-note">
          {annual ? "按年计费，价格按团队人数阶梯确定" : "按月计费，人均费率按团队规模确定"}
        </span>
      </div>
      <Button to={free ? "/demo" : `/contact?${quoteParams}`} variant={advanced ? "primary" : "outline"}>
        {free ? "体验免费版" : "咨询此版本"}
        <ArrowRight size={18} aria-hidden="true" />
      </Button>
      <div className="edition-feature-section">
        <h3>完整清单体验</h3>
        <p>两个版本均包含以下能力</p>
        <ul>
          {COMMON_FEATURES.map((feature) => (
            <li key={feature}><Check size={18} aria-hidden="true" /><span>{feature}</span></li>
          ))}
        </ul>
        <span className="edition-marketplace">通过 Atlassian Marketplace 计费</span>
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
        description="统一选择团队人数，在相同计费条件下对比 Standard 与 Advanced。价格透明，通过 Atlassian Marketplace 计费。"
      />
      <section className="container pricing-page" aria-label="版本与价格对比">
        <div className="edition-toolbar">
          <div className="edition-team-controls">
            <div className="edition-team-input">
              <label htmlFor="pricing-team-size">团队人数</label>
              <div className="edition-number-field">
                <input id="pricing-team-size" type="number" inputMode="numeric" min={1} max={2500} step={1} value={usersInput} onChange={(event) => updateUsers(event.target.value)} onBlur={commitUsers} aria-describedby="pricing-team-help" />
                <span aria-hidden="true">人</span>
              </div>
            </div>
            <div className="edition-presets" role="group" aria-label="常用团队人数">
              {[10, 25, 100, 500, 1000, 2500].map((preset) => (
                <button key={preset} type="button" aria-pressed={users === preset} onClick={() => { setUsers(preset); setUsersInput(String(preset)); }}>
                  {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <fieldset className="edition-billing">
            <legend>计费周期</legend>
            <div className="edition-billing-switch">
              {(["Monthly", "Annual"] as const).map((period) => (
                <label key={period}>
                  <input type="radio" name="pricing-billing" value={period} checked={billing === period} onChange={() => setBilling(period)} />
                  <span>{period === "Monthly" ? "月付" : "年付"}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <p id="pricing-team-help" className="edition-team-help">支持 1–2,500 人。更大规模？<Link to="/contact?topic=Pricing">联系获取报价 <ArrowRight size={14} aria-hidden="true" /></Link></p>
        <div className="edition-comparison">
          <EditionCard edition="standard" users={users} billing={billing} />
          <EditionCard edition="advanced" users={users} billing={billing} />
        </div>
        <p className="edition-pricing-footnote">价格均为美元，不含税。月付展示每人月费及团队月总额；年付展示所选人数对应的阶梯全年总价。</p>
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
              <span><strong><Link to={`/features/${feature.slug}`}>{feature.title}</Link></strong><small>{feature.short}</small></span>
            </div>
          ))}
          <div className="included-item"><Check size={17} /><span><strong>1-click Setup</strong><small>Enable on any Jira project in under a minute</small></span></div>
        </div>
      </section>
      <FAQ items={[
        { question: "价格如何计算？", answer: "Standard 月付在 10 人以内免费；11–100 人每人每月 $0.75，101–250 人 $0.55，250 人以上 $0.30。Advanced 月付在 1–10 人时每人每月 $5；11–100 人 $1，101–250 人 $0.80，251–1,000 人 $0.25，1,000 人以上 $0.20。当前计算按团队人数匹配整档人均费率，不做累进分段计算。" },
        { question: "10 人以内如何收费？", answer: "Standard 在 10 人以内免费。Advanced 在 1–10 人时每人每月 $5，例如 10 人月付共 $50；选择年付时，1–10 人阶梯的全年总价为 $50。月付人均价与年付阶梯总价是不同计费口径。" },
        { question: "年付如何计算？", answer: "选择人数后，系统分别匹配两个版本的年付阶梯，卡片显示适用人数范围与全年总价，不是每人年费。同一阶梯内人数变化不改变年付总价。2,500 人以上请联系报价，不自动外推价格。" },
        { question: "Can I try the experience before buying?", answer: "Yes. The interactive demo is available without an account. It uses sample Checklist Items and does not connect to your Jira instance." },
      ]} />
      <FinalCTA />
    </>
  );
}
