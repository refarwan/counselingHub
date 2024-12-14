FROM node:20.18-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache openssl
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]