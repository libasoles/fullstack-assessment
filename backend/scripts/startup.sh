#!/bin/bash

# run migrations
./node_modules/.bin/ts-node ./node_modules/typeorm/cli migration:run -d ./src/config/typeorm.ts

npm run start