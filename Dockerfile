FROM node:14-alpine3.12

ADD . /var/www/comviva_nodejs

WORKDIR /var/www/comviva_nodejs

RUN mkdir -p /var/www/comviva_nodejs/node_modules && chown -R node:node /var/www/comviva_nodejs

RUN npm i -g npm@7.22.0

RUN npm install pm2 -g

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "pm2-runtime", "bin/www.js" ]
