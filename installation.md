# Complete Server Setup Guide for BuildSocialPost

## Initial Setup and Nginx Installation

1. Check Ubuntu version:

```
lsb_release -a
```

Output:

```
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.6 LTS
Release:        20.04
Codename:       focal
```

2. Update and upgrade system:

```
sudo apt update && sudo apt upgrade -y
```

3. Install Nginx:

```
sudo apt install nginx
```

4. Check UFW status:

```
sudo ufw status
```

Initial output: `Status: inactive`

5. List available UFW applications:

```
sudo ufw app list
```

Output:

```
Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```

6. Enable UFW:

```
sudo ufw enable
```

7. Allow HTTP, HTTPS, and SSH traffic:

```
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
```

8. Allow Nginx HTTP specifically:

```
sudo ufw allow "Nginx HTTP"
```

9. Check UFW status after adding rules:

```
sudo ufw status
```

Final output:

```
Status: active

To                         Action      From
--                         ------      ----
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
22/tcp                     ALLOW       Anywhere
80/tcp (Nginx HTTP)        ALLOW IN    Anywhere
80/tcp (v6)                ALLOW IN    Anywhere (v6)
443/tcp (v6)               ALLOW IN    Anywhere (v6)
22/tcp (v6)                ALLOW IN    Anywhere (v6)
80/tcp (Nginx HTTP (v6))   ALLOW IN    Anywhere (v6)
```

10. Verify Nginx HTTP profile:

```
sudo ufw app info "Nginx HTTP"
```

Output:

```
Profile: Nginx HTTP
Title: Web Server (Nginx, HTTP)
Description: Small, but very powerful and efficient web server

Port:
  80/tcp
```

11. Check UFW configuration file for Nginx:

```
cat /etc/ufw/applications.d/nginx
```

Output:

```
[Nginx HTTP]
title=Web Server (Nginx, HTTP)
description=Small, but very powerful and efficient web server
ports=80/tcp

[Nginx HTTPS]
title=Web Server (Nginx, HTTPS)
description=Small, but very powerful and efficient web server
ports=443/tcp

[Nginx Full]
title=Web Server (Nginx, HTTP + HTTPS)
description=Small, but very powerful and efficient web server
ports=80,443/tcp
```

12. Check Nginx status:

```
sudo systemctl status nginx.service
```

13. Get server IP:

```
ip a
```

## PostgreSQL Installation

1. Install PostgreSQL:

```
sudo apt update
sudo apt install postgresql postgresql-contrib
```

2. Check PostgreSQL version:

```
psql --version
```

3. Start PostgreSQL service:

```
sudo systemctl start postgresql.service
sudo systemctl status postgresql.service
```

4. Access PostgreSQL and create database:

```
sudo -u postgres psql
CREATE DATABASE buildsocialpost;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE buildsocialpost TO myuser;
\q
```

## Node.js and Yarn Installation

1. Install Node.js version 22.3.0 using nvm (Node Version Manager):

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install Node.js 22.3.0
nvm install 22.3.0

# Set the installed version as default
nvm use 22.3.0

# Verify the installed version
node --version
```

2. Install Yarn:

```bash
npm install -g yarn
```

3. Verify installations:

```bash
node --version
npm --version
yarn --version
```

## Nginx Configuration

1. Create a new Nginx server block for backend:

```
sudo nano /etc/nginx/sites-available/api.buildsocialpost.com
```

2. Add the following content:

```nginx
server {
    listen 80;
    server_name api.buildsocialpost.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable the new site:

```
sudo ln -s /etc/nginx/sites-available/api.buildsocialpost.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Backend Setup

1. Clone the backend repository:

```
cd /var/www/
mkdir api.buildsocialpost.com && cd api.buildsocialpost.com
git clone https://github.com/anirban00537/buildsocialpost-nestjs.git .
```

2. Set up environment variables:

```
cp .env.example .env
nano .env
```

3. Update the `.env` file with the following content:

```
DEMO_MODE=demo1
DB_NAME=buildsocialpost
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_HOST=localhost
DB_PORT=5432
DATABASE_URL=postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
JWT_SIGNATURE=theSuperSecretKey
FRONTEND_URL=https://buildsocialpost.com
PORT=3000
ACCESS_TOKEN_SECRET=asmdlamslkdmalksdm
REFRESH_TOKEN_SECRET=aslmlmdslmalsdkmjfnajksdnjkas
ACCESS_TOKEN_EXPIRY=50d
API_SECRET=fdjsbfkjdsfjkdskjf
BACKEND_URL=https://api.buildsocialpost.com
```

4. Install dependencies and set up database:

```
yarn install
yarn prisma:migrate
yarn prisma:seed
yarn build
```

5. Install PM2 and start the backend:

```
sudo npm install -g pm2
pm2 start yarn --name "buildsocialpostAPI" -- start:prod
pm2 save
```

6. Check if the backend is running:

```
curl localhost:3000
```

## Frontend Setup

1. Clone the frontend repository:

```
cd /var/www/
mkdir buildsocialpost.com && cd buildsocialpost.com
git clone https://github.com/anirban00537/buildsocialpost.git .
```

2. Set up environment variables:

```
cp .env.example .env
nano .env
```

3. Update the `.env` file with the following content:

```
NEXT_PUBLIC_BASE_URL=https://api.buildsocialpost.com/api
NEXT_PUBLIC_CLIENT_URL=https://buildsocialpost.com
NEXT_PUBLIC_API_SECRET=fdjsbfkjdsfjkdskjf
NEXT_PUBLIC_SHOW_LOGIN_CREDENTIAL=0
```

4. Install dependencies and build:

```
yarn install
yarn build
```

5. Start the frontend using PM2:

```
pm2 start yarn --name "buildsocialpostFrontend" -- start
pm2 save
```

6. Check if the frontend is running:

```
curl localhost:3001
```

7. Configure Nginx for the frontend:

```
sudo nano /etc/nginx/sites-available/buildsocialpost.com
```

8. Add the following content:

```nginx
server {
    listen 80;
    server_name buildsocialpost.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. Enable the new site:

```
sudo ln -s /etc/nginx/sites-available/buildsocialpost.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate Installation

1. Install Certbot:

```
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

2. Obtain and install SSL certificates:

```
sudo certbot --nginx
```

3. Test automatic renewal:

```
sudo certbot renew --dry-run
```
