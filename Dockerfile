FROM node:24-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

CMD [ "npm", "run", "start:prod" ]
