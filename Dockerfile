FROM node:14-alpine

COPY backend/package.json .
RUN npm install -g --quiet
COPY . .

CMD ["npm","run","apidocs"]
