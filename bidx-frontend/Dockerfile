# Stage 1: Build Angular application
FROM node AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2: Serve Angular application
FROM nginx:alpine

COPY --from=build /app/dist/bidx-frontend/* /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
