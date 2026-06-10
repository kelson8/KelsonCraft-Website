// Get the current year, mostly for the copyright date and isn't exported.
const currentYear = new Date().getFullYear();

// Set the videl url path, such as '/video-player'.
export const videoUrl: string = "/video-player";

export const websiteName: string = "KelsonCraft"

//------
// Docker
//------
// If this is enabled, so far it switches the redis url to the docker host.
// TODO Make this work and test it later.
export const dockerEnabled: boolean = false;
export const dockerContainerName: string = "kelsoncraft-redis";

//------
// Extra variables
//------
export const isProd = process.env.NODE_ENV === "production";

export const authRoutesEnabled: boolean = process.env.AUTH_ROUTES === "true";

export const testPagesEnabled: boolean = process.env.TEST_PAGES === "true";

// Set the log file path here, currently it goes into the project src/logs folder
export const logFile: string = process.cwd() + "/src/logs/kelsoncraft-nextjs.log"

//------
// Website page json files
//------
// Set the website pages json files, these are currently located in the src/json folder.
export const testPagesJsonFile = process.cwd() + "/src/json/test-pages.json";
export const miscPagesJsonFile = process.cwd() + "/src/json/misc-pages.json";
export const videoPagesJsonFile = process.cwd() + "/src/json/videos.json";

//------
// Folders
// The path for the videos in /api/video
export const videoPath: string = process.cwd() + "/videos";
// Well this almost works for my youtube-dl folders, It works on the files in the root of this folder but sub folders don't work.
// export const videoPath: string = "Z:/youtube-dl";
//------

//------
// Routes
//------
// Toggle the age encryption route status here
// https://github.com/FiloSottile/age
export const ageEncryptionRouteEnabled = false;
//------

//------
// Navbar urls
//------
export const blogUrl: string = "https://blog.kelsoncraft.net";
export const wikiUrl: string = "https://wiki.kelsoncraft.net";
//------

//------
// Footer urls and info
//------
export const websiteAuthor: string = "kelson8";
export const websiteCopyrightInfo: string = `© Copyright ${currentYear} ${websiteAuthor} - KCNet/KelsonCraft AGPLv3`
export const websiteSourceUrl: string = "https://github.com/kelson8/KelsonCraft-NextJS";

//------
// Main containers and div classes
//------

// Default classes for all Tailwind containers on the website.
// This was used for the secondary container that I used to use.
export const containerClass = `container mx-auto bg-white border 
  border-gray-300 rounded-lg p-6 
  shadow-lg m-4 dark:bg-gray-800 
  dark:border-gray-700 dark:text-gray-200 text-black`;

// In use for the containers on the pages, adds the gray box around the website contents.
export const containerPageClass = `container mx-auto bg-white border 
  border-gray-300 rounded-lg p-6 
  shadow-lg m-4 dark:bg-gray-700 
  dark:border-gray-700 dark:text-gray-200`;

// The div class that goes under the containerClass in the tsx.
// I don't see this in use anywhere.
export const mainDivClass = `w-full max-w-3xl mx-auto overflow-x-hidden p-4`;

//------
// Buttons
// https://v1.tailwindcss.com/components/buttons
//------
export const blueButtonClass = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
// export const blueButtonClass = `text-white bg-brand box-border border border-transparent
// hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium
// shadow-xs font-medium leading-5 rounded-base
// text-sm px-4 py-2.5 focus:outline-none m-4`;

//------
// Links
//------
export const blueLinkCss: string = "underline text-blue-600 hover:text-blue-800 visited:text-purple-600";

// This will mostly be used for the footer links to center them.
export const footerLinkCss: string = blueLinkCss + " flex items-center justify-center";

//------
// Headers
//------

// These might be used later
// https://flowbite.com/docs/typography/headings/
// Text for h1 headers.
export const mainHeaderClass = `mb-4 text-4xl text-center font-bold tracking-tight text-heading md:text-5xl lg:text-6xl`;
// Smaller text for h2 headers
export const h2HeaderClass = `mb-4 text-2xl font-bold tracking-tight text-heading md:text-4xl lg:text-4xl`;
export const h3HeaderClass = `mb-4 text-2xl tracking-tight text-heading`;
