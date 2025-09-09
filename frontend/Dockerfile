FROM node:20-alpine AS build-stage

COPY package.json package-lock.json ./

RUN npm install
COPY . .
ENV VITE_API_BASE_URL=http://localhost:7778
RUN npm run build

FROM nginx:alpine AS final-stage

COPY --from=build-stage /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]