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

## Client

Run this command (in both folder clients and root-folder)
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



## Server
To lauch server:
```sh
cd .\server_hotel\ 
```
Then go step by step:
- Setting database (change file server_hotel/setting.py) 

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
  > Change NAME, USER and PASSWORD 
 - You can use the csv file in folder SQL_DATA to insert to your database
 -  Install some python module
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

- Create account for login:

```sh
python manage.py createsuperuser
```

- Run the server

```
python manage.py runserver
```
