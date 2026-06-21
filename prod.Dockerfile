# Builder
#FROM node:24.12.0 AS build

# Updated, changed to alpine image
# I could use the '-slim' image instead of '-alpine' if this doesn't work.
FROM node:24.16.0-alpine AS build

# TODO Make this cache the build a bit more then what it currently does.

WORKDIR /usr/src/app

# Enable corepack to provide pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./

# Fix for the building of this
# https://github.com/orgs/pnpm/discussions/9109
RUN pnpm install --dangerously-allow-all-builds --config.confirmModulesPurge=false --frozen-lockfile

COPY . .
# TODO Fix this to work, it breaks the Nginx container when I mount some of the files directly.
# Exclude specific files.
# COPY public src astro.config.mjs components.json ec.config.mjs package.json pnpm-lock.yaml pnpm-workspace.yaml starwind.config.json tsconfig.json .

# Generate the prisma DB.
# Not required for the Astro web server, unless I decide to implement logins and switch to SSR (Server Side Rendering)
# RUN pnpm run generate:prisma-db

# For setting the video host domain env variable
ARG PUBLIC_VIDEO_HOST_DOMAIN
ENV PUBLIC_VIDEO_HOST_DOMAIN=${PUBLIC_VIDEO_HOST_DOMAIN}

RUN pnpm build

# Runner with nginx
# https://deployn.de/en/blog/astrojs-docker/

# I got this working with a non-root user.
FROM nginx:alpine AS runner

# Setup the timezone, attempt to setup Matomo for analytics.
# https://www.programmersought.com/article/72575663274/
# https://linuxcapable.com/how-to-install-matomo-with-nginx-on-ubuntu-linux/
# RUN apk add -U tzdata && cp /usr/share/zoneinfo/America/New_York /etc/localtime && apk del tzdata && \
#     wget -O /tmp/matomo-latest.tar.gz https://builds.matomo.org/matomo-latest.tar.gz && \
#     mkdir -p /var/www/matomo && \
#     tar -xzf /tmp/matomo-latest.tar.gz -C /var/www/matomo --strip-components=1 && \
#     rm /tmp/matomo-latest.tar.gz

# Only setup the timezone
# # https://www.programmersought.com/article/72575663274/
RUN apk add -U tzdata && cp /usr/share/zoneinfo/America/New_York /etc/localtime && apk del tzdata

# Moved to mounting in docker-compose.yml, will be ignored in here.
# TODO Revert if this breaks.
# I got this working in docker-compose.yml.
# COPY ./data/nginx /etc/nginx

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

# https://www.rockyourcode.com/run-docker-nginx-as-non-root-user/
# Add permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

# Switch to nginx non-root user
USER nginx

# Mostly for checking what was in the dist folder of the build.
# COPY --from=build /usr/src/app/dist-files.txt /var/www

# ENTRYPOINT ["/scripts/nginx-logrotate.sh"]

