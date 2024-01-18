# TO-DO APP FROM UDEMY LESSON - 2021

This basic To-Do app is part of Brad Schiff's online Udemy course "Learn JavaScript: Full-Stack from Scratch".

## FEATURES BASED ON THE COURSE

The app demonstrates use of JavaScript on the backend, in a Node.js context, with the Express.js framework.
The server takes care of authentication, field sanitization, server-side rendering and allows CRUD operations on the items of the to-do list thanks to a local MongoDB database.

This app also demonstrates use of JavaScript on the frontend, in a browser context, using the DOM. It allows some client-side rendering to avoid solely relying on the server.

The backbone of the app is based on HTML5 complemented with Bootstrap.

## CUSTOM FEATURES/ADDITIONS

The MongoDB database is containerized, with Docker, and is automatically instanciated on the first launch of the container.
Added .prettierrc file for cohesive code visualisation.
Added environment variables and the npm dotenv package.
Added slight changes to the code to make it cleaner.
Added this README.md file.

## HOW TO DEPLOY THIS APP ON YOUR MACHINE

1. Copy the contents of .env.template in a newly created .env file at the root of the project. Fill in the missing fields. Altough it is not required, you may edit every field except DB_CONNECTION_STRING (this would break the app).

2. Install Node.js on your machine if you do not already have it. Execute the command "npm i" in a terminal at the project's location.

3. Install Docker on your machine if do not already have it. Execute the command "docker compose up" in a terminal at the project's location. You will know the process is complete when the container will be awaiting connections.
   If the process exits because it cannot find a reference to your OS and architecture, this means you will have to use another mongo image. You will have to edit the image field in the docker-compose.yml file. You may try "mongo:latest" or search for another tag here: https://hub.docker.com/_/mongo/tags. It is important that you choose a version superior to 6.0.0.

4. Execute the command "npm run start" at the project's location (or "npm run watch" for hot server reload).

5. In your browser, go to the following url: "http://localhost:3000/". Use the port number you have specified if you edited that environment variable.

6. You will be prompted to authenticate. Username is "learn". Password is "javascript". Hope you enjoy the app!
