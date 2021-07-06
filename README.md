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

- Setting database

  ![image-20210707002355925](C:\Users\tenno\AppData\Roaming\Typora\typora-user-images\image-20210707002355925.png)

  > Change NAME, USER and PASSWORD 

- Run command

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
