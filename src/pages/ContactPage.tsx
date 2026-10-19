import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCheck,
  CircleCheck,
  Copy,
  Download,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MessageSquare,
  MousePointer2,
} from "lucide-react";
import { features, guides } from "../content";

export function ContactPage() {
  const [params] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState(() => {
    const requested = params.get("team");
    const users = Number(requested?.match(/\d+/)?.[0]);
    if (!users) return "11–50";
    if (users <= 10) return "1–10";
    if (users <= 50) return "11–50";
    if (users <= 100) return "51–100";
    if (users <= 500) return "101–500";
    return "501+";
  });
  const [topic, setTopic] = useState(
    params.get("topic") || "Product questions",
  );
  const [message, setMessage] = useState(
    params.get("billing")
      ? `I would like to discuss pricing for our Jira team. Our preferred billing cadence is ${params.get("billing")?.toLowerCase()}.`
      : "",
  );
  const inquiry = `Jira Checklist inquiry\n\nName: ${name}\nEmail: ${email}\nTeam size: ${team}\nTopic: ${topic}\n\n${message}\n`;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim() && message.trim()) {
      setSubmitted(true);
      setCopied(false);
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(inquiry);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([inquiry], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "jira-checklist-inquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <section className="container contact-layout">
        <div className="contact-copy">
          <span className="eyebrow">A GOOD CONVERSATION STARTS HERE</span>
          <h1>
            Let’s get into
            <br />
            <span>the details.</span>
          </h1>
          <p>
            Questions about the product? Thinking about your team’s workflow?
            You’re in the right place.
          </p>
          <div className="contact-options">
            <Link to="/docs">
              <span className="feature-icon lavender">
                <LifeBuoy size={22} />
              </span>
              <div>
                <strong>Looking for a quick answer?</strong>
                <p>Our help center is a good place to start.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/demo">
              <span className="feature-icon mint">
                <MousePointer2 size={22} />
              </span>
              <div>
                <strong>Prefer to get a feel for it?</strong>
                <p>Make yourself at home in the live demo.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/resources">
              <span className="feature-icon peach">
                <BookOpen size={22} />
              </span>
              <div>
                <strong>A little workflow inspiration?</strong>
                <p>Practical guides for thoughtful teams.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="contact-bottom-note">
            <MessageSquare size={23} />
            <p>
              No complicated pitch.
              <br />
              Just the right next conversation.
            </p>
          </div>
        </div>
        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success" role="status">
              <span className="success-icon">
                <CircleCheck size={32} />
              </span>
              <span className="eyebrow">ALL THE DETAILS, TOGETHER</span>
              <h2>Your inquiry is ready.</h2>
              <p>
                This website preview doesn’t send messages. Copy or download
                your inquiry to keep it ready for the product team.
              </p>
              <pre>{inquiry}</pre>
              <div className="button-row">
                <button className="button button-primary" onClick={copy}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied to clipboard" : "Copy inquiry"}
                </button>
                <button className="button button-outline" onClick={download}>
                  <Download size={16} />
                  Download
                </button>
              </div>
              {copyError && (
                <p className="form-notice">
                  Clipboard access is unavailable. Please download the inquiry
                  instead.
                </p>
              )}
              <button className="text-link" onClick={() => setSubmitted(false)}>
                Back to your details
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <>
              <div className="form-card-heading">
                <span className="feature-icon lavender">
                  <Mail size={22} />
                </span>
                <div>
                  <h2>What’s on your mind?</h2>
                  <p>A little context goes a long way.</p>
                </div>
              </div>
              <form onSubmit={submit}>
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Jamie Davis"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>
                  <label>
                    Work email
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="jamie@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Team size
                    <select
                      value={team}
                      onChange={(event) => setTeam(event.target.value)}
                    >
                      {["1–10", "11–50", "51–100", "101–500", "501+"].map(
                        (size) => (
                          <option key={size}>{size}</option>
                        ),
                      )}
                    </select>
                  </label>
                  <label>
                    I’d like to talk about
                    <select
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                    >
                      {[
                        "Product questions",
                        "Pricing",
                        "Team workflows",
                        "Feedback",
                        "Something else",
                      ].map((value) => (
                        <option key={value}>{value}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  A little about what you need
                  <textarea
                    rows={5}
                    required
                    minLength={10}
                    maxLength={5000}
                    placeholder="Tell us about your team, your workflow, or the little thing you’d like to make better…"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    I’ve read the <Link to="/privacy">privacy notice</Link>. I
                    won’t include credentials or sensitive issue information.
                  </span>
                </label>
                <button type="submit" className="button button-primary">
                  Prepare my inquiry
                  <ArrowUpRight size={17} />
                </button>
                <p className="form-preview-note">
                  <LockKeyhole size={13} />
                  Preview mode: prepare, copy, or download. Nothing is sent.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
      <section className="contact-footer-note container">
        <CheckCheck size={20} />
        <span>While you’re here, there’s a whole checklist to explore.</span>
        <Link className="text-link" to="/features">
          Meet the features
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
