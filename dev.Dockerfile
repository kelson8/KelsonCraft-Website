FROM node:24.12.0

# TODO Make this use the non-root app user.

WORKDIR /usr/src/app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./

# Fix for the building of this
# https://github.com/orgs/pnpm/discussions/9109
# # https://github.com/pnpm/pnpm/issues/11562
RUN pnpm install --config.confirmModulesPurge=false --dangerously-allow-all-builds

COPY . .

# Generate the prisma DB.
# Not required for the Astro web server.
# RUN pnpm run generate:prisma-db

EXPOSE 3000

#-----
# Non root user
# TODO Set this up
#-----

# Use a non-root user
#RUN groupadd -r app && useradd -r -g app app && chown -R app:app /usr/src/app
#
## Setup the corepack and .next folder for proper permissions
#RUN mkdir -p /home/app/.cache/node/corepack \
#    && chown -R app:app /home/app/.cache \
#    && mkdir -p /usr/src/app/.next \
#    && chown -R app:app /usr/src/app/.next


#USER app

CMD ["pnpm", "dev", "--hostname", "0.0.0.0"]