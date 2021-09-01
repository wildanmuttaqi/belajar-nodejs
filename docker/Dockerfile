FROM node:14-alpine

WORKDIR /home/node/app

COPY ./../backend/package.json .
RUN npm install
RUN npm run apidocs
COPY . .

CMD ["npx","nodemon","-L","./bin/www"]
