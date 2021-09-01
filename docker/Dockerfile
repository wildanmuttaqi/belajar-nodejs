FROM node:14-alpine

COPY package.json .
RUN npm install --quiet
COPY . .

CMD ["nodemon","-L","npm start"]
