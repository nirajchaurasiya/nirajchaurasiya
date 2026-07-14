import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FlaskConical,
  Mail,
  MessageSquareText,
  Mic2,
} from "lucide-react";
import ContactForm from "./ContactForm";

const contactAreas = [
  {
    title: "Research",
    description:
      "Questions or feedback related to behavioral evidence, learning, systems, or uncertainty.",
    icon: FlaskConical,
    href: "/research",
  },
  {
    title: "Engineering and software",
    description:
      "Collaboration around mechanical systems, robotics, software platforms, or product architecture.",
    icon: BriefcaseBusiness,
    href: "/work",
  },
  {
    title: "Speaking and communication",
    description:
      "Talks, presentations, interviews, educational media, or technical communication.",
    icon: Mic2,
    href: "/media",
  },
];

export default function ContactPage() {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div>
          <p className="section-eyebrow">
            Contact
          </p>

          <h1>
            Start with enough context
            <span>to make the conversation useful.</span>
          </h1>

          <p>
            Contact me about research, engineering,
            software, public communication, or one of
            the projects documented on this website.
          </p>
        </div>

        <aside>
          <MessageSquareText
            size={25}
            strokeWidth={1.6}
            aria-hidden="true"
          />

          <span>Useful messages include</span>

          <ul>
            <li>
              What you are working on.
            </li>

            <li>
              Why you are reaching out.
            </li>

            <li>
              The specific question or opportunity.
            </li>

            <li>
              Relevant links or background.
            </li>
          </ul>
        </aside>
      </section>

      <section className="contact-areas">
        {contactAreas.map((area) => {
          const Icon = area.icon;

          return (
            <Link
              href={area.href}
              key={area.title}
            >
              <Icon
                size={21}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <h2>{area.title}</h2>
              <p>{area.description}</p>

              <ArrowUpRight
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </section>

      <section className="contact-form-section">
        <div className="contact-form-section__introduction">
          <p className="section-eyebrow">
            Send a message
          </p>

          <h2>
            What would you like to discuss?
          </h2>

          <p>
            Messages submitted here will eventually
            appear inside the private analytics and
            content-management platform.
          </p>

          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="contact-email-link"
            >
              <Mail
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span>
                <small>Or email directly</small>
                <strong>
                  {contactEmail}
                </strong>
              </span>
            </a>
          )}
        </div>

        <ContactForm />
      </section>
    </div>
  );
}