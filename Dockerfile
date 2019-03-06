FROM node:latest

#create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY .env /usr/src/app/

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm install webpack@4.19.1 

RUN npm run build

CMD ["npm", "start"]