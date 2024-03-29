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
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www.nirajchaurasiya.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - Home" />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="twitter:url" content="https://www.nirajchaurasiya.com/" />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <div className="_about_page">
        <div className="my_quick_story">
          <p>My Quick Story </p>
          <p>
            Hello there! I&apos;m Niraj Kumar Chaurasiya, a web developer who
            loves crafting websites that look great and work smoothly. I&apos;ve
            got a knack for taking complex code and turning it into
            user-friendly websites that people enjoy using. I&apos;ve spent time
            mastering skills in frontend and backend, and I&apos;m all about
            making websites that not only look cool but also make sense for the
            people who use them. It all started when I got curious about how the
            internet works, and now I get to create all sorts of things online.
            From online stores that make shopping a breeze to apps that solve
            everyday problems, I&apos;m here to bring creative ideas to life
            using the latest techie stuff.
          </p>
          <p>
            My very first project was an online room-finding application during
            my college days. Initially, I was tasked with handling the front-end
            part, but due to our final exams, my friends left me in the middle
            of the journey. I had already completed the front-end part of the
            website, so I needed to tackle the backend portion to complete the
            project. However, I had no prior experience with backend development
            since my expertise lay in frontend engineering. Since childhood,
            I&apos;ve had a strong determination to achieve the goals I set for
            myself. Hence, I searched for a backend language that would suit my
            project. After careful consideration, I decided to go with PHP, one
            of the oldest languages in the world. With determination and
            perseverance, I successfully completed the project, &quot;Online
            Room Finder.&quot;
          </p>
          <p>
            Overall, the experience taught me valuable lessons in adaptability
            and problem-solving, and solidified my passion for web development.
            It helped me to know, &quot;how to solve any problem in web
            development&quot;.
          </p>
        </div>

        <div className="as_a_web_developer my_quick_story">
          <p>As A Web Developer </p>
          <p>
            I pay close attention to the readability of my code. As a full stack
            web developer, I harbor a profound passion for crafting dynamic and
            functional web applications. Possessing expertise in both front-end
            and back-end development, I adopt a holistic approach to construct
            websites that excel in appearance and offer a seamless user
            experience.
            <br />
            No matter what kind of challenge comes up, I&apos;m up for it. I
            enjoy solving problems, no matter how tough or time-consuming they
            may be.
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
            Beyond my work in technology, I find joy in diving into new books,
            whether they&apos;re novels, biographies, plays, stories, or dramas.
            In my free time, I also like to put pen to paper and write, taking a
            break from my daily routines. Embracing these activities not only
            helps me recharge but also contributes to my overall growth and
            perspective. In the world of technology and development, it&apos;s
            these diverse interests that add layers to who I am and infuse a
            sense of balance into my life.
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
