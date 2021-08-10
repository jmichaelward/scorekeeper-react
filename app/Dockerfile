FROM node:14

RUN apt-get update \
    && apt-get install -y yarn

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .
EXPOSE 3000

CMD ["yarn", "start"]


