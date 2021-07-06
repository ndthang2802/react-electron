# Introducion:
This application is project of subject SE004.L21 at University Of Information Technology - HCM VNU

# Require:
 - python3
 - nodejs
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
npm run start
```

To lauch server

- The server in folder server is MSSQL server (which is not finish)
- The server in folder server_hotel is MySQL (finished) 
- You can use the csv file in folder SQL_DATA to insert to your database

- Setting database

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hotel_database',
        'HOST': '127.0.0.1',
        'PORT' : '3306',
        'USER' : 'root',
        'PASSWORD': '1711877874'
    }
}

```

  > Change NAME(name of database in mySQL) , USER and PASSWORD 
  > Delete the 0001_initial.py in folder authentication/migrations and api/migrations
- Run the command bellow

```
python manage.py makemigrations
python manage.py migrate
```

Create account for login:
```
python manage.py createsuperuser
```
Run server
```
python manage.py runserver
```
