FROM node:20.18-alpine

ARG API_ORIGIN
ARG IS_HTTPS

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
