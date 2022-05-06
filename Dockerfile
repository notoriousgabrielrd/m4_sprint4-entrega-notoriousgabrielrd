FROM node:16

RUN apt-get update

ENV port=3333

EXPOSE 3333

WORKDIR /app

COPY ["package.json","yarn.lock"]

RUN yarn

COPY . .

USER node

CMD ["yarn", "dev"]