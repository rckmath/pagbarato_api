## Reminders for the EC2 instance:

- Used https://nip.io/ as wildcard HTTPS;
- Docker pushed builded prod images;

## Useful commands and templates:

### For Certbot Docker config
1. > docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d <MY_DOMAIN>
2. > docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d <MY_DOMAIN>
### Init Amazon Linux 2 with Docker and Docker-Compose installed
```
#!bin/bash
set -x
yum update-y
#docker
amazon-linux-extras install docker -y
service docker start
systemctl enable docker
usermod -a -G docker ec2-user
chmod 666 /var/run/docker.sock
#docker compose
curl -L https://github.com/docker/compose/releases/download/v2.11.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### Nginx config file template
```
server {
    listen 80;
    listen [::]:80;

    server_name <YOUR_DOMAIN> www.<YOUR_DOMAIN>;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }    
}

server {
    listen 443 default_server ssl http2;
    listen [::]:443 ssl http2;

    server_name <YOUR_DOMAIN>;

    ssl_certificate /etc/nginx/ssl/live/<YOUR_DOMAIN>/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/<YOUR_DOMAIN>/privkey.pem;
    
    location / {
        proxy_pass http://<YOUR_API_CONTAINER_NAME>:3000;
    }
}

```


## Guides

- [Dockerizing Node.js application with Nginx](https://ashwin9798.medium.com/nginx-with-docker-and-node-js-a-beginners-guide-434fe1216b6b)
- [Dockerizing Nginx and Let's Encrypt](https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)
- [Also dockerizing Nginx and Let's Encrypt](https://mindsers.blog/post/https-using-nginx-certbot-docker/)