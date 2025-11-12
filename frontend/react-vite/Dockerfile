# Stage 1: Build React application
FROM node:lts-alpine AS build-react
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build-react /app/dist /usr/share/nginx/html/react