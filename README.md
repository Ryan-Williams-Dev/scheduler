# Interview Scheduler

---

A single page app build with React. Users can book, edit, and cancel appointments. Putting in their name and selecting an interviewer from the days available interviewers. A responsive layout means it can be used effectly on any device. It persists the in a database and updates users on updates form other browswers via a websocket.

Technologies utilised for this app include React, Axios, Sass, WebPack for the front end, Cypress, Jest and Testing Library for testing, and Node.js, Express, and PostgreSQL for the server side api.

This app has uses a back end api server, you can git clone this url `git@github.com:Zenophage/scheduler-api.git` for that server 

![Viewing current interviews](https://github.com/Zenophage/scheduler/blob/master/docs/img1.png?raw=true)
![Booking an interview](https://github.com/Zenophage/scheduler/blob/master/docs/img2.png?raw=true)
![cancelling an interview](https://github.com/Zenophage/scheduler/blob/master/docs/img3.png?raw=true)

## Installation 

To install:
```bash
git clone git@github.com:Zenophage/scheduler.git <directory_name>
cd <directory_name>
npm install
```

## Dependencies

 * node.js version 12.22.5
 * postgreSQL
 * axios
 * cypress
 * prop-types
 * sass
 * classames