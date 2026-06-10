// import { Image } from 'astro:assets';

import React, {useState} from 'react';
import {blogUrl, wikiUrl} from "../util/constants.ts";

// TODO Convert this into an astro file later.

export function Navbar() {
    return (
        <>
            <NavbarContent/>
        </>
    )

}

/**
 * Display a navbar link in the navbar.
 * @param linkUrl The url to redirect to, such as '/video-player'.
 */
function NavbarLink({href, title}: { href: string; title: string }) {
    return (
        <a href={href}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors duration-200 font-medium py-2 px-3 rounded-md">
            {title}
        </a>
    );
}

/**
 * Display a navbar link in the navbar for mobile users.
 * @param linkUrl The url to redirect to, such as '/video-player'.
 */
function MobileNavbarLink({href, title, onClick}: { href: string; title: string; onClick?: () => void }) {
    return (
        <a href={href}
              className="block text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium py-2 w-full"
              onClick={onClick}>
            {title}
        </a>
    );
}


/**
 * Display the logo that also redirects back to the home page for the navbar.
 */
function DisplayLogoForNavbar() {
    return (
        <>
            <ul className="hidden md:flex items-center space-x-6">
                <li>

                    <a href="/" className="text-2xl font-bold text-rose-600 dark:text-rose-400 shrink-0">
                        {/* Display the KelsonCraft Logo */}
                        {/* TODO Fix this with Astro */}
                        {/*<Image*/}
                        <img
                            src="/android-chrome-192x192.png"
                            width="40"
                            height="40"
                            alt="KelsonCraft Logo"
                        />
                    </a>
                </li>
            </ul>
        </>
    )
}

/**
 * Display the navbar content
 */
function NavbarContent() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(v => !v);
    const close = () => setIsOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-gray-800 shadow-md p-4 z-50">
            <div className="container mx-auto flex items-center justify-between">
                {/* Branding/Logo */}
                <DisplayLogoForNavbar/>

                <DesktopNavbarContent/>
                {/*{MobileNavbarContent(mobileNavbarOpen)}*/}
                {/*<MobileNavbarContent />*/}

                {/* Mobile toggle button */}
                {/* TODO Fix this to work with Astro */}
                <div className="md:hidden">

                    {/* Mobile menu button */}
                    <button onClick={toggle} className="text-gray-700 dark:text-gray-200 focus:outline-none">
                        {isOpen ? (
                            // Close icon (X)
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            // Hamburger icon
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>

                    {/* Mobile menu */}
                    <div
                        className={`md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-800 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <ul className="flex flex-col items-center py-4 space-y-4 text-center">
                            <li><MobileNavbarLink href="/" title="Home" onClick={close}/></li>
                            <li><MobileNavbarLink href="/about" title="About" onClick={close}/></li>
                            <li><MobileNavbarLink href={wikiUrl} title="Wiki" onClick={close}/></li>
                            <li><MobileNavbarLink href={blogUrl} title="Blog" onClick={close}/></li>
                            <li><MobileNavbarLink href="/video-player" title="Videos" onClick={close}/></li>
                            {/*<li><MobileNavbarLink href="/projects" title="Projects" onClick={close}/></li>*/}
                            <li><MobileNavbarLink href="/misc" title="Misc" onClick={close}/></li>
                        </ul>
                    </div>

                </div>

            </div>


        </nav>
    )
}

function ToggleMobileNavbar() {
    // TODO Move this out of here, it should only be in a ToggleMobileNavbar function.
    // I don't think this currently does anything in here.
    const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close
    // const { data: session, status } = useSession(); // Get session data

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="md:hidden">
            {/* Mobile menu button */}
            <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-200 focus:outline-none">
                {isOpen ? (
                    // Close icon (X)
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                ) : (
                    // Hamburger icon
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                )}
            </button>
        </div>
    )
}

//
/**
 * Display the test page if it is enabled in the .env
 * TODO Fix this to work
 */
// const DisplayTestPageOnNavbar = () => {
//     if (process.env.DISPLAY_TEST_PAGE_NAVBAR) {
//         return (
//             <>
//                 {NavbarLink("/test", "Test")}
//             </>
//         )
//     }
// }

/**
 * Navbar for the desktop
 */
function DesktopNavbarContent() {

    // Desktop Navigation Links
    return (
        <>
            <ul className="hidden md:flex items-center space-x-6">
                <li>
                    <NavbarLink href="/" title="Home"/>
                    <NavbarLink href="/about" title="About"/>
                    <NavbarLink href={wikiUrl} title="Wiki"/>
                    <NavbarLink href={blogUrl} title="Blog"/>
                    <NavbarLink href="/video-player" title="Videos"/>

                    {/*{DisplayTestPageOnNavbar()}*/}
                    {/*<NavbarLink href="/projects" title="Projects" />*/}
                    <NavbarLink href="/misc" title="Misc"/>

                </li>

            </ul>


            <>
                {/* <li>
                <a
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2 px-3 rounded-md"
                >
                  Dashboard
                </a>
              </li> */}
                {/*<li>*/}
                {/*    <a*/}
                {/*        href="/admin"*/}
                {/*        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2 px-3 rounded-md"*/}
                {/*    >*/}
                {/*        Admin*/}
                {/*    </a>*/}
                {/*</li>*/}
                {/* <li>
                <a
                  href="/admin/status_checker"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2 px-3 rounded-md"
                >
                  Status Checker (Admin)
                </a>
              </li> */}
            </>
            {/*)}*/}
            {/*{status === 'loading' ? (*/}
            {/*    <li className="text-gray-500 dark:text-gray-400">Loading...</li>*/}
            {/*) : (*/}
            {/*    // <li>*/}
            {/*    //     {status === 'authenticated' ? (*/}
            {/*    //         <button*/}
            {/*    //             onClick={() => signOut({ callbackUrl: '/' })}*/}
            {/*    //             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"*/}
            {/*    //         >*/}
            {/*    //             Sign Out ({session?.user?.name})*/}
            {/*    //         </button>*/}
            {/*    //     ) : (*/}
            {/*    //         <a*/}
            {/*    //             href="/auth/signin"*/}
            {/*    //             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"*/}
            {/*    //         >*/}
            {/*    //             Sign In*/}
            {/*    //         </a>*/}
            {/*    //     )}*/}
            {/*    // </li>*/}
            {/*)}*/}

        </>
    )
}

/**
 * Navbar for the mobile menu
 * TODO Move this into here, for now it is just in the NavbarContent function.
 */
function MobileNavbarContent(isOpen: boolean) {
    return (
        <>
            {/* Mobile Menu (conditionally rendered) */}
            {/*
        - md:hidden: Hides this menu on medium screens and up.
        - bg-white dark:bg-gray-800: Background.
        - shadow-lg: Stronger shadow for the dropdown.
        - transition-all duration-300 ease-in-out: Smooth animation.
        - transform: If isOpen, translateY(0), else translateY(-100%).
      */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="flex flex-col items-center py-4 space-y-4 text-center">
                    <li>
                        <MobileNavbarLink href="/" title="Home"/>
                        <MobileNavbarLink href="/about" title="About"/>
                        <MobileNavbarLink href={wikiUrl} title="Wiki"/>
                        <MobileNavbarLink href={blogUrl} title="Blog"/>
                        <MobileNavbarLink href="/video-player" title="Videos"/>
                        <MobileNavbarLink href="/projects" title="Projects"/>
                    </li>

                    {/*{status === 'authenticated' && (*/}
                    {/*    <>*/}
                    {/* <li>
                <a
                  onClick={toggleMenu}
                  href="/dashboard"
                  className="block text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 w-full"
                >
                  Dashboard
                </a>
              </li> */}
                    {/*<li>*/}
                    {/*    <a*/}
                    {/*        onClick={toggleMenu}*/}
                    {/*        href="/admin"*/}
                    {/*        className="block text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 w-full"*/}
                    {/*    >*/}
                    {/*        Admin*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    {/* <li>
                <a
                  onClick={toggleMenu}
                  href="/admin/status_checker"
                  className="block text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 w-full"
                >
                  Status Checker (Admin)
                </a>
              </li> */}
                    {/*</>*/}
                    {/*)}*/}
                    {/*{status === 'loading' ? (*/}
                    {/*    <li className="text-gray-500 dark:text-gray-400">Loading...</li>*/}
                    {/*) : (*/}
                    {/*    <li>*/}
                    {/*        {status === 'authenticated' ? (*/}
                    {/*            <button*/}
                    {/*                onClick={() => { signOut({ callbackUrl: '/' }); toggleMenu(); }} // Close menu on sign out*/}
                    {/*                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-lg w-full"*/}
                    {/*            >*/}
                    {/*                Sign Out ({session?.user?.name})*/}
                    {/*            </button>*/}
                    {/*        ) : (*/}
                    {/*            <a*/}
                    {/*                onClick={toggleMenu}*/}
                    {/*                href="/auth/signin"*/}
                    {/*                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-lg w-full"*/}
                    {/*            >*/}
                    {/*                Sign In*/}
                    {/*            </a>*/}
                    {/*        )}*/}
                    {/*</li>*/}
                    {/*)}*/}
                </ul>
            </div>

            <ToggleMobileNavbar/>

        </>
    )
}

export default Navbar;
