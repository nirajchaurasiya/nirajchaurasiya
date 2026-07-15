"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

type SubmissionState = {
  status: "idle" | "submitting" | "success" | "error";

  message: string;
};

const initialState: SubmissionState = {
  status: "idle",

  message: "",
};

export default function ContactForm() {
  const [state, setState] = useState(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    setState({
      status: "submitting",

      message: "Sending your message…",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.get("name"),

          email: formData.get("email"),

          subject: formData.get("subject"),

          message: formData.get("message"),

          sourcePath: window.location.pathname,
        }),
      });

      const result: unknown = await response.json();

      const message =
        typeof result === "object" &&
        result !== null &&
        typeof Reflect.get(result, "message") === "string"
          ? String(Reflect.get(result, "message"))
          : response.ok
            ? "Your message was received."
            : "The message could not be sent.";

      if (!response.ok) {
        throw new Error(message);
      }

      form.reset();

      setState({
        status: "success",

        message,
      });
    } catch (error) {
      setState({
        status: "error",

        message:
          error instanceof Error
            ? error.message
            : "The message could not be sent.",
      });
    }
  }

  const isSubmitting = state.status === "submitting";

  return (
    <form
      className="cms-contact-form"
      id="contact-form"
      onSubmit={handleSubmit}
    >
      <div className="cms-contact-form__heading">
        <span>Send a message</span>

        <h2>Start with the context.</h2>

        <p>
          Explain what you are working on, why you are reaching out, and what
          kind of response would be useful.
        </p>
      </div>

      <div className="cms-contact-form__fields">
        <label>
          <span>Name</span>

          <input
            type="text"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
          />
        </label>

        <label>
          <span>Email</span>

          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={200}
            required
          />
        </label>

        <label className="cms-contact-form__wide">
          <span>Subject</span>

          <input type="text" name="subject" maxLength={160} required />
        </label>

        <label className="cms-contact-form__wide">
          <span>Message</span>

          <textarea
            name="message"
            rows={9}
            minLength={20}
            maxLength={5_000}
            required
          />
        </label>
      </div>

      <footer>
        <p>
          Do not include passwords, financial information, or other sensitive
          personal data.
        </p>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle size={16} className="cms-contact-form__spinner" />
          ) : (
            <Send size={16} />
          )}

          {isSubmitting ? "Sending" : "Send message"}
        </button>
      </footer>

      {state.status !== "idle" && (
        <div
          className={`cms-contact-form__status cms-contact-form__status--${state.status}`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.status === "success" && <CheckCircle2 size={17} />}

          <span>{state.message}</span>
        </div>
      )}
    </form>
  );
}
