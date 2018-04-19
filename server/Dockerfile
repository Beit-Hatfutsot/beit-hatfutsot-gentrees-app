FROM node:8
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install 'mongodb@3.0.6'
WORKDIR /server
COPY server.js .
COPY lib ./lib
COPY entrypoint.sh .
COPY *.json ./
ENTRYPOINT ["/server/entrypoint.sh"]
