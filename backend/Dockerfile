# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
COPY . .

EXPOSE 7778

CMD ["npm", "start"]