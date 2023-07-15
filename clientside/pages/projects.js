import Head from 'next/head'
import React, { useState } from 'react'
import Image from 'next/image'
import project from './projects/project.json'
export default function Projects() {
    const [project_all_data, setProject_all_data] = useState(project)
    return (
        <>
            <Head>
                <title>Niraj Chaurasiya - Porjects</title>
                <link rel="shortcut icon" href="/assests/logo.jpg" type="image/x-icon" />
            </Head>
            <div className="filter_btn" style={{ textAlign: "center" }}>
                <p>Filter</p>
            </div>
            <div className="box">
                <select onChange={(e) => {
                    e.target.value.toLowerCase() === "all" ? setProject_all_data(project) : setProject_all_data(project.filter(cat => e.target.value.toLowerCase() === cat.category.toLowerCase()));
                }}>
                    <option value="all" defaultChecked>All App</option>
                    <option value="ecommerce" >Ecommerce App</option>
                    <option value="productivity">Productivity App</option>
                    <option value="socialmedia">Social Media App</option>
                    <option value="videouploading">Video Uploading App</option>
                    <option value="chat">Chat App</option>
                    <option value="ai">AI App</option>
                </select>
            </div>
            <div className="project-page_card" style={{ width: "80vw" }}>
                <div className="_project-pages_card">
                    {project_all_data.map((e, i) => {
                        return (
                            <div key={i} className="item_card_project-pages">
                                <Image style={{ objectFit: "cover" }} width={200} height={200} src={e.image} alt="" />
                                <div className="project-pages_heading">
                                    <p>{e?.name}</p>
                                    <p>{e.desc}</p>
                                </div>
                                <button onClick={() => {
                                    window.open(e.url, "_blank")
                                }} >See More</button>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}
