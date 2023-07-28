import React, { useEffect } from "react";
import Image from "next/image";
import blog_all_data from "./allblog/allblog.json";
import Link from "next/link";
export default function Blog() {
  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector(".project-page_card");
    imageWrapper.classList.add("image-first-content");
  }, []);
  return (
    <div className="project-page_card" style={{ width: "80vw" }}>
      <div className="_project-pages_card">
        {blog_all_data.map((e, i) => {
          return (
            <div
              key={i}
              style={{
                border: "1px solid var(--nav-text-color)",
                padding: "10px",
              }}
              className="item_card_project-pages"
            >
              <Image
                style={{ objectFit: "cover" }}
                width={200}
                height={200}
                src={e.image}
                alt=""
              />
              <div className="project-pages_heading">
                <p>{e?.name}</p>
                <p>{e.description}</p>
                <p>
                  Author: <span style={{ color: "red" }}> {e.author}</span>
                </p>
                <p>CreatedAt: {e.createdAt}</p>
              </div>
              <Link href={`/blog/${e.index}/${encodeURIComponent(e.name)}`}>
                <button>See More</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
