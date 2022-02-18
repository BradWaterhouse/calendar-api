# Node calendar API

---

Simple node calendar API using MySQL and express.

## Prerequisites

---

- `Node`
- `npm`/`yarn`
- `MySQL`
---

## Preparation

- Clone repository and run `npm install`/`yarn install`
- Create a `.env` file to store database credentials (copy `env.local` variable names)

### Database

If you'd like to connect to the database being used in the example follow the steps below in your DB management tool.

```mysql
CREATE DATABASE calendar_app;

CREATE TABLE calendar (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE calendar_event (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    calendar_id INT(11) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date_time DATETIME NOT NULL,
    KEY `calendar_id` (`calendar_id`),
    CONSTRAINT `calendar_event_fk` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`id`)
);
```
---

## Run

---

- Run ``node .`` in root of project to start Node server
- Visit `localhost:8888/...` to access your API endpoints.



