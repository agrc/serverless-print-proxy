FROM node:26-slim

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@11 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm build

# Remove dev dependencies for a smaller image and less attack surface
RUN pnpm prune --prod

CMD [ "pnpm", "run", "start:prod" ]
