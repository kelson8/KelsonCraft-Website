// Moved these out of constants.ts, it was giving errors on certain pages.

//------
// Extra variables
//------
export const isProd = process.env.NODE_ENV === "production";

export const authRoutesEnabled: boolean = process.env.AUTH_ROUTES === "true";

export const testPagesEnabled: boolean = process.env.TEST_PAGES === "true";

// Set the log file path here, currently it goes into the project src/logs folder
export const logFile: string =
    process.cwd() + "/src/logs/kelsoncraft-nextjs.log";

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