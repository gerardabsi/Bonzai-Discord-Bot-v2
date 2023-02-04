#FROM node:18
#
#COPY src .
#COPY package.json .
#COPY pm2.json .
#RUN npm install pm2 -g
#RUN npm install --production
#
#CMD ["pm2-runtime", "app.js"]

FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY app .
COPY package.json .
COPY ecosystem.config.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Expose the listening port of your app
EXPOSE 8000

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]