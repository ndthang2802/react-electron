# Introducion:
This application is project of subject SE004.L21 at University Of Information Technology - HCM VNU

# Require:
 - python3
 - nodejs
 - mySQL
# Run the application:

Clone from github:
```sh 
git clone https://github.com/ndthang2802/react-electron.git
```
Run this command
```sh 
npm install
npm install @material-ui/lab@4.0.0-alpha.59
```

To lauch application:
```sh
cd clients
npm run dev 
or 
cd clients
npm run start
```

To lauch server

- Setting database (change file server_hotel/setting.py) 
- You can use the csv file in folder SQL_DATA to insert to your database
```python
DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.mysql',
      'NAME': '...',
      'HOST': '127.0.0.1',
      'PORT' : '3306',
      'USER' : '...',
      'PASSWORD': '...'
  }
}
```
 - > Change NAME, USER and PASSWORD 
 - > Install some python module
```
Django (version > 3.1)
pyJWT
mysqlclient
djangorestframework
django-cors-headers
```

- Run command

```sh
python manage.py makemigrations
python manage.py migrate
```

- To create account for login:

```sh
python manage.py createsuperuser
```

- Run the server

```
python manage.py runserver
```

# Make App using electron-buider
- Install package
```
npm install -g electron-builder
npm install -D eletron
npm install electron-is-dev
```
- Edit file main.js (electron)
```
const isDev = require('electron-is-dev')
if(isDev){
            win.loadURL('http:127.0.0.1:3000')
        }
else{
        win.loadFile('build/index.html')
    }
```
- add this line to scripts in package.json
```
  "electron:build": "npm run build && electron-builder -c.extraMetadata.main=build/main.js",
```
- add lines bellow to package.json
```
  "homepage": "./",
   "build": {
    "extends": null,
    "appId": "com.example.ndthang",
    "files": [
      "dist/**/*",
      "build/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "directories": {
      "buildResources": "assets"
    }
  },
```

- Run this command:

```
npm run  electron:build
```

- If it doesn't work

- > move the main.js file in clients/public/electron to folder clients/public
- > change 
```
  "main": "public/electron/main.js",
to
  "main": "public/main.js",
```