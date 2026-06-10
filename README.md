
# KelsonCraft Website
This will be the future home of the [KelsonCraft](https://kelsoncraft.net) website,
it is using Astro with Tailwind and TypeScript.

So far there isn't much in here, but I plan on migrating the entire website from
Python Flask to Astro.

Here is some screenshots of the website design, this isn't fully complete just yet.

<details>
<summary> Home Page </summary>
<img src="screenshots/website-home.png?raw=true" alt="Home Page Screenshot">
</details>

<details>
<summary> About page </summary>
<img src="screenshots/website-about1.png?raw=true" alt="About Page Screenshot1">
<img src="screenshots/website-about2.png?raw=true" alt="About Page Screenshot2">
</details>

<details>
<summary> Video list page </summary>
<img src="screenshots/website-video-list.png?raw=true" alt="Video page list Screenshot">
</details>

<details>
<summary> Dark mode toggle </summary>
<img src="screenshots/dark-mode-toggle.gif?raw=true" alt="Video page list Screenshot">

</details>

# Setup

**Running webserver**

I tried to get this working with docker, but couldn't figure it out.

You will need Node.js 24, pnpm, and pm2 installed for this to work

First, install the dependencies
* pnpm install
  Then, run the server

**Dev server**
* pm2 start npm --name "kelsoncraft-website" -- run dev

**Production server**
* pnpm run build
* pm2 start npm --name "kelsoncraft-website" -- run start

**Adding videos**

To add videos for the `src/app/video-player/[videoId]/page.tsx`, add them into the
`videos` folder in the root of this repo.

**Generating prisma schema**

This below is required for the website to run now.

To generate the prisma schema, run this command.
* pnpm run generate:prisma-db

To migrate the db (Sets up the sqlite DB)
* pnpm dlx prisma migrate dev


## Guides
Here is a good video guide for Astro
* https://www.youtube.com/watch?v=eQXG75XirdE

I plan on migrating my Next.js project to Astro.

You can use either `.md` for Markdown pages, or `.astro` for astro pages with HTML and optional TypeScript at the top.

To make a page not show up in the build, prefix it with an `_` like `_about.astro`

Here is a guide on migrating from Next.js to Astro
* https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/


### Files
These are currently not implemented for the Astro version of this website.

The JSON files for some of the pages such as misc and video pages are located here.
* `src/json`

This folder contains the page JSON files which generate the page list to be displayed
on some of the pages, and also
the `videos.json` which displays the videos using `src/components/read-json-files.tsx`.

### Adding videos to the site
The videos are currently not implemented for the Astro version of this website.

To add videos to this site, first add them into the `src/json/videos.json` file like this
it requires an id, title, description, file_name and if the video is restricted.

From `videos.json`
```json
{
  "tom_clancy_wildlands_glitch1": {
    "title": "Tom Clancy's Ghost Recon Wildlands Chopper glitch",
    "description": "I'm not sure how I would do this again, it just randomly happened one day.",
    "file": "tom_clancy_wildlands_glitch1.mp4",
    "restricted": false
  }
}
```


Then, you can add the video into the `/videos` folder in the root of this repo.

## Useful links

These links below are useful for the website.

| Title                         | URL                                                   |
|-------------------------------|-------------------------------------------------------|
| Font awesome icon list        | https://fontawesome.com/search?p=8&ic=free-collection |
| MUI React checkboxes          | https://mui.com/material-ui/react-checkbox/           |
| NextJS Form guides            | https://nextjs.org/docs/app/guides/forms              |
| BetterAuth Installation Guide | https://better-auth.com/docs/installation             |

### Website links

I'm not sure how to set a relative path to these in the Markdown.

| Title  | URL     | Description                                 |
|--------|---------|---------------------------------------------|
| About  | /about  | About page for the website.                 |
| Misc   | /misc   | Misc pages for the website.                 |
| Videos | /videos | Displays the video list from the json file. |

# Features
* Dark mode toggle - I have a dark mode toggle on the bottom right of the website.
* Font awesome icons - This is what I use for some icons on this website.
* Tailwind CSS - This website is using Tailwind CSS instead of Bootstrap like the old website was.

# License
Since this project will mostly be used on web servers, I have decided to license this
under the AGPLv3 license, the original website was licensed under GPLv3.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## More info about Astro

Feel free to check [Astro docs](https://docs.astro.build) or jump into our [Astro Discord server](https://astro.build/chat).
