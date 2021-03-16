FROM node:10

RUN npm i -g npm

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm install

CMD npm start -- --host 0.0.0.0 --port 4200 --configuration=docker
