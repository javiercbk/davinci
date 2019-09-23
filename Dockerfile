FROM node:11.8.0-alpine
WORKDIR /usr/src/davinci
RUN apk update
RUN apk add python g++ make netcat-openbsd
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json /usr/src/davinci/
RUN npm install
# prevent bcrypt from segmentation fault on alpine
RUN npm rebuild bcrypt --build-from-source
# Bundle app source
COPY ./docker/backend/docker-server-entrypoint.sh /usr/src/davinci/docker-server-entrypoint.sh
COPY ./docker/backend/wait-for.sh /usr/src/davinci/wait-for.sh
RUN chmod +x /usr/src/davinci/wait-for.sh
RUN cp docker-server-entrypoint.sh /usr/local/bin/ && \
  chmod +x /usr/local/bin/docker-server-entrypoint.sh
ENTRYPOINT [ "/usr/local/bin/docker-server-entrypoint.sh" ]
