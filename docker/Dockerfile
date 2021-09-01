FROM node:14-alpine

WORKDIR /home/node/app

COPY package.json .
RUN npm install --quiet
RUN npm run apidocs
COPY . .

CMD ["nodemon","-L","npm start"]
