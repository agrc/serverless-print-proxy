FROM node:24-slim

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install

COPY . ./
RUN pnpm build

CMD [ "pnpm", "run", "start:prod" ]
