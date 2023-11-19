FROM node:18.12.0-alpine as builder
WORKDIR /frontend
COPY ./package.json .
RUN npm i --force
RUN npm cache clear --force
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 80

RUN rm -rf /etc/nginx/sites-enabled/default
RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf