FROM node:14

WORKDIR /home/node/app
COPY backend/package*.json ./
RUN npm install
COPY . .

CMD ["npm","run","apidocs"]
