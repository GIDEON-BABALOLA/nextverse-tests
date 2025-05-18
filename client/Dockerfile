# Build Stage
FROM node:18-alpine AS build
WORKDIR /litenote-client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production
# Copy your custom nginx.conf (optional)
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /litenote-client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]