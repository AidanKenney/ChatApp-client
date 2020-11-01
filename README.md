# :octocat: The Feed: An Online Forum :octocat:

The Feed is a message board application for users to create posts and responds to 
other users through comments in an open forum environment. I built this app as the V1 of
an ongoing social media project that will include chat messaging through Django 
Channels in future iterations. 

## Important Links

- [Deployed Client](aidankenney.github.io/chatapp-client/)
- [Deployed API](chatapp-api-django.herokuapp.com/)
- [API Repository](https://github.com/AidanKenney/ChatApp-api)

## Planning Story

This project grew out of an interest in building a simple social application with
user-generated content -- akin to sites like Reddit, Craiglist, or early Facebook. My initial
impulse was to create a chat room, but within the time limits of this project, and being my
first experience with Django and second with React, I realized that a message board was a more 
realistic V1. I began by building the API with Django and Django-Rest-Framework, and 
spent about a day and a half working on it before it was in shape to move to the client.
Coming off a previous project built with React, I was able to hit the ground running and 
have gained even more of an appreciation for React and its power for controlling views. 
I felt much more comfortable consulting the documentation for issues that arose, and was 
able to suss out why components were rendering unexpectedly or without the desired
data from the state much more quickly than on my first React project. It was a few days into
this project that I felt I truly understood how React was working, and could even anticipate
issues before checking the browser. 

One example of an issue I overcame had to do with hiding certain CRUD options based on 
whether a user owned certain resources. As I first built the components, a user who did 
not own a post or comment could click through until it seemed they would be able to alter
it. They would get an error if they tried, but in my mind this was not a satisfactory
user experience. I realized I could use the power of JSX to make these options conditional
on a user's ID -- if their ID does not match that of the post owner, show them Up/Down vote
options instead of update and delete. I was heartended by how quickly this occurred to me, 
and felt I had come a long way even from only weeks before when I was first introduced
to React. 

***

## Installation
1. Clone the repository: [Backend Github Repository](https://github.com/AidanKenney/ChatApp-api)
2. In the root directory of the backend project, type `pipenv shell` to start virtual environment, then `pipenv install` to install dependencies. 
3. Create a psql database for the project. Type 'psql' to get into interactive shell. Run 'CREATE DATABASE "your-DB-name";'
3. Type the following in the same root directory to start the server (take note of your python version before running command): `python3 manage.py runserver`
4. Clone the repository: [Front Github Repository](https://github.com/AidanKenney/ChatApp-client)
5. In the root directory of the front end project, type `npm i`.
6. Type the following in the same root directory: `npm start` to start the server.

***

### User Stories
    1.  As a signed in user, I would like to make a message board post.
    2.  As a signed in user, I would like to see all posts.
    3.  As a signed in user I would like to comment on a post. 
    4.  As a signed in user, I would like to update my own comments.
    5.  As a signed in user, I would like to delete my own comments and posts.

### Technologies Used
- JavaScript
- React / React-DOM-Router / React-Bootstrap
- axios
- Passport JS
- Bcrypt
- CSS/Sass
- Styled-Components
- MomentJS
- Python
- Django / Django-Rest-Framework
- SQL/PostgresQL

### Unsolved Problems
I have not been able to make the up/down vote component persist
after the view changes or on later visits to the site. I believe this will be relatively simple
to figure out on the front end once I am able to write an unauthenticated patch route
in the API. As it stands now, a user must own a given resource to be able to alter it
and update its status in the database. I will also need to store the voter's ID on the post
so that they cannot vote again and again.

As far as remaining reach goals, I still want to create a chat feature, order the feed
based on number of votes, and integrate a third-party-API to make an 'Article of the Day' feature, 
where everyday a new article would serve as a starting point for conversation. 

## Images

### Screenshots
![Imgur](https://i.imgur.com/5tHwhPi.png)
![Imgur](https://i.imgur.com/A0SSB8C.png)
![Imgur](https://i.imgur.com/RjWJKM6.png)

#### Wireframe:
![Screen Shot 2020-10-26 at 6 13 43 PM](https://media.git.generalassemb.ly/user/30258/files/ff902400-1832-11eb-8884-00dfc6f1d0cf)
