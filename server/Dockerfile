FROM node:18-alpine3.20
WORKDIR /litenote-server
COPY ./models/ .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
