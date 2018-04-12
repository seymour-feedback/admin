FROM node:8

RUN mkdir /dist

COPY package.json package.json

RUN npm --loglevel warn install --production --no-optional

COPY . .

RUN chown -R node:node /dist

RUN npm --loglevel warn run postinstall

USER node

CMD [ "npm", "start" ]

EXPOSE 3002

