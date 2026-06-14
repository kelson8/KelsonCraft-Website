# Builder
#FROM node:24.12.0 AS build

# Updated, changed to alpine image
# I could use the '-slim' image instead of '-alpine' if this doesn't work.
FROM node:24.16.0-alpine AS build

# TODO Make this use the non-root app user.
# TODO Make this cache the build

WORKDIR /usr/src/app

# Enable corepack to provide pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./

# Fix for the building of this
# https://github.com/orgs/pnpm/discussions/9109
RUN pnpm install --dangerously-allow-all-builds --config.confirmModulesPurge=false --frozen-lockfile

COPY . .

# Generate the prisma DB.
# TODO Copy this output into the runner.
# Not required for the Astro web server, unless I decide to implement logins and switch to SSR (Server Side Rendering)
# RUN pnpm run generate:prisma-db

RUN pnpm build

# Runner with nginx
# https://deployn.de/en/blog/astrojs-docker/

# TODO Make this run as non root user if possible.
FROM nginx:alpine AS runner
COPY ./data/nginx /etc/nginx

COPY --from=build /usr/src/app/dist /var/www/html
