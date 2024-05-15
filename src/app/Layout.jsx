import React from 'react';
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

export default function Layout(props) {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    )
}