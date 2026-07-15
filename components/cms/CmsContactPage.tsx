import { Clock3, Mail, MapPin, MessagesSquare } from "lucide-react";

import ContactForm from "@/components/contact/ContactForm";

import { parseCmsContent, readDetailString } from "@/lib/cms/content-data";

import type { CmsContentEntry } from "@/lib/cms/types";

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  description: string;
};

function readRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readChannels(value: unknown): ContactChannel[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((rawChannel, index) => {
      const channel = readRecord(rawChannel);

      return {
        id: readString(channel.id) || `channel-${index + 1}`,

        label: readString(channel.label),

        value: readString(channel.value),

        href: readString(channel.href),

        description: readString(channel.description),
      };
    })
    .filter((channel) => channel.label || channel.value || channel.description);
}

export default function CmsContactPage({ entry }: { entry: CmsContentEntry }) {
  const content = parseCmsContent(entry.data);

  const location = readDetailString(content.details, "location");

  const responseNote = readDetailString(content.details, "responseNote");

  const email = readDetailString(content.details, "contactEmail");

  const channels = readChannels(content.details.channels);

  return (
    <main className="cms-contact">
      <header className="cms-contact__hero">
        <div>
          <span>{content.hero.eyebrow || "Contact"}</span>

          <h1>{entry.title}</h1>

          <p className="cms-contact__summary">{entry.summary}</p>

          {content.hero.description && (
            <p className="cms-contact__description">
              {content.hero.description}
            </p>
          )}

          <div className="cms-contact__metadata">
            {location && (
              <span>
                <MapPin size={15} />

                {location}
              </span>
            )}

            {responseNote && (
              <span>
                <Clock3 size={15} />
                Response time varies
              </span>
            )}
          </div>
        </div>

        <MessagesSquare size={30} strokeWidth={1.4} />
      </header>

      {(email || channels.length > 0 || responseNote) && (
        <section className="cms-contact__channels">
          {email && (
            <a href={`mailto:${email}`}>
              <Mail size={19} />

              <div>
                <span>Email</span>

                <strong>{email}</strong>
              </div>
            </a>
          )}

          {channels.map((channel) => {
            const content = (
              <>
                <MessagesSquare size={19} />

                <div>
                  <span>{channel.label}</span>

                  {channel.value && <strong>{channel.value}</strong>}

                  {channel.description && <p>{channel.description}</p>}
                </div>
              </>
            );

            return channel.href ? (
              <a href={channel.href} key={channel.id}>
                {content}
              </a>
            ) : (
              <article key={channel.id}>{content}</article>
            );
          })}

          {responseNote && (
            <article>
              <Clock3 size={19} />

              <div>
                <span>Response note</span>

                <p>{responseNote}</p>
              </div>
            </article>
          )}
        </section>
      )}

      {content.sections.length > 0 && (
        <section className="cms-collection-landing__introduction">
          {content.sections.map((section, index) => (
            <article id={section.id} key={section.id}>
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>

                {section.heading && <h2>{section.heading}</h2>}
              </header>

              <div>
                {section.body && <p>{section.body}</p>}

                {section.points.length > 0 && (
                  <ul>
                    {section.points.map((point, pointIndex) => (
                      <li key={`${section.id}-${pointIndex}`}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      <ContactForm />
    </main>
  );
}
