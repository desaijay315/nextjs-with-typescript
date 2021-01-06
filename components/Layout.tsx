import React from 'react'
import Link from "next/link";

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div className="page">
        <Link href="/">
            <a className="logo">
                <img src="/logo.png" alt="Logo" />
            </a>
        </Link>
        {children}
    </div>
}

export default Layout;