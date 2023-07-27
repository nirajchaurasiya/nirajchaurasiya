import React from "react";
import project from "./project.json";
import { HiOutlineExternalLink } from "react-icons/hi";
export default function Project(props) {
  return (
    <>
      <div>
        <div className="project_description_contents">
          <div className="project_title_desc">
            <p>{project[props.projectPos - 1]?.project_title}</p>
            <p>{project[props.projectPos - 1]?.project_description}</p>
          </div>

          <div className="specific_project_image">
            <img
              src={project[props.projectPos - 1]?.project_image_url}
              alt=""
            />
          </div>

          <div className="specific_project_description">
            <h4>About</h4>
            <p>{project[props.projectPos - 1]?.about}</p>
          </div>
          <br />
          <div className="specific_project_history">
            <h4>History</h4>
            <p>{project[props.projectPos - 1]?.history}</p>
          </div>
          <br />
          <div className="specific_project_tech">
            <h4>Technologies used</h4>
            <div className="tech">
              {project[props.projectPos - 1]?.technologies_used.map(
                (e, index) => (
                  <div key={index} className="html">
                    <img
                      style={{ width: e.style.width, height: e.style.height }}
                      src={e?.image}
                      alt={e?.title}
                      title={e?.title}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <br />
          <div className="specific_project_links">
            <div className="github_link">
              <h4>Github</h4>
              <button
                onClick={() => {
                  window.open(
                    "https://github.com/nirajchaurasiya/onlineroomfinder",
                    "_blank"
                  );
                }}
              >
                https://github.com/nirajchaurasiya/onlineroomfinder
              </button>
            </div>
            <br />
            <div className="website_link">
              <h4>Website link</h4>
              <button
                onClick={() => {
                  window.open("https://onlineroomfinder.epizy.com", "_blank");
                }}
              >
                https://onlineroomfinder.epizy.com
              </button>
            </div>
          </div>
          <br />
        </div>

        <button
          className="open_project_links"
          onClick={() => {
            window.open(
              "https://github.com/nirajchaurasiya/onlineroomfinder",
              "_blank"
            );
          }}
        >
          Open Project <HiOutlineExternalLink style={{ fontSize: "22px" }} />{" "}
        </button>
      </div>
    </>
  );
}
