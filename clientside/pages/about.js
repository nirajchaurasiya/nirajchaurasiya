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
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta
          name="keywords"
          content="full stack web developer, web applications, front-end, back-end"
        />
        <meta name="author" content="Niraj Chaurasiya" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph meta tags (for better sharing on social media) */}
        <meta property="og:title" content="Niraj Chaurasiya - Home" />
        <meta
          property="og:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta property="og:image" content="/path/to/your/og-image.jpg" />
        <meta
          property="og:url"
          content="https://www.nirajchaurasiya.netlify.app/"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - Home" />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/path/to/your/twitter-image.jpg" />
        <meta
          name="twitter:url"
          content="https://www.nirajchaurasiya.netlify.app/"
        />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <div className="_about_page">
        <div className="my_quick_story">
          <p>My Quick Story</p>
          <p>
            I was an accomplished web developer, having completed a plethora of
            web development projects. One particular project I worked on during
            my college years in 2021 which involved building an online room
            finder, which was aimed at solving the problem of finding rooms.
          </p>
          <p>
            Initially, I was tasked with designing the user interface of the
            website as a front-end developer. However, my colleagues had to
            leave the project midway due to board exams, leaving me alone to
            handle both front-end and back-end development.
          </p>
          <p>
            To tackle the challenge, I had to teach myself PHP, the programming
            language needed for back-end development. Despite encountering
            difficulties in debugging and coding, I persevered and eventually
            succeeded in developing a fully functional website.
          </p>
          <p>
            Overall, the experience taught me valuable lessons in adaptability
            and problem-solving, and solidified my passion for web development.
          </p>
        </div>

        <div className="as_a_web_developer my_quick_story">
          <p>As A Web Developer</p>
          <p>
            I pay close attention to my code&apos;s readability.I am a full
            stack web developer, with a deep passion for creating dynamic and
            functional web applications. With expertise in both front-end and
            back-end development, I am able to bring a holistic approach to
            building websites that not only look great but also provide a
            seamless user experience.
          </p>
        </div>
        <div className="as_a_person my_quick_story">
          <p>As A Person</p>
          <p>
            I am an adventurous person who loves to travel, meet new people, and
            explore the world around me. Whenever I get the chance to travel, I
            am eager to immerse myself in new experiences and break out of my
            daily routine. I enjoy discovering new cultures, learning about the
            history and traditions of different places, and forming connections
            with individuals from all walks of life. Whether it&apos;s hiking
            through a forest, exploring an ancient temple, or wandering through
            a bustling city, I am always excited to explore and learn something
            new.
          </p>
          <p>
            In addition to my love for travel and adventure, I am deeply
            interested in the fields of AI and robotics. I believe that
            technology has the potential to transform our world in unimaginable
            ways, and I am passionate about keeping up-to-date with the latest
            developments in these areas. From studying AI and machine learning
            to exploring the latest trends in robotics, I am always seeking to
            expand my knowledge and push the limits of what&apos;s possible.
          </p>
          <p>
            Finally, I am someone who is always looking for new challenges and
            opportunities to grow both personally and professionally. Whether
            it&apos;s taking on a new project at work or learning a new skill, I
            am always eager to step outside of my comfort zone and push myself
            to the next level. I believe that growth and progress are essential
            to living a fulfilling life, and I am constantly seeking out ways to
            challenge myself and achieve my goals.
          </p>
        </div>
      </div>
    </>
  );
}
