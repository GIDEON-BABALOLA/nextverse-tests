FROM node:18-alpine3.20 AS build
WORKDIR /litenote-client
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /litenote-client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
