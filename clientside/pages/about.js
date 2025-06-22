import Head from "next/head";
import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector("._about_page");
    imageWrapper.classList.add("image-first-content");
  }, []);
  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>About - Niraj Chaurasiya</title>
        <meta
          name="description"
          content="I am a passionate mechanical engineering student and aspiring robotics developer. Driven by curiosity, emotional growth, and a desire to complement technology with human creativity."
        />
        <meta
          name="keywords"
          content="mechanical engineering, robotics, AI, personal growth, programming, full stack development"
        />
        <meta name="author" content="Niraj Chaurasiya" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Niraj Chaurasiya - About Me" />
        <meta
          property="og:description"
          content="A mechanical engineering student focused on robotics and AI, with a strong foundation in programming, emotional intelligence, and personal growth."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www..com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - About Me" />
        <meta
          name="twitter:description"
          content="A mechanical engineering student focused on robotics and AI, with a strong foundation in programming, emotional intelligence, and personal growth."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="twitter:url" content="https://www..com/about" />

        {/* Favicon */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <div className="_about_page">
        <div className="my_quick_story">
          <p>My Journey So Far</p>
          <p>
            Hello! I&apos;m Niraj Kumar Chaurasiya, currently pursuing a
            Bachelor&apos;s degree in Mechanical Engineering with a deep passion
            for robotics and artificial intelligence. After transitioning from a
            background in full stack development during a gap period, I am now
            committed to building a future where technology complements humans
            rather than replaces them.
          </p>
          <p>
            My technical journey began with web development, mastering both
            front-end and back-end skills. Today, I am expanding my expertise
            into statics, C++, MATLAB, and Arduino to become internship-ready
            for CPT and beyond. Inspired by visionaries like Elon Musk and the
            fictional Tony Stark, I aim to blend creativity and engineering to
            build innovative solutions.
          </p>
          <p>
            Alongside my technical ambitions, I am emotionally self-aware,
            valuing deep and meaningful connections. My experiences with
            friendships and emotional growth have taught me the power of
            loyalty, dignity, and silent strength. I believe that true growth
            comes from turning pain into progress and staying true to one&apos;s
            values.
          </p>
        </div>

        <div className="as_a_technologist my_quick_story">
          <p>As A Technologist</p>
          <p>
            I am fascinated by the potential of AI and robotics to transform our
            world. My goal is to harness these technologies to create tools that
            complement human abilities rather than replace them. I thrive on
            learning new programming languages, frameworks, and engineering
            principles to continuously level up my skills.
            <br />
            Problem-solving is my passion — no matter how complex or challenging
            a task is, I dive in with patience and persistence.
          </p>
        </div>

        <div className="as_a_person my_quick_story">
          <p>As A Person</p>
          <p>
            I am adventurous and curious, loving to explore new cultures and
            ideas through travel, books, and meaningful conversations. Writing
            is a way I express myself and recharge from daily routines.
          </p>
          <p>
            I value independence, growth, and authenticity above all. My
            personal philosophy centers on pushing myself beyond comfort zones
            and embracing challenges as opportunities to evolve.
          </p>
          <p>
            Above all, I seek to build a meaningful life and career that not
            only reflects my skills but also my integrity and empathy — quietly
            inspiring others by example.
          </p>
        </div>
      </div>
    </>
  );
}
