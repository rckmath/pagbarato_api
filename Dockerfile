FROM node:lts-alpine as base

WORKDIR /home/node/app

COPY package*.json ./
COPY prisma ./prisma/

FROM base as development

RUN npm install -g nodemon && npm install

COPY . .

FROM base as production

RUN npm ci

COPY . .

ENV NODE_PATH=./dist

RUN npm run build
