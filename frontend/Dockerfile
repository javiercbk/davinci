FROM node:10-alpine
WORKDIR /home/node
COPY package*.json /home/node/
COPY .eslintrc.js /home/node/
COPY .postcssrc.js /home/node/
COPY babel.config.js /home/node/
COPY vue.config.js /home/node/
RUN npm install -g vue-cli
RUN npm install
