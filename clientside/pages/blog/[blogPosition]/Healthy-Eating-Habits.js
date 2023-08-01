import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./Blog.module.css";
import { useRouter } from "next/router";
import allblogs from "../../../components/Blog/allblog/allblog.json";
import Link from "next/link";
import Image from "next/image";
const AIRevolution = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);

  const router = useRouter();
  const { blogPosition } = router.query;
  const fullUrl = router.asPath;
  const parts = fullUrl.split("/");
  const faketargetString = parts[parts.length - 1];
  const targetString = faketargetString.split("?")[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here, e.g., add the comment to the comments state
    const newComment = {
      name,
      email,
      message,
      date: new Date().toLocaleDateString(), // Use the current date as an example
      // Add more properties as needed for your comment section
    };
    setComments([...comments, newComment]);
    setName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector(".Exploring-Ancient-History");
    imageWrapper.classList.add("image-first-content");
  }, []);
  return (
    <>
      <div className={`${styles.container} Exploring-Ancient-History`}>
        <Head>
          {/* SEO meta tags */}
          <title>{targetString} - Niraj Chaurasiya</title>
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
          <meta
            property="og:title"
            content={`${targetString} - Niraj Chaurasiya`}
          />
          <meta
            property="og:description"
            content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
          />
          <meta property="og:image" content="/favicon.ico" />
          <meta property="og:url" content="https://www.nirajchaurasiya.com/" />
          <meta property="og:type" content="website" />

          {/* Twitter Card meta tags (for better sharing on Twitter) */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${targetString} - Niraj Chaurasiya`}
          />
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
        <div className={`${styles.mainContent}`}>
          <h1 className={styles.h1}>{targetString}</h1>
          <Image
            height="350"
            width="100"
            className={styles.img}
            src="/blogimage/ai.png"
            alt="AI Revolution"
          />
          <div className={styles.blogPost}>
            <h2>Introduction to AI</h2>
            <p className={styles.point}>
              {`Artificial Intelligence (AI) has become one of the most transformative technologies of our time.
            Its impact can be seen in various industries, from healthcare and finance to education and entertainment.
            In this blog, we will explore the ways AI is revolutionizing the world and shaping our future.`
                .split(".")
                .filter((statement) => statement.trim() !== "")
                .map((e, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {index + 1}
                      {")"} {e.trim()}.
                      <br />
                    </React.Fragment>
                  );
                })}
            </p>
          </div>
          <div className={styles.blogPost}>
            <h2>Transforming Healthcare</h2>
            <p className={styles.point}>
              {` AI is revolutionizing healthcare by accelerating the diagnosis
            process, improving treatment plans, and enhancing patient care.
            Machine learning algorithms can analyze vast amounts of medical data
            to detect patterns and make accurate predictions. Additionally,
            AI-powered robots are assisting in surgeries and performing tasks
            that reduce the workload of medical professionals.`
                .split(".")
                .filter((statement) => statement.trim() !== "")
                .map((e, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {index + 1}
                      {")"} {e.trim()}.
                      <br />
                    </React.Fragment>
                  );
                })}
            </p>
          </div>
          <div className={styles.blogPost}>
            <h2>Advancing Finance and Banking</h2>
            <p className={styles.point}>
              {`In the financial sector, AI is streamlining operations, detecting
            fraud, and providing personalized customer experiences. AI-driven
            chatbots are handling customer inquiries efficiently, while
            predictive analytics helps financial institutions make data-driven
            decisions.`
                .split(".")
                .filter((statement) => statement.trim() !== "")
                .map((e, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {index + 1}
                      {")"} {e.trim()}.
                      <br />
                    </React.Fragment>
                  );
                })}
            </p>
          </div>
          <div className={styles.blogPost}>
            <h2>Enhancing Education</h2>
            <p className={styles.point}>
              {` AI is transforming education through personalized learning
            experiences. Intelligent tutoring systems analyze students' progress
            and tailor educational content to their individual needs. Moreover,
            AI-powered language translation tools are breaking language barriers
            and facilitating global communication.`
                .split(".")
                .filter((statement) => statement.trim() !== "")
                .map((e, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {index + 1}
                      {")"} {e.trim()}.
                      <br />
                    </React.Fragment>
                  );
                })}
            </p>
          </div>
          <div className={styles.blogPost}>
            <h2>Revolutionizing Transportation</h2>
            <p className={styles.point}>
              {`Self-driving cars and autonomous drones are the results of AI
            revolutionizing the transportation industry. These technologies have
            the potential to increase road safety, reduce traffic congestion,
            and transform the way goods are delivered.`
                .split(".")
                .filter((statement) => statement.trim() !== "")
                .map((e, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {index + 1}
                      {")"} {e.trim()}.
                      <br />
                    </React.Fragment>
                  );
                })}
            </p>
          </div>
          <div className={styles.blogPost}>
            <h2>Impact on Entertainment</h2>
            <p className={styles.point}>
              {`AI is making waves in the entertainment sector by enhancing content
            creation and personalization. Recommendation systems powered by AI
            algorithms suggest relevant movies, shows, or music based on users'
            preferences. Additionally, AI-generated content is being used in
            video games and virtual reality experiences.`
                .split(".")
                .filter((statement) => statement.trim() !== "")
                .map((e, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {index + 1}
                      {")"} {e.trim()}.
                      <br />
                    </React.Fragment>
                  );
                })}
            </p>
          </div>
          <div className={styles.blogPost}>
            <h2>Ethical Considerations</h2>
            <p className={styles.point}>
              {`As AI continues to advance, ethical considerations become crucial.
            Ensuring data privacy, preventing bias in AI algorithms, and
            maintaining transparency are some of the challenges that need to be
            addressed to leverage AI for the greater good.`
                .split(".")
                .filter((statement) => statement.trim() !== "")
                .map((e, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {index + 1}
                      {")"} {e.trim()}.
                      <br />
                    </React.Fragment>
                  );
                })}
            </p>
          </div>
          <div className={styles.blogPost}>
            <h2>Conclusion</h2>
            <p className={styles.point}>
              {`The AI revolution is just beginning, and its impact on society will
            continue to grow. From healthcare to entertainment, AI is reshaping
            industries and improving lives. As we move forward, it is essential
            to embrace AI responsibly and work towards harnessing its potential
            for a brighter future. AI's journey is far from over, and with
            ongoing research and development, we can expect even more
            groundbreaking innovations that will shape the world in unimaginable
            ways. Embrace the AI revolution and be part of the transformative
            journey ahead! Remember, the future is not just AI; it's AI combined
            with human creativity and compassion that will truly revolutionize
            the world. So let's embark on this exciting journey together!`
                .split(".")
                .filter((statement) => statement.trim() !== "")
                .map((e, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {index + 1}
                      {")"} {e.trim()}.
                      <br />
                    </React.Fragment>
                  );
                })}
            </p>
          </div>

          <div className={styles.commentSection}>
            <h2>Leave a Comment</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formControl}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formControl}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formControl}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  placeholder="Enter comment"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className={styles.recommendedBlogs}>
          <h2>Recommended Blogs</h2>
          {allblogs
            .filter((blog, index) => index + 1 !== parseInt(blogPosition))
            .map((blog, index) => (
              <div key={index} className={styles.blogCard}>
                <Image
                  src={blog.image}
                  height="200"
                  width="100"
                  alt={`Blog ${index + 1}`}
                />
                <div className={styles.cardContent}>
                  <h3>{blog.name}</h3>
                  <p style={{ color: "var(--text-color)" }}>
                    {blog.description.slice(0, 40)}....
                  </p>
                  <p
                    style={{ color: "var(--text-color)" }}
                    className={styles.author}
                  >
                    Author: {blog.author}
                  </p>
                  <p
                    style={{ color: "var(--text-color)" }}
                    className={styles.date}
                  >
                    Date: {blog.createdAt}
                  </p>
                  <Link href={`/blog/${blog.index}/${blog.name}`} passHref>
                    <button className={styles.button}>Read More..</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AIRevolution;
