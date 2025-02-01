FROM node:16.13.1

ENV APP_ROOT /usr/src/frontend

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]
