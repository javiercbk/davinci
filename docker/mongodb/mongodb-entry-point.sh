#!/bin/bash
echo "creating mongodb users"
mongo admin --host localhost -u davinci_root_dev -p davinci_root_pass_dev --eval "db.createUser({user: 'davinci', pwd: 'davinci', roles: [{role: 'readWrite', db: 'davinci'}]}); db.createUser({user: 'davinci_admin', pwd: 'davinci', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "mongodb users created"
