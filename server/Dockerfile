# FROM node:18-alpine3.20
FROM node:18-alpine
WORKDIR /litenote-server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
