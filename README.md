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
npm install concurrently wait-on cross-env @material-ui/core
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



- Run command

```sh
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

To create account for login:

```sh
python manage.py createsuperuser
```

