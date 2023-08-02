import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./Blog.module.css";
import { useRouter } from "next/router";
import allblogs from "../../../components/Blog/allblog/allblog.json";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { formatTimeAgo } from "./dateUtils";
import { ToastContainer, toast } from "react-toastify";
const AIRevolution = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [allcomment, setAllcomment] = useState([]);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const router = useRouter();
  const { blogPosition } = router.query;
  const fullUrl = router.asPath;
  const parts = fullUrl.split("/");
  const faketargetString = parts[parts.length - 1];
  const targetString = faketargetString.split("?")[0];
  console.log("=> " + process.env.URI);
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here, e.g., add the comment to the comments state
    if (!name || !email || !message) {
      const notify = () => toast("All the fields are mandatory.");
      notify();
    } else {
      try {
        const newComment = {
          name: name,
          email: email,
          cid: message,
        };
        axios
          .post(`${process.env.URI}/api/addcomment`, newComment)
          .then((data) => {
            const notify = () =>
              toast("Your comment has been added sucessfully");
            notify();
            getAllComment();
          })
          .catch((err) => {
            // console.log(err);
          });

        setName("");
        setEmail("");
        setMessage("");
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const getAllComment = async () => {
    try {
      axios
        .get(`${process.env.URI}/api/getcomment`)
        .then((data) => {
          setAllcomment(data.data.data);
        })
        .catch((err) => {
          const notify = () =>
            toast("Some error occured while fetching all the comments.");
          notify();
        });
    } catch (error) {
      const notify = () =>
        toast("Some error occured while fetching all the comments.");
      notify();
    }
  };
  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector(".Exploring-Ancient-History");
    imageWrapper.classList.add("image-first-content");
    if (localStorage) {
      if (localStorage.getItem("nkcdata")) {
        setIsUserVerified(true);
      }
    }
    getAllComment();
  }, []);

  const DeleteComment = (_id) => {
    if (
      confirm(
        "Are you sure, you want to delete this comment? This action is irreversible"
      )
    ) {
      try {
        axios
          .delete(`${process.env.URI}/api/deletecomment`, {
            data: { id: _id.toString() }, // Send the data object here
          })
          .then((data) => {
            const notify = () =>
              toast("Your comment has been deleted successfully");
            notify();
            getAllComment();
          })
          .catch((err) => {
            const notify = () =>
              toast("Some error occured while deleting your comment.");
            notify();
          });
      } catch (error) {
        const notify = () =>
          toast("Some error occured while deleting your comment.");
        notify();
      }
    }
  };

  const updateComment = (_id, currentComment) => {
    const updatedCommentText = prompt(
      "Enter your updated comment:",
      currentComment
    );
    const updatedComment = {
      id: _id,
      cid: updatedCommentText,
    };
    axios
      .put(`${process.env.URI}/api/updatecomment`, updatedComment)
      .then((response) => {
        const notify = () =>
          toast("Your comment has been updated successfully");
        notify();
        getAllComment();
      })
      .catch((error) => {
        // Handle error, e.g., display an error message
        const notify = () =>
          toast("Some error occured while updating your comment.");
        notify();
      });
  };

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
          <meta property="og:url" content="https://www.nirajchaurasiya.com" />
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
          <meta name="twitter:url" content="https://www.nirajchaurasiya.com" />

          {/* Other meta tags */}
          <link
            rel="shortcut icon"
            href="/assests/logo.jpg"
            type="image/x-icon"
          />
        </Head>
        <ToastContainer />
        <div className={`${styles.mainContent}`}>
          <h1 className={styles.h1}>{targetString}</h1>
          <div
            style={{
              padding: "0px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>
              Author : <span style={{ color: "red" }}>Niraj Chaurasiya</span>
            </p>
            <p>Date : 2023-07-25</p>
          </div>
          <Image
            height="350"
            width="100"
            className={styles.img}
            src="/blogimage/ai.png"
            alt="AI Revolution"
          />
          <div className={styles.blogPost}>
            <h2>Introduction to AI</h2>
            <br />

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
            <h2>Leave a Comment ({allcomment?.length})</h2>
            {isUserVerified ? (
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
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className={styles.submitButton}
                >
                  Submit
                </button>
              </form>
            ) : (
              <div>You must login to comment</div>
            )}

            <div className={styles.commentList}>
              {allcomment?.map((e, index) => {
                return (
                  <div key={index}>
                    <div className={styles.commentProfile}>
                      <Image
                        src="/guy.jpg"
                        width={200}
                        height={200}
                        alt="user"
                      />
                      <p className={styles.profileName}>
                        {e?.name} <span>{formatTimeAgo(e.createdAt)}</span>
                      </p>
                    </div>
                    <div className={styles.commentText}>{e?.cid}</div>
                    <div className={styles.actionButton}>
                      <button
                        onClick={() => {
                          // console.log(e?._id);
                          DeleteComment(e?._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          updateComment(e?._id, e?.cid);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* {Comment} */}
          </div>
        </div>
        <div className={styles.recommendedBlogs}>
          <h2>Recommended Blogs</h2>
          {allblogs.filter(
            (blog, index) => index + 1 !== parseInt(blogPosition)
          ).length > 0 ? (
            allblogs
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
              ))
          ) : (
            <div>
              <br />
              <h4>No recommended blog found</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIRevolution;
