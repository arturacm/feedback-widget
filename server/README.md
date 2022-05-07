## A Widget React Application


A backend server application for recieving user feedback, saving it to a database and notifying the team by email.

### Technologies

* NodeJs
* Express
* Prisma
* Nodemailer
* Cors
* Jest

### Setup

In order for the project to work, you'll need to setup the `.env`. There is a `.example.env` on this repository with what you need.
#### Mail test
In order for the mail funcionality to work, you'll have to create a account on [Mailtrap](https://mailtrap.io/) and add your credentials to `MAILTRAP_USER=` and `MAILTRAP_PASS=` inside `.env`

### How to use
To run locally, use the command:
```
npm run dev
```
The backend only has the endpoint `/feedbacks` using the **POST** method.<br>
By sending a request to it, the data will be validated and added to a database.<br>
Then a email will be sent to the responsible team for addressing the feeback. At the moment, this part is on a testing enviroment using Mailtrap.