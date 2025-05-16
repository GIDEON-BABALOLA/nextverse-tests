FROM node:18-alpine3.20
WORKDIR /litenote-client
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
