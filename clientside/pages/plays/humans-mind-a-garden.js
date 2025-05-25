import React, { useEffect } from "react";
import alltheconversation from "./conversation_json/humansmind.json";
import Head from "next/head";
export default function HumansMindAGarden() {
  useEffect(() => {
    const dialoguePartsContainer = document.getElementById(
      "dialogue_parts_container"
    );
    const loader = document.getElementById("loader");

    const loadDialoguesContent = async () => {
      loader.style.display = "block";

      try {
        const data = alltheconversation;

        dialoguePartsContainer.innerHTML = "";

        data.forEach((partData, index) => {
          const dialoguePart = document.createElement("div");
          dialoguePart.className = "dialogues_content";
          dialoguePart.innerHTML = `
            <p class="part_${index + 1}" style="font-weight: 600;">${
            partData.part
          }</p>
            <p class="part_${index + 1}">${partData.location}</p>
            <p class="characters_entry" style="font-size: 16px;">${
              partData.entry
            }</p>
            <div class="dialogues_conversation"></div>
            <p class="exit_word">(Exit)</p>
            <div class="line_conversation"></div>
        `;

          dialoguePartsContainer.appendChild(dialoguePart);

          const conversationContainer = dialoguePart.querySelector(
            ".dialogues_conversation"
          );

          partData.conversation.forEach((item) => {
            const dialogueItem = document.createElement("div");
            dialogueItem.classList.add("dialogue_conversation");
            dialogueItem.innerHTML = item.msg
              ? item.enter
                ? `<p class="exit_word">${item.enter}</p>`
                : item.exit
                ? `<p class="exit_word">${item.exit}</p>`
                : `<h5 class="character_dialogue">${item.actual_msg}</h5>`
              : item.example
              ? `
                    <div class='character_name'>${item.name}</div>
                    <div class='character_dialogue'>${item.dialogue}</div>
                    <div class='character_dialogue'>${item.example}</div>
                `
              : `
                    <div class='character_name'>${item.name}</div>
                    <div class='character_dialogue'>${item.dialogue}</div>
                `;
            conversationContainer.appendChild(dialogueItem);
          });
        });

        loader.style.display = "none";
      } catch (error) {
        console.error("Error fetching dialogues content:", error);
      }
    };

    loadDialoguesContent();
  }, []);
  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>Human&apos;s Mind - A Garden - Niraj Chaurasiya</title>
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
          content="Human's Mind - A Garden - Niraj Chaurasiya"
        />
        <meta
          property="og:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta
          property="og:url"
          content="https://www.nirajchaurasiya.netlify.app/"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Human's Mind - A Garden - Niraj Chaurasiya"
        />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/favicon.ico" />
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
      <div className="dramatic_dialogue_content_width">
        <div className="dramatic_dialogue_content">
          <div>
            <p className="drama_title">Human&apos;s Mind - A Garden</p>
          </div>
          <div className="characters">
            <p>Characters of the play</p>
            <p className="characters_1">College Students</p>
            <div className="characters_play_line_1"></div>
            <ul className="characters_name">
              <li>Marcus</li>
              <li>Angela</li>
            </ul>
            <p className="characters_1">At The Church</p>
            <div className="characters_play_line_2"></div>
            <ul className="characters_name">
              <li>
                Cales -{" "}
                <span className="description">James&apos;s Follower</span>
              </li>
              <li>
                James -
                <span className="description">
                  A Church Father & A Reputed Teacher
                </span>
              </li>
            </ul>
          </div>
          <div className="hr_line"></div>

          <div id="dialogue_parts_container"></div>
        </div>
        <div className="important_notice">
          <div>
            Note: To enhance your understanding of the archaic words used in
            this play, you can refer to the dedicated archaic words dictionary
            available on{" "}
            <button
              onClick={() => {
                window.open(
                  "https://personal-dictionary.onrender.com",
                  "_blank"
                );
              }}
            >
              https://personal-dictionary.onrender.com
            </button>
            . This resource provides meanings for the archaic words used
            throughout the text.
          </div>
        </div>
      </div>
      <div id="loader" className="loader"></div>
    </>
  );
}
