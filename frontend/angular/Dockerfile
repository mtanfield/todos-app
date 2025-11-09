FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS final-stage

COPY --from=build-stage /app/dist/angular/browser /usr/share/nginx/html