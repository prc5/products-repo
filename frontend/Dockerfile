FROM node:lts

WORKDIR /usr/src/frontend

COPY ./frontend/package.json /usr/src/frontend/

RUN yarn install

COPY ./frontend /usr/src/frontend/

CMD ["yarn", "start"]
