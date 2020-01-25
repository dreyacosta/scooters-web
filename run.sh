#!/bin/sh

if [ "$APP_ENV" == "test" ]; then
  npm test
else
  if [ "$APP_ENV" == "development" ]; then
    npm run start
   else
    serve -s build -n -l 3000
  fi
fi
