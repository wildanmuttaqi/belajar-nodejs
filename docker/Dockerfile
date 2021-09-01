FROM node:14-alpine

WORKDIR /home/node/app

COPY package.json .
RUN npm install
RUN npm run apidocs
COPY . .

CMD ["/home/node/app/node_modules/.bin/nodemon","-L","./bin/www"]
