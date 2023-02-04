FROM node:18

COPY src .
COPY package.json .
COPY pm2.json .
RUN npm install pm2 -g
RUN npm install --production

CMD ["pm2-runtime", "app.js"]
