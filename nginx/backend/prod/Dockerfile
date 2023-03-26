FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY server.crt /etc/ssl/certs/server.crt
COPY server.key /etc/ssl/private/server.key

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
