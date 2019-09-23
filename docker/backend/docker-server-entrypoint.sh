#!/bin/sh
echo "bootstraping server"
cd /usr/src/davinci
echo "waiting for mongodb to startup"
/usr/src/davinci/wait-for.sh mongodb:27017
echo "MongoDB started"
# execute migrations
# node_modules/.bin/sequelize db:migrate
if [ "$NODE_ENV" != "production" ]
then
  if [ "$NODE_INSPECT_BRK" == "true" ]
  then
    echo "Running debug break mode"
    npm run debug-break
  else
    echo "Running debug mode"
    npm run debug
  fi
else
  npm run start
fi
