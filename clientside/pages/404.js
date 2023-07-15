import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
export default function ErrorPage() {
    return (
        <>
            <Head>

                <title>Niraj Chaurasiya - 404 - Error Page</title>
                <link rel="shortcut icon" href="/assests/logo.jpg" type="image/x-icon" />

            </Head>
            <div className="error_page">
                <div className='error_page_mid'>
                    <p>404</p>
                    <p>Page Not Found On This Server</p>
                    <Link href='/'><button>Go To Home</button></Link>
                </div>
            </div>
        </>
    )
}
