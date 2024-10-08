FROM node as builder

WORKDIR /app/
COPY . .
RUN npm install
RUN npm run all

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html/
