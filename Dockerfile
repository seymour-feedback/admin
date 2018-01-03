FROM node:7

COPY package*.json gulpfile.js /app/
RUN chown -R node:node /app/*

WORKDIR app
RUN npm install

COPY . /app/
RUN chown -R node:node /app/*
USER node

CMD [ "npm", "start" ]

EXPOSE 3002

