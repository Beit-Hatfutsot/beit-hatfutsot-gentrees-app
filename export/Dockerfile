FROM node:8
COPY package.json /
RUN npm install && mkdir -p /export
RUN apt-get update && apt-get install -y mongodb-clients python-pip zip python-dev
RUN wget -q https://storage.googleapis.com/pub/gsutil.tar.gz && tar xfz gsutil.tar.gz && rm gsutil.tar.gz
RUN pip install pyyaml
ENV PATH /gsutil:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
COPY boto.config /root/.boto
WORKDIR /export
COPY query.json .
COPY mongo_backup.sh .
COPY entrypoint.sh .
COPY export.js .
COPY send-trees.py .
ENTRYPOINT ["/export/entrypoint.sh"]
