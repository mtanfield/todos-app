FROM node:20-alpine AS build-stage

COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS final-stage

COPY --from=build-stage /dist /usr/share/nginx/html