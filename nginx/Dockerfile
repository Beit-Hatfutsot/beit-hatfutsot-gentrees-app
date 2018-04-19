FROM nginx
COPY default.conf /etc/nginx/conf.d/
COPY rev-proxy.inc /etc/nginx/conf.d/
COPY rev-proxy-host.inc /etc/nginx/conf.d/
COPY auth.inc /etc/nginx/conf.d/
RUN touch /etc/nginx/conf.d/auth.inc &&\
    mkdir -p /home/ftapp/current/server/public
