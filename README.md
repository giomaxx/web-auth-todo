# web-auth-todo
A fully functional todo website

Web Auth Todo
Technologies used: DJANGO, DJANGO REST FRAMEWORK, REACT, REDUX, MATERIAL UI

Not just a simple todo app, but a fully functional website!

Probably overkill for the project itself but great to use some of the best technologies around.

For the backend I used Django and Django Rest Framework.

As soon as they open the website, the user will be asked to authenticate to see their tasks.


Landing Page
Landing Page
First of all I created a custom user and a custom user manager to override the Django default user model. 

Then I implemented the authentication with the help of Djoser, and I used dj-rest-auth (the maintained version of django-rest-auth) to create the endpoints; to increase security I also added JWT tokens, managed with SimpleJWT.


The user must authenticate with their email and not their username. There is also a verification email process, which is also necessary if the user forgot the password or just wants to change it.

Once the user is logged in, the backend will send their todos to the frontend using a filter, then they can perform all the CRUD operations (create, retrieve and view, edit, delete and mark as completed), which are subject to restrictions through a permissions system.


The frontend was developed with React. To allow communications with the backend I used Axios, and the state of the authentication system  is managed by Redux. 

On the other end, the state of the todos is handled just with React Hooks, so in some components the two state managing systems coexist.
