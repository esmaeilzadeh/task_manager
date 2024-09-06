## Installation

```bash
$ cp .env.example .env
$ docker-compose up
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Instruction

Open http://localhost:3004/swagger
Open v1/auth/register part and create a user with your own email and password.
for example:
```json
{
    'email': "esmailzadeh@gmail.com",
    'password': "AaBbCc102030"
}
```
click on Authorize button (in the top right corner of the page), add accessToken string from result of previous part to "JWT-auth" part and click on "Authorize" button.


