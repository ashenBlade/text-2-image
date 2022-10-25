FROM nginx:alpine

COPY ./nginx.yc.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]