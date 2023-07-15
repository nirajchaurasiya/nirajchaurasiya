import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import Link from 'next/link'
import Image from 'next/image';
export default function Navbar() {
    const [showMbleNave, setShowMbleNave] = useState(false)
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        if (localStorage) {
            document.body.className = localStorage.getItem('darkmodenkc')
        }
        else {
            document.body.className = isLightMode ? 'dark' : 'light';
        }
    }, [isLightMode]);


    function toggleTheme() {
        setIsLightMode(!isLightMode);
        localStorage.setItem('darkmodenkc', !isLightMode ? 'light' : 'dark');
    }
    return (
        <div className={styles.navbar}>
            <ul className={styles.first_navbar}>
                <Link href="/" className={styles.logo}>Niraj Chaurasiya</Link>
            </ul>
            <ul className={`${styles.second_nav} hideInPhone`}>
                <Link style={{ textDecoration: "none" }} href="/"><li>Home</li></Link>
                <Link style={{ textDecoration: "none" }} href='/contact'><li>Contact</li></Link>
                <Link style={{ textDecoration: "none" }} href='/about'><li>About</li></Link>
                <Link style={{ textDecoration: "none" }} href='/projects'><li>Projects</li></Link>
                <Link style={{ textDecoration: "none" }} href='/blog'><li>Blog</li></Link>
            </ul>
            <div className={styles.thirdNav} style={{ listStyle: "none", alignItems: "center", display: "flex" }}>
                <Link style={{ textDecoration: "none" }} className='hideInPhone' href="/login"><li>Login</li></Link>
                <Link style={{ textDecoration: "none", userSelect: "none" }} className='hideInPhone' href="/register"><li>Register</li></Link>
                <li className={styles.themeToggle} onClick={toggleTheme}>
                    {!isLightMode ? <span><Image width={20} height={20} src="https://img.icons8.com/arcade/256/sun.png" alt="" /></span> : <span><Image width={20} height={20} src="https://img.icons8.com/sf-black-filled/256/moon-symbol.png" alt="" /></span>}
                </li>
                <div className={styles.mble_navbar}>
                    <div style={{ display: "grid", gap: "5px" }} onClick={() => { setShowMbleNave(!showMbleNave) }}>
                        <div></div><div></div><div></div>
                    </div>
                    {showMbleNave && <ul>
                        <Link style={{ textDecoration: "none" }} href="/"><li>Home</li></Link>
                        <Link style={{ textDecoration: "none" }} href='/contact'><li>Contact</li></Link>
                        <Link style={{ textDecoration: "none" }} href='/about'><li>About</li></Link>
                        <Link style={{ textDecoration: "none" }} href='/projects'><li>Projects</li></Link>
                        <Link style={{ textDecoration: "none" }} href='/blog'><li>Blog</li></Link>
                        <Link style={{ textDecoration: "none" }} href='/login'><button style={{ padding: "10px", width: "100%", border: "1px solid var(--nav-text-color)", outline: "none", backgroundColor: "transparent", color: "var(--nav-text-color)" }}>Login</button></Link>
                        <Link style={{ textDecoration: "none" }} href='/register'><button style={{ padding: "10px", width: "100%", border: "1px solid var(--nav-text-color)", outline: "none", backgroundColor: "transparent", color: "var(--nav-text-color)" }}>Register</button></Link>
                    </ul>}
                </div>
            </div>


        </div>
    )
}
