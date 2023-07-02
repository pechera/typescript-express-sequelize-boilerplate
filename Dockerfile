FROM node

WORKDIR /backend

COPY yarn.lock .
COPY package.json .
COPY tsconfig.json .

RUN yarn install

COPY src /backend/src

RUN yarn build

EXPOSE 4700

COPY .env.production .env

CMD ["node", "./build/index.js"]