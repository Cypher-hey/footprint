FROM node:22-bookworm-slim
RUN npm install -g http-server
COPY docs /app/docs
WORKDIR /app
EXPOSE 8080
CMD ["http-server", "docs", "-p", "8080", "-a", "0.0.0.0"]
