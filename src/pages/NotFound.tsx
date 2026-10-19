import {
  ArrowRight,
  CheckCheck,
} from "lucide-react";
import {
  Button,
} from "../components";
import { features } from "../content";

export function NotFound() {
  return (
    <section className="not-found container">
      <span className="not-found-art">
        4
        <span>
          <CheckCheck size={76} />
        </span>
        4
      </span>
      <span className="eyebrow">ONE LITTLE THING WE COULDN’T FIND</span>
      <h1>
        This page slipped
        <br />
        off the checklist.
      </h1>
      <p>Let’s get you back to the good stuff.</p>
      <div className="button-row">
        <Button to="/">
          Back to home
          <ArrowRight size={17} />
        </Button>
        <Button to="/features" variant="outline">
          Explore the features
        </Button>
      </div>
    </section>
  );
}
