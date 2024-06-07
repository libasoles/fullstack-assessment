#!/bin/bash

# run migrations
./node_modules/.bin/ts-node ./node_modules/typeorm/cli migration:run -d ./dist/config/typeorm.js

npm run start