FROM node:lts-alpine AS build-angular
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build-angular /app/dist/angular/browser /usr/share/nginx/html/angular