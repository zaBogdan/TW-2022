# Event handling 
Client A makes a request to endpoint `/listen/<companyId>` with the following request body

```json
{
    "event": "registeredUser",
    "userId": "8d190dc07a1c44829fb123ba233cb3ef"
}
```

Then in the backend we will do two things: 
- First check if the companyId exists
- Get information about the event (using event + companyId)
- Get information about the userId (using userId alone. If the user id doesn't exist in our database we will just create a new default user with that identification id)

Once everything is checked and fetched accordingly we will do the following:

1. Add the event to the user list and update user score
2. Push a task to the cron service to check wether we should combine the event with others and give more points to the user


# Microservices

### Gateway

The gateway microservice will be the one that will take all the load and forward the requests to the appropriate microservice

### Authentication

This microservice will handle all the authentication methods, at the starting point we will have only email & password. We will then give JWT access and refresh tokens


### Users service

This service targets the platform users (with editing accounts, profiles) - we must add an api key here

#### Gameify service (3x fiecare db are microserviciu lui)

This service targets all the logic behind gameification. Here we will point out the top features

- Adding a new domain (edit, delete, list - one/all)
- Adding a new event
- Adding a new achievement
- Listening to incomming events

### Evaluator service

With this service you will be able to evaluate the complex logic of each and every user. For example if we receive event `X` for user `Y` we will take all the rules in which event `X` is present and we will evaluate them using user `Y` data

# Database Models

### Authentication (BZV)

```json
{
    "_id": "3a8929d213da4ce0a85afe4e1f7b9f7d",
    "userId": "e13d88872b6641cda866b27d1e0920b6",
    "type": 1,
    "email": "bzavadovschi@pground.io",
    "password": "$2a$12$yYKC2ej7AWkZnKfXTSHy3eVINZ7HA.CWVZU00ZXwendRnjRtlBKSC",
    "active": true,
    "suspended": false
}
```

> **NOTE**: Type will always be 1 (because we will support only email & password).

### User (BZV)

```json
{
    "_id": "b4d0501cb79f4501aceef3520cb72ed7",
    "userId": "e13d88872b6641cda866b27d1e0920b6",
    "firstName": "Bogdan",
    "lastName": "Zavadovschi",
    "username": "zaBogdan",
    "dateOfBirth": "00.00.0000",
}
```

### Domains (ALIN)

```json
{
    "_id": "c89fcd3a1d3c49e793a54c74ff906131",
    "userId": "e13d88872b6641cda866b27d1e0920b6",
    "name": "PGround",
    "activeUrl": [
        "https://api.pground.io",
        "https://pground.io",
        "https://dashboard.pground.io",
    ],
    "registeredAt": 1655052444,
    "active": true,
    "administrators": [
        "e13d88872b6641cda866b27d1e0920b6",
    ]
}
```

### Events (LUCIAN)

```json
{
    "_id": "551c11e4798f47e39cc6fd50c21568be",
    "activeDomain": "c89fcd3a1d3c49e793a54c74ff906131",
    "name": "Login",
    "active": true
}
```

### Rules (BZV)

```json 
{
    "_id": "296696b71034461fb70a9e4913605d7e",
    "activeDomain": "c89fcd3a1d3c49e793a54c74ff906131",
    "name": "Logged in for 10 days in a row",
    "involvedEvents": [
        "551c11e4798f47e39cc6fd50c21568be",
    ],
    "reward": {
        "type": 1, //*1
        "score": 10,
        "objectId": null // here would be a string if type != 1 
    }
    "rule" : {
        "and": [
            {
                "eventId": "551c11e4798f47e39cc6fd50c21568be",
                "count": {
                    "gte": 10
                }
            }, 
            {
                "eventId": "48f4a0b74093439ba338bde75bd3178d",
                // to be done
            }
        ]
    }
}
```

> **Note**: *1: Type can be: 1 - score, 2 - achievement, 3 - rankup (go to next rank), 4 - rankdown (go to lower rank)

### Domain users (BZV)

```json
{
    "_id": "71122cde42d24cf09b3f8ddf371bb4d9",
    "listenerId": "8d190dc07a1c44829fb123ba233cb3ef",
    "activeDomain": "c89fcd3a1d3c49e793a54c74ff906131",
    "score": 120, 
    "events": {
        "551c11e4798f47e39cc6fd50c21568be": {
            "latest": 1655053258,
            "data": [
                1655053258
            ]
        } 
    },
    "achievements" : [
        // a list of badges ids here 
    ],
    "rank": "35b2fa5fc6c442f89cb5880ca6f4da95",
    "active": true
}
```


### Achivements (ALIN)

```json 
{
    "_id": "5ab5153a3f034bab91f62ed5ee648d9c",
    "name": "10 consecutive logins",
    "score": 100,
    "image": "firstImage",
    "activeDomain": "c89fcd3a1d3c49e793a54c74ff906131"
}
```

> **Note**: Action can be: 1 - points, 2 - rankup
### Ranks (LUCIAN)
```json
{
    "_id": "35b2fa5fc6c442f89cb5880ca6f4da95",
    "name": "Noobie",
    "activeDomain": "c89fcd3a1d3c49e793a54c74ff906131",
    "score": 1000,
    "rank": 0
}
```
> **Note**: Rank field is a logical order of ranks. For example if you are at level 3 and you levelup you will go to 4. This can be useful for rules that have reward of type "rankup"
