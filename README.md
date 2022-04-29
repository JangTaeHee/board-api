# Output
A simple bulletin board api server built with NestJS.

## How to run
1. [Preparing the database](#database)
2. [Run the server](#build-and-run)
3. [Add keyword sample data](#keyword-sample-data)
4. [API test](#api)

## Database
- You do not need to create a table. When you run the server, table is automatically generated with the 'synchronize: true' setting in TypeORM.
```bash
# mysql

# version
$ mysql --version
mysql Ver 8.0.28

# create test database
mysql> create database test;

# create test user
mysql> create user 'test'@'localhost' identified by 'test';

# test db grant
mysql> grant all privileges on test.* to test@localhost;
```

## Build and Run
```bash
# package install
$ yarn

# run local server
$ yarn start # production mode
$ yarn start:dev # development mode

# test
$ yarn test

# build
$ yarn build

# run server
$ node dist/main.js
```

## Keyword Sample Data
```bash
# mysql

# insert keyword sample data
mysql> insert into keyword(keyword, writer) values('test,hi,news', 'tom');
mysql> insert into keyword(keyword, writer) values('node.js,nestjs', 'jack');
```

## API
1. read board - cursor pagination
    ```bash
    # Request
    # query
    # - subject: like, (and), (optional)
    # - writer: like, (and), (optional)
    # - type: 'lt' | 'gt', (optional), (default: 'lt')
    # - cursor (optional)
    # - limit (optional), (default: 5)
    curl --location --request GET 'localhost:8080/board/list?subject=first&writer=tom&limit=5&type=lt&cursor=0'

    # Response
    [
        {
            "id": 1,
            "subject": "first",
            "content": "hi, my name is tom",
            "writer": "tom",
            "createdAt": "2022-04-29T15:00:00.000Z",
            "updatedAt": "2022-04-29T15:00:00.000Z"
        }
    ]
    ```
2. create board
    ```bash
    # Request
    # body
    # - subject: (required)
    # - content: (required)
    # - writer: (required)
    # - password: (required)
    curl --location --request POST 'localhost:8080/board/create' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "subject": "first",
        "content": "hi, my name is tom",
        "writer": "tom",
        "password": "1234"
    }'

    # Response
    {
      "subject": "first",
      "content": "hi, my name is tom",
      "writer": "tom",
      "id": 1,
      "createdAt": "2022-04-29T15:00:00.000Z",
      "updatedAt": "2022-04-29T15:00:00.000Z"
    }
    ```
3. update board
    ```bash
    # Request
    # body
    # - subject: (optional)
    # - content: (optional)
    # - password: (required)
    curl --location --request PUT 'localhost:8080/board/update/1' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "subject": "first update",
        "content": "hello",
        "password": "1234"
    }'

    # Response
    {
      "id": 1,
      "subject": "first update",
      "content": "hello",
      "writer": "tom",
      "createdAt": "2022-04-29T15:00:00.000Z",
      "updatedAt": "2022-04-29T18:05:01.000Z"
    }
    ```
4. delete board
    ```bash
    # Request
    # body
    # - password: (required)
    curl --location --request DELETE 'localhost:8080/board/delete/1' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "password": "1234"
    }'

    # Response
    STATUS 200
    ```
5. read comment - cursor pagination
    ```bash
    # Request
    # query
    # - type: 'lt' | 'gt', (optional), (default: 'lt')
    # - cursor (optional)
    # - limit (optional), (default: 5)
    curl --location --request GET 'localhost:8080/comments/list/board/8?limit=5&type=lt&cursor=0'

    # Response
    [
        {
            "id": 6,
            "boardId": 1,
            "content": "1-2",
            "writer": "tom",
            "createdAt": "2022-04-29T15:11:33.912Z",
            "children": []
        },
        {
            "id": 3,
            "boardId": 2,
            "content": "2-2",
            "writer": "tom",
            "createdAt": "2022-04-29T15:11:27.452Z",
            "children": [
                {
                    "id": 7,
                    "boardId": 2,
                    "content": "2-2-1",
                    "writer": "jack",
                    "createdAt": "2022-04-29T15:11:35.527Z",
                    "children": []
                },
            ]
        },
        {
            "id": 2,
            "boardId": 2,
            "content": "2-1",
            "writer": "tom",
            "createdAt": "2022-04-29T15:11:26.020Z",
            "children": []
        },
        {
            "id": 1,
            "boardId": 1,
            "content": "1-1",
            "writer": "jack",
            "createdAt": "2022-04-28T15:11:25.524Z",
            "children": [
                {
                    "id": 4,
                    "boardId": 1,
                    "content": "1-1-1",
                    "writer": "jack",
                    "createdAt": "2022-04-28T15:11:29.210Z",
                    "children": []
                },
                {
                    "id": 5,
                    "boardId": 1,
                    "content": "1-1-2",
                    "writer": "tom",
                    "createdAt": "2022-04-28T15:11:30.481Z",
                    "children": []
                },
            ]
        }
    ]
    ```
6. create comment
    ```bash
    # Request
    # body
    # - content: (required)
    # - writer: (required)
    # - parentId: (optional)
    curl --location --request POST 'localhost:8080/comments/create/board/1' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "content": "second comment",
        "writer": "jack",
        "parentId": 1
    }'

    # Response
    {
        "boardId": 8,
        "content": "second comment",
        "writer": "jack",
        "parent": { # if exists parent
            "id": 1,
            "boardId": 8,
            "content": "1",
            "writer": "jack",
            "createdAt": "2022-04-28T15:12:29.000Z"
        },
        "id": 18,
        "createdAt": "2022-04-29T15:12:31.000Z"
    }
    ```

## Schema
- You do not need to create a table. When you run the server, table is automatically generated with the 'synchronize: true' setting in TypeORM.
```bash
mysql> desc board;
+-----------+---------------+------+-----+-----------+-------------------+
| Field     | Type          | Null | Key | Default   | Extra             |
+-----------+---------------+------+-----+-----------+-------------------+
| id        | int           | NO   | PRI | NULL      | auto_increment    |
| subject   | varchar(255)  | NO   |     | NULL      |                   |
| writer    | varchar(255)  | NO   |     | NULL      |                   |
| password  | varchar(255)  | NO   |     | NULL      |                   |
| createdAt | datetime      | NO   |     | CURRENT_TIMESTAMP() | DEFAULT_GENERATED |
| updatedAt | datetime      | NO   |     | CURRENT_TIMESTAMP() | DEFAULT_GENERATED |
| content   | varchar(3000) | NO   |     | NULL      |                   |
+-----------+---------------+------+-----+-----------+-------------------+

mysql> desc comment;
+-----------+--------------+------+-----+-----------+-------------------+
| Field     | Type         | Null | Key | Default   | Extra             |
+-----------+--------------+------+-----+-----------+-------------------+
| id        | int          | NO   | PRI | NULL      | auto_increment    |
| boardId   | int          | NO   | MUL | NULL      |                   |
| content   | varchar(255) | NO   |     | NULL      |                   |
| writer    | varchar(255) | NO   |     | NULL      |                   |
| createdAt | datetime     | NO   |     | CURRENT_TIMESTAMP() | DEFAULT_GENERATED |
| parentId  | int          | YES  | MUL | NULL      |                   |
+-----------+--------------+------+-----+-----------+-------------------+

mysql> desc comment_closure;
+---------------+------+------+-----+---------+-------+
| Field         | Type | Null | Key | Default | Extra |
+---------------+------+------+-----+---------+-------+
| id_ancestor   | int  | NO   | PRI | NULL    |       |
| id_descendant | int  | NO   | PRI | NULL    |       |
+---------------+------+------+-----+---------+-------+

mysql> desc keyword;
+---------+---------------+------+-----+---------+----------------+
| Field   | Type          | Null | Key | Default | Extra          |
+---------+---------------+------+-----+---------+----------------+
| id      | int           | NO   | PRI | NULL    | auto_increment |
| writer  | varchar(255)  | NO   |     | NULL    |                |
| keyword | varchar(3000) | NO   |     | NULL    |                |
+---------+---------------+------+-----+---------+----------------+
```

## File structure
```bash
├── dist
├── logs
├── node_modules
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── common
│   │   ├── constants
│   │   ├── exceptions
│   │   │   └── http-exception.filter.ts
│   │   └── utils.ts
│   ├── config
│   │   ├── app
│   │   │   ├── config.module.ts
│   │   │   ├── config.service.spec.ts
│   │   │   ├── config.service.ts
│   │   │   └── configuration.ts
│   │   └── database
│   │       └── mysql
│   │           ├── config.module.ts
│   │           ├── config.service.spec.ts
│   │           ├── config.service.ts
│   │           └── configuration.ts
│   ├── database
│   │   └── mysql
│   ├── main.ts
│   ├── models
│   │   ├── board
│   │   │   ├── board.controller.spec.ts
│   │   │   ├── board.controller.ts
│   │   │   ├── board.module.ts
│   │   │   ├── board.service.spec.ts
│   │   │   ├── board.service.ts
│   │   │   ├── dto
│   │   │   │   ├── board-create.dto.ts
│   │   │   │   ├── board-delete.dto.ts
│   │   │   │   ├── board-read.dto.ts
│   │   │   │   └── board-update.dto.ts
│   │   │   ├── entities
│   │   │   │   └── board.entity.ts
│   │   │   └── interfaces
│   │   │       └── board.interface.ts
│   │   ├── comments
│   │   │   ├── comments.controller.spec.ts
│   │   │   ├── comments.controller.ts
│   │   │   ├── comments.module.ts
│   │   │   ├── comments.service.spec.ts
│   │   │   ├── comments.service.ts
│   │   │   ├── dto
│   │   │   │   ├── comments-create.dto.ts
│   │   │   │   └── comments-read.dto.ts
│   │   │   ├── entities
│   │   │   │   └── comment.entity.ts
│   │   │   └── interfaces
│   │   │       └── comments.interface.ts
│   │   └── keyword
│   │       ├── entities
│   │       │   └── keyword.entity.ts
│   │       ├── keyword.module.ts
│   │       ├── keyword.service.spec.ts
│   │       └── keyword.service.ts
│   └── providers
│       └── database
│           └── mysql
│               ├── mysql.module.ts
│               └── mysql.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── README.md
├── nest-cli.json
├── package.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```