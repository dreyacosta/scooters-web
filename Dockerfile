FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

COPY . ./

RUN npm run build

EXPOSE 3000

CMD [ "./run.sh" ]