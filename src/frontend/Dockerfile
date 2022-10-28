FROM node:19-alpine as build


WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

ARG server_url
ENV REACT_APP_SERVER_URL ${server_url}

RUN npm install --omit=dev
COPY ./src /app/src
COPY ./public /app/public
COPY ./tsconfig.json /app/tsconfig.json
RUN npm run build

FROM nginx:1.16.0-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]