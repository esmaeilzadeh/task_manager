## Installation

```bash
$ cp .env.example .env
$ docker-compose up
```

I commented the pgadmin in docker-compose if you need to view db you can uncomment the pgadmin service and run this:
```bash
$ docker-compose down
$ docker-compose up
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Instruction

1- Open http://localhost:3004/swagger (with user: admin, password: admin)

2- Open v1/auth/register part and create a user with your own email and password.
  for example:
```json
{
    "email": "esmailzadeh@gmail.com",
    "password": "AaBbCc102030"
}
```

3- Click on Authorize button (in the top right corner of the page), add accessToken string from result of previous part to "JWT-auth" part and click on "Authorize" button.
  - add accessToken string from result of previous part to "JWT-auth" part and click on "Authorize" button.
  - add refreshToken string from result of previous part to "JWT-auth-refresh" part and click on "Authorize" button.

4- Task APIs are now available to use.

5- every time you got unauthorized error you can call "v1/auth/refresh" and get new accessToken then repeat the 3 part.


