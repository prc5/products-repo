FROM node:lts

WORKDIR /usr/src/backend

# Bcrypt implementation in docker solution
RUN set -x \
    && apt-get update \
    && apt-get --yes upgrade \
    && apt-get --yes install  \
    udev \
    ttf-freefont

COPY ./backend/package.json /usr/src/backend/

RUN yarn install

COPY ./backend /usr/src/backend/

CMD ["yarn", "start:debug"]
