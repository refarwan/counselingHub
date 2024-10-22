FROM node:18-alpine

ARG API_HOST

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
