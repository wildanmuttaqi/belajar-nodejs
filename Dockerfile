FROM node:14

WORKDIR /home/node/app
COPY backend/package*.json ./
RUN npm install
COPY . /home/node/app/node_modules
EXPOSE 3000

CMD ["npm","run","apidocs"]
