FROM node:14-alpine

WORKDIR /home/node/app

COPY package.json .
RUN npm install --quiet
COPY . .

# CMD ["nodemon","-L","npm start"]
CMD ["npm","run","apidocs"]
