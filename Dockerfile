FROM node:26-slim

WORKDIR /usr/src/app

RUN npm install --global pnpm@11

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm build

# Remove dev dependencies for a smaller image and less attack surface
RUN pnpm prune --prod

CMD [ "pnpm", "run", "start:prod" ]
