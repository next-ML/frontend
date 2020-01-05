FROM node:8-slim
RUN apt-get update  && apt-get install -y nginx
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
     && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80
RUN cp -r dist/* /var/www/html \
     && rm -rf /user/src/app

RUN echo "server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location /api {
		proxy_pass http://mlservice:80;
	}

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

}" > /etc/nginx/sites-enabled/default

CMD ["nginx","-g","daemon off;"]
