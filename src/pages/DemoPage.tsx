import {
  Check,
  CheckCheck,
  LockKeyhole,
  MousePointer2,
  ShieldCheck,
} from "lucide-react";
import {
  FinalCTA,
  PageHero,
} from "../components";
import ProductDemo from "../ProductDemo";

export function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="A LITTLE HANDS-ON TIME"
        title={
          <>
            Less explaining.
            <br />
            <span>More checking things off.</span>
          </>
        }
        description="Click around. Change a status. Make yourself at home. This is a sample workspace, so your real Jira issues stay untouched."
      />
      <div className="container demo-instructions">
        <span>
          <span>1</span>Check off an item
        </span>
        <span>
          <span>2</span>Try a different view
        </span>
        <span>
          <span>3</span>Complete the checklist
        </span>
        <span className="demo-no-account">
          <LockKeyhole size={13} />
          No sign-up. No connection to Jira.
        </span>
      </div>
      <section className="container demo-page-stage">
        <ProductDemo expanded />
      </section>
      <div className="container demo-info-grid">
        <article>
          <MousePointer2 size={21} />
          <h3>Go ahead, explore.</h3>
          <p>
            Click an item’s name to edit it. Use the toolbar for search, status
            filters, bulk editing, and columns.
          </p>
        </article>
        <article>
          <ShieldCheck size={21} />
          <h3>Try the important part.</h3>
          <p>
            Click “Complete checklist” with Mandatory Items still open. The gate
            shows you what needs attention.
          </p>
        </article>
        <article>
          <CheckCheck size={21} />
          <h3>A fresh start, anytime.</h3>
          <p>
            Reset restores the sample. Changes live only in this preview and
            disappear when you leave or reload.
          </p>
        </article>
      </div>
      <FinalCTA />
    </>
  );
}
