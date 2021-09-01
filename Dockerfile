FROM node:14-slim

WORKDIR /home/node/app
COPY backend/package*.json ./
RUN npm install
COPY . .

CMD ["npm","run","apidocs"]
