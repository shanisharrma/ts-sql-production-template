# Using Lightweight docker image for node
FROM node:20-alpine AS base
# Setting up working Directory
WORKDIR /usr/src/backend-app
# Copying Package Files
COPY package*.json ./
# Installing Dependecies
RUN npm ci
# Copying Files
COPY . .
# Exposing Port
EXPOSE 3000
# Start Application
CMD ["npm", "run", "dev"]