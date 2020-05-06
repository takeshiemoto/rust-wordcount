FROM node:12.16.3-alpine

WORKDIR /app

RUN npm install -g @vue/cli

CMD ["sh"]
