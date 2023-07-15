import styles from './Midnavbar.module.css'
import lang from '../../languages/lang.json'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useState } from 'react'
export default function MidNavbar() {
    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <>
            <div className={`${styles.MidNavbar} inPhone`}>
                <ul className={styles.first_MidNavbar}>
                    {lang ? lang.slice(0, 3).map((e, i) => {
                        return (
                            <li key={i}>{e}</li>
                        )
                    }) : ''}

                    <button onClick={() => {
                        setShowDropdown(!showDropdown)
                    }}>More<MdKeyboardArrowDown style={{ fontSize: "20px" }} />

                    </button>
                </ul>
            </div>
            {showDropdown && <ul className={styles.first_MidNavbar_drop_down}>
                {lang ? lang.slice(3).map((e, i) => {
                    return (
                        <li key={i}>{e}</li>
                    )
                }) : ''}
            </ul>}
        </>
    )
}

