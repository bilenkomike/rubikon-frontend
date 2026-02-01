# Build stage only
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL
ARG VITE_MEDIA_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build
