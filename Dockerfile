FROM node:14-alpine

COPY backend/package.json .
RUN npm install --quiet
COPY . .

CMD ["npm","run","apidocs"]
