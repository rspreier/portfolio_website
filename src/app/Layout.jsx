import React from 'react';
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'

export default function Layout(props) {
    return (
        <>
            <Head>
                <title>Ryan Spreier's Website</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {props.children}
        </>
    )
}