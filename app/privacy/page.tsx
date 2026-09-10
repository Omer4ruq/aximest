import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you share.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="January 16, 2026"
      sections={[
        {
          heading: "What We Collect",
          body: (
            <>
              <p>
                We collect only what you send us through the contact form: your
                name, email address, phone number, company and message.
              </p>
              <p>
                We also collect anonymous, aggregated analytics about how the
                site is used. That data cannot be traced back to you.
              </p>
            </>
          ),
        },
        {
          heading: "How We Use It",
          body: (
            <p>
              To reply to your enquiry and, where an engagement follows, to
              deliver the work. We do not sell your information, and we do not
              share it with third parties except where a subprocessor is
              required to operate the site.
            </p>
          ),
        },
        {
          heading: "Retention",
          body: (
            <p>
              Enquiries are retained for two years, after which they are
              deleted. Records relating to an active engagement are kept for as
              long as the contract and applicable law require.
            </p>
          ),
        },
        {
          heading: "Your Rights",
          body: (
            <p>
              You can ask us what we hold about you, ask for it to be corrected,
              or ask for it to be deleted. Write to hello@aximest.com and we
              will respond within thirty days.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Privacy questions can be directed to hello@aximest.com or to{" "}
              {site.name} at the Montreal address listed in the footer.
            </p>
          ),
        },
      ]}
    />
  );
}
