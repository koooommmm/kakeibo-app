FROM node:18-alpine3.16

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
COPY package*.json ./

RUN npm install

# アプリケーションのソースをバンドルする
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]