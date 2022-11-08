# Drink Water 😊💦

<img width="100%" src="https://media.giphy.com/media/guKp5Wjf2N2Lu/giphy.gif" />

<a href="https://yuxuan.sutdacademytools.net">Start Drink Water Today!</a></p>

[Postman - Drink Water API Documentation](https://www.postman.com/xmliszt/workspace/for-public/documentation/7524840-ae4125c0-ac1c-495f-b5ad-f67f3fec03a9)

---

- [Drink Water 😊💦](#drink-water-)
  - [Overview](#overview)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Web App Features](#web-app-features)
  - [Project Setup](#project-setup)
    - [Overview](#overview-1)
    - [Pre-requisites](#pre-requisites)
    - [Setup project](#setup-project)
    - [Setup Nginx reverse proxy](#setup-nginx-reverse-proxy)
  - [Security Vulnerability Demo](#security-vulnerability-demo)
    - [Unsecure user authentication flow](#unsecure-user-authentication-flow)
      - [Current Flow](#current-flow)
      - [Attack](#attack)
      - [Solution](#solution)
    - [Unsecure API routes](#unsecure-api-routes)
      - [Overview](#overview-2)
      - [Attack](#attack-1)
      - [Solution](#solution-1)
    - [Alternative to JWT Token](#alternative-to-jwt-token)
  - [API Documentation](#api-documentation)

## Overview

**Drink Water** is a simple web application that helps you keep track of daily water intake and have a fun UI for users to compete against each other. User sets his or her own goal and capacity of the water cup used, and log the water intake for the day. Once achieved the goal, the user will be granted with **1 point** which will be added towards his or her total score. A scoreboard can be viewed to see who has collected the most points.

### Frontend

**Drink Water**'s frontend is written in **VueJS**. A docker container can be setup from the `Dockerfile` to run it with ease. `./run.sh` script is written for easily spin up a docker container.

### Backend

**Drink Water**'s backend is written in **NodeJS**. A docker container can be setup from the `Dockerfile` to run it with ease. `./run.sh` script is written for easily spin up a docker container.

The database used is **Sqlite3** which is a lightweight database. A fresh new database will be spawned when a new Docker container is set up and running.

## Web App Features

![](./docs/1.png)
_Press "Drink Water" to start_

![](./docs/2.png)
_Register an account, or enter as guest, for guest, password is not required_

![](./docs/3.png)
_Login existing account_

![](./docs/4.png)
_Press the cup to add your drink water record_

![](./docs/5.png)
_Water level will rise as you drink, water level refreshed for every day_

![](./docs/6.png)
_Access the leaderboard here, you earn a point when completing today's goal_

![](./docs/7.png)
_Access the setting here, you can modify your goal and the capacity of your cup of water_

![](./docs/8.png)
_Once completed, the screen will change to green color, and you earn yourself 1 point for today, you will not earn multiple points for a single day_

![](./docs/9.png)
_Click here to logout_

| Mobile Screenshot 1 | Mobile Screenshot 2 |
| :------------------ | :------------------ |
| ![](./docs/m-1.png) | ![](./docs/m-2.png) |

_Mobile version is fully supported as well! You can access it conveniently on your mobile devices!_

---

## Project Setup

### Overview

The project can be set up on a fresh EC2 instance running Ubuntu. A setup script is provided in root `./setup.sh`. There are several pre-requisites for the project to be successfully set up.

**Nginx** is needed to act as a reverse proxy to communicate with the client and the server running on local.

The current project has SSL certificate setup with CA certificate signed by **Certbot**. The domain is configured via AWS Route R3

### Pre-requisites

**Docker**

Ubuntu docker installation can be found [here](https://docs.docker.com/engine/install/ubuntu/)

```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

**Node**
You need `nodejs` for running the project

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

You can also use Node Version Manager to install. The following example install v14.10.0 node

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh
nvm install v14.10.0
```

**Certbot (for HTTPS setup)**

```
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
```

### Setup project

Once you have all the pre-requisites, we can spin up the container using the `setup.sh` script found at root.

> You should bring this script out of the root folder and run, as it will clone a copy of this project.

```
sudo chmod +x ./setup.sh
./setup.sh
```

The script will clone the project into `sutdacademy-drink-water` folder with the source codes within.

After this, you should have two Docker containers running. One is the **client frontend**, the other is the **server backend**. To view the running containers:

```
sudo docker ps
```

### Setup Nginx reverse proxy

We now need to set up Nginx reverse proxy to serve our web application via HTTPS. First step is to use **Certbot** to generate the CA certificate.

```
sudo certbot --nginx
```

This will prompt you for information about your domain. Once successful, it will auto store the CA certs and refer them in your Nginx configuration file `/etc/nginx/sites-available/default`

Here is a sample configuration file, the variables are replaced by `$<xxx>` for you to replace with your own configuration.

```
server {
        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate $<SSL Certificate generated by Certbot>; # managed by Certbot
        ssl_certificate_key $<SSL Certificate key generated by Certbot>; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name $<Your domain>; # managed by Certbot

        location / {
                proxy_pass http://localhost:8080;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;
        }

        location /api {
                proxy_pass http://localhost:3000;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;
                proxy_redirect off;
        }

        location ~ /\.ht {
                deny all;
        }
}

server {
    if ($host = $<Your domain>) {
        return 301 https://$host;
    } # managed by Certbot

    listen 80 ;
    listen [::]:80 ;
    server_name $<Your domain>;
    return 301 https://$<Your domain>; # managed by Certbot
}
```

After setup, your website should be publicly accessible via: `https://$<Your domain>`

## Security Vulnerability Demo

### Unsecure user authentication flow

#### Current Flow

1. User enters username and password
2. Password is hashed by Frontend
3. Frontend gets user's details via API by using the username
4. Frontend compares hashed password with the hash in the API response
5. If match, user is authenticated in. User's details is base64 encoded and store in local storage.

#### Attack

1. Attacker knows the user's username
2. Attacker use the javascript console on the browser to generate the base64 encoded string.
3. Suppose one user's name is called "admin"
4. Attacker issue the following command to get the encoded string: `btoa(JSON.stringify({name: "admin", goal: 1000, volume: 1}))`
5. Attacker then issue this command to add the string into local storage: `localStorage.setItem("user", "\<the encoded string\>")
6. Then attacker presses the "Drink Water" button
7. Frontend will try to decode the string attacker put and realize there is an existing user called "admin". Then Frontend cross-check wiht backend and found out that this user **does exist** and therefore successfully authenticate the attacker into the victim's account

#### Solution

> Use password encryption instead of encoding! Password should be encrypted by the backend and store the encrypted password in the database. Upon login, the password fetched from database is decrypted to match the input password.

> Use signed JWT Token for session authentication, instead of simply checking username via local storage store.

1. User login with username and password
2. The backend fetches the user object from database, decrypt the password and try to match with the input password received.
3. If match, backend generate and sign the JWT token with expiry time (e.g. 24 hours). backend sends the JWT token to frontend.
4. Frontend store JWT token in session cookie or local storage.

**Effect**

Attacker even if knows the user's name, he does not know the password. There is no way for the attacker to generate the exact same JWT token as attacker lacks information that the backend server has. Therefore, the frontend authentication process can safely use the JWT Token stored in cookie or local storage and cannot be mimicked by the attacker.

### Unsecure API routes

#### Overview

Currently, the web application has many routes that involve the update process of user's point, goal and volume values. These values should only be changed by the user himself / herself and no one else. Therefore, these routes after user login should be protected.

#### Attack

If the attacker knows the user's name, the attacker can easily modify the values of user's point, goal and volume without logging in. The attacker can use simple `curl` command or any request library to achieve this.

#### Solution

> Protect the routes that can only be accessible by the logged in user himself / herself !

Backend server should split those routes that require further authorization with a new path (e.g. `/api/auth/...`). The server can also implement a middleware that checks the route and perform authorization checks before forward to the route handling itself.

Protected routes require request to always include the current **JWT Token** stored by the frontend. Backend will decode the JWT Token and checks if the token is still valid and not expired. Only with valid JWT Token that the backend can forward the request to the corresponding protected route request handler.

**Effect**

Attacker cannot re-create the JWT Token due to password encryption is only known by the backend server. Therefore, server checking valid JWT Token cannot be compromised, leaving the attacker unable to send those requests to protected routes as the attacker does not have valid JWT Token.

### Alternative to JWT Token

The web application can also implement OAUTH to get the OAUTH token in place of the JWT Token. Using OAUTH provider such as Google, Facebook, etc. allow the user to use their social accounts to register and login instead. In this case, the attacker also cannot mimic the OAUTH token as it is generated securely at the service provider side.

## API Documentation

![API Documentation](./docs/api.png)
