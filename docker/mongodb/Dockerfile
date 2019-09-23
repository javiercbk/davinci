FROM mongo:4.0.0-xenial
COPY ./mongodb-entry-point.sh /docker-entrypoint-initdb.d/mongodb-entry-point.sh
RUN chmod +x /docker-entrypoint-initdb.d/mongodb-entry-point.sh
