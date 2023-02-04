FROM node:18

COPY src .
COPY package.json .
COPY pm2.json .
RUN npm install --production