"use client";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";
import {
  FormEvent,
  useState,
} from "react";

type FormState =
  | {
      status: "idle";
      message: "";
    }
  | {
      status: "submitting";
      message: "";
    }
  | {
      status: "success" | "error";
      message: string;
    };

const initialState: FormState = {
  status: "idle",
  message: "",
};

export default function ContactForm() {
  const [state, setState] =
    useState<FormState>(initialState);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({
      status: "submitting",
      message: "",
    });

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            reason: formData.get("reason"),
            subject: formData.get("subject"),
            message: formData.get("message"),
            company: formData.get("company"),
          }),
        },
      );

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.message ??
            "The message could not be sent.",
        );
      }

      form.reset();

      setState({
        status: "success",
        message:
          result.message ??
          "Your message was sent successfully.",
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

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
    >
      <div className="contact-form__row">
        <label>
          <span>Name</span>

          <input
            type="text"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            placeholder="Your name"
          />
        </label>

        <label>
          <span>Email</span>

          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={180}
            required
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label>
        <span>Reason for contacting</span>

        <select
          name="reason"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Choose a reason
          </option>

          <option value="Research">
            Research
          </option>

          <option value="Engineering">
            Engineering
          </option>

          <option value="Collaboration">
            Collaboration
          </option>

          <option value="Speaking">
            Speaking or presentation
          </option>

          <option value="Project">
            Project question
          </option>

          <option value="Other">
            Something else
          </option>
        </select>
      </label>

      <label>
        <span>Subject</span>

        <input
          type="text"
          name="subject"
          minLength={3}
          maxLength={160}
          required
          placeholder="What is the message about?"
        />
      </label>

      <label>
        <span>Message</span>

        <textarea
          name="message"
          minLength={20}
          maxLength={5000}
          required
          rows={8}
          placeholder="Provide enough context for me to understand the question or opportunity."
        />
      </label>

      <label
        className="contact-form__honeypot"
        aria-hidden="true"
      >
        <span>Company</span>

        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className="contact-form__footer">
        <p>
          Please do not include confidential,
          financial, medical, or legally sensitive
          information.
        </p>

        <button
          type="submit"
          disabled={
            state.status === "submitting"
          }
        >
          {state.status === "submitting" ? (
            <LoaderCircle
              className="contact-form__spinner"
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          ) : (
            <Send
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}

          {state.status === "submitting"
            ? "Sending..."
            : "Send message"}
        </button>
      </div>

      {state.status === "success" && (
        <div
          className="contact-form-message contact-form-message--success"
          role="status"
        >
          <CheckCircle2
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <p>{state.message}</p>
        </div>
      )}

      {state.status === "error" && (
        <div
          className="contact-form-message contact-form-message--error"
          role="alert"
        >
          <AlertCircle
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <p>{state.message}</p>
        </div>
      )}
    </form>
  );
}