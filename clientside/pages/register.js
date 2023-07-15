import Head from 'next/head';
import React, { useState } from 'react'

export default function Register() {
    const [isPasswordSeen, setIsPasswordSeen] = useState('password')
    const [isPasswordSeenText, setIsPasswordSeenText] = useState('😎')
    return (
        <>
            <Head>
                <title>Niraj Chaurasiya - Register Now</title>
                <link rel="shortcut icon" href="/assests/logo.jpg" type="image/x-icon" />
            </Head>
            <div style={{ marginTop: "5%" }}>
                <p style={{ textAlign: "center", fontSize: "24px", fontWeight: "700" }}>Register Now</p>
                <div className="_form_section">
                    <div className="mid_form_section">
                        <input type="text" placeholder='Enter your Name' />
                        <input type="text" placeholder='Enter Email' />
                    </div>
                    <div className="mid_form_section_mid">
                        <input type={isPasswordSeen} placeholder='Enter Password' />
                        <input type={isPasswordSeen} placeholder='Confirm Your Password' />
                        <button style={{ height: "100%", width: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => { setIsPasswordSeen(isPasswordSeen === 'password' ? 'text' : 'password'); setIsPasswordSeenText(isPasswordSeenText === "😀" ? "😎" : "😀") }}>{isPasswordSeenText}</button>
                    </div>
                    <button>Register</button>
                </div>


            </div>
        </>
    )
}
