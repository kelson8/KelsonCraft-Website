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
# Not required for the Astro web server, unless I decide to implement logins and switch to SSR (Server Side Rendering)
# RUN pnpm run generate:prisma-db

# For setting the video host domain env variable
ARG PUBLIC_VIDEO_HOST_DOMAIN
ENV PUBLIC_VIDEO_HOST_DOMAIN=${PUBLIC_VIDEO_HOST_DOMAIN}

RUN pnpm build

# Runner with nginx
# https://deployn.de/en/blog/astrojs-docker/

# TODO Make this run as non root user if possible.
FROM nginx:alpine AS runner

# Setup the timezone
# https://www.programmersought.com/article/72575663274/
RUN apk add -U tzdata && cp /usr/share/zoneinfo/America/New_York /etc/localtime && apk del tzdata

COPY ./data/nginx /etc/nginx

# New, copy the log rotation script
# This is not needed.
# https://stackoverflow.com/questions/40608055/running-a-bash-script-before-startup-in-an-nginx-docker-container
# COPY ./data/nginx-logrotate.sh /docker-entrypoint.d/nginx-logrotate.sh
# RUN chmod +x /docker-entrypoint.d/nginx-logrotate.sh
# COPY ./data/nginx-logrotate.sh /scripts/nginx-logrotate.sh
# RUN chmod +x /scripts/nginx-logrotate.sh && /bin/sh /scripts/nginx-logrotate.sh

# Copy the log rotate file directly.
COPY ./data/logrotate/nginx /etc/logrotate.d/nginx
#

COPY --from=build /usr/src/app/dist /var/www/html

# ENTRYPOINT ["/scripts/nginx-logrotate.sh"]

# Switch to a non-root user
# TOOD Fix this to work, it breaks the container
#USER nginx
