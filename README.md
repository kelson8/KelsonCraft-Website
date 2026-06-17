
# KelsonCraft Website
This is the new home of the [KelsonCraft](https://kelsoncraft.net) website,
it is using Astro with Tailwind and TypeScript.

I have migrated the website fully over to Astro, it was originally on Python Flask.

Link to the Flask website (This will probably not be updated anymore.)
* https://github.com/kelson8/FlaskWeb

Here is some screenshots of the website design, I need to update some of these.

<details>
<summary> Home Page </summary>
<img src="screenshots/website-home.png?raw=true" alt="Home Page Screenshot">
</details>

<details>
<summary> About page </summary>
<img src="screenshots/website-about.png?raw=true" alt="About Page Screenshot1">
<img src="screenshots/website-about-coding.png?raw=true" alt="About Page Screenshot1">

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

**With Docker**

This website now has Docker support.

You can run the command `docker compose up --build -d` to start the webserver with Docker, it will build with pnpm first, 
then copy the build contents into a Nginx container.

**Without Docker**

You will need Node.js 24, pnpm, and pm2 installed for this to work.

First, install the dependencies
* pnpm install


Then, run the server

**Dev server**
* pm2 start npm --name "kelsoncraft-website" -- run dev

**Production server**
* pnpm run build
* pm2 start npm --name "kelsoncraft-website" -- run start

**Adding videos**

To add videos for the `src/pages/[...videos].astro`, add them into the
`public/videos` folder in the root of this repo.

## Guides
Here is a good video guide for Astro
* https://www.youtube.com/watch?v=eQXG75XirdE

I plan on migrating my Next.js project to Astro.

You can use either `.md` for Markdown pages, or `.astro` for astro pages with HTML and optional TypeScript at the top.

To make a page not show up in the build, prefix it with an `_` like `_about.astro` 
this is only required if the file is in the `src/pages` folder.

Here is a guide on migrating from Next.js to Astro
* https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/

### Files
The JSON files for some of the pages such as misc and video pages are located here.
* `src/json`

This folder contains the page JSON files which generate the page list to be displayed
on some of the pages, and also
the `videos.json` which displays the videos using [src/pages/videos/[...videos].astro](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/pages/videos/%5B...videos%5D.astro) 
and [src/components/react-player.tsx](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/react-player.tsx).

### Adding videos to the site
To add videos to this site, first add them into the `src/json/videos.json` file like this
it requires an id, title, description, file_name and if the video is restricted.

From `src/json/videos.json`
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

Then, you can add the video into the `/public/videos-web` folder in the root of this repo.

### Useful files
Here is a list of useful files for the website

**Navbar and footer**
- [navbar.astro](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/navbar.astro)
- [footer.astro](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/footer.astro)

**Plyr Video player**
- [plyr-page-props.astro](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/plyr-page-props.astro)
- [react-player.tsx](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/react-player.tsx)

**Themes and tailwind**
- [link.astro](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/link.astro)
- [home-page-components.tsx](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/page_layouts/home-page-components.tsx)
- [table.astro](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/table.astro)
- [tailwind-popup.astro](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/tailwind-popup.astro)
- [theme-toggle.tsx](https://github.com/kelson8/KelsonCraft-Website/blob/master/src/components/theme-toggle.tsx)

## Useful links

These links below are useful for the website.

| Title                  | URL                                                   |
|------------------------|-------------------------------------------------------|
| Font awesome icon list | https://fontawesome.com/search?p=8&ic=free-collection |
| MUI React checkboxes   | https://mui.com/material-ui/react-checkbox/           |
| Astro Form guides      | https://docs.astro.build/en/recipes/build-forms/      |

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

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
|:-----------------------|:-------------------------------------------------|
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## More info about Astro

Feel free to check [Astro docs](https://docs.astro.build) or jump into the [Astro Discord server](https://astro.build/chat).

# License
Since this project will mostly be used on web servers, I have decided to license this
under the AGPLv3 license, the original website was licensed under GPLv3.
