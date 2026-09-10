import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { offices, site } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms governing use of the ${site.name} website and services.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="January 16, 2026"
      sections={[
        {
          heading: "Acceptance of Terms",
          body: (
            <>
              <p>
                These Terms of Use constitute a legally binding agreement made
                between you, whether personally or on behalf of an entity, and{" "}
                {site.name} Inc., concerning your access to and use of this
                website as well as any related media form or channel.
              </p>
              <p>
                We are registered in Quebec, Canada, and our head office is
                located at {offices[0].lines.join(", ")}.
              </p>
              <p>
                By accessing the site you acknowledge that you have read,
                understood, and agree to be bound by all of these terms. If you
                do not agree, you are expressly prohibited from using the site
                and must discontinue use immediately.
              </p>
            </>
          ),
        },
        {
          heading: "Intellectual Property",
          body: (
            <p>
              Unless otherwise indicated, the site is our proprietary property.
              All source code, databases, functionality, software, designs,
              audio, video, text, photographs, and graphics are owned or
              licensed by us and protected by copyright and trademark law.
            </p>
          ),
        },
        {
          heading: "Engagements",
          body: (
            <p>
              Client work is governed by the statement of work signed for each
              engagement. Where that document and these terms differ, the
              statement of work takes precedence.
            </p>
          ),
        },
        {
          heading: "Limitation of Liability",
          body: (
            <p>
              In no event will we be liable to you or any third party for any
              direct, indirect, consequential, exemplary, incidental, special,
              or punitive damages arising from your use of the site.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be sent to hello@aximest.com or by
              post to {offices[0].lines.join(", ")}.
            </p>
          ),
        },
      ]}
    />
  );
}
