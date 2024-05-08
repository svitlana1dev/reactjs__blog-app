### Description

Client part of Blog with a simple React app, GraphQL and Apollo Client.<br>
In this app routes setting up to different components using react-router-dom library.

#### App contain 4 pages:

- /signup to create new user
- /signin for authorization
- /posts displays list of published post of all users
- /profile/:id show user profile with all published posts.<br>
  Auth user with own id on profile page have possibility add new post, delete post or change status of post published/unpublished

### How to run project

Create .env file with variable REACT_APP_SERVER_URI = graphql uri

#### Install Dependencies:

```
npm install
```

#### Running the app:

```
$ npm run start
```
