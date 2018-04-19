FROM node:8
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install gulp-cli gulp-bundle-file
ENV PATH /node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
RUN mkdir -p /client
WORKDIR /client
COPY entrypoint.sh .
COPY vendor.json .
COPY Gulpfile.js .
COPY favicon.ico .
COPY locallib ./locallib
COPY lib ./lib
COPY images ./images
COPY index.html .
COPY modules ./modules
# TODO: find out why it fails when NODE_ENV=production
RUN export NODE_ENV= && gulp build-client
ENTRYPOINT ["/client/entrypoint.sh"]
