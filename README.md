# Expo

-----

### Automated Installer 

You should be able to get everything to run with the install script.
It will install all dependencies 

    sh install-server.sh
    sh install-frontend.sh
    sh run.sh 

### Manual Install

Get the Python server running 

    virtualenv venv
    . venv/bin/activate
    pip install -r pip-requirements.txt
    py app.py

Get the front-end server running 

    http-server -p 8989
    
Navigate to localhost:8989/

----

### Notes:

Apologies for some of the hacks in the code. I thought this test would be a good opportunity to learn VueJS. 
Unfortunately, it comes with a few caveats that would have required restructuring of the app to fix. Instead, I opted to hack together a solution.

I wish I had enough time to TDD this, but... oh well! 
Wrote some tests after the fact :)

-----
    
### Contacts Expo

The detailed description of the assignment is included in the index.html file attached, but here are the highlights. 
The idea behind this assignment is to create a contact list with the following functionality:
1) As a user I can see a list of contacts (from JSON file attached)
2) As a user I am able to add a contact to the list
3) As a user I am able to edit user's detail

Bonus functionality:
1) When creating a new / editing existing user to add / update the record to the JSON file 
2) Add filtering or search to the list
3) Make the UI responsive 


### Tech Stack

Vanilla JS - to show off capabilities, we're going to avoid libraries 
Helper File - pull from 
Karma + Jasmine - best to go with a simple testing framework 
Semantic UI - because it's pretty, though we could go for a custom sass layout to show how pro we are
Custom Sass - pull starter sass file because it's fun :)
Django - you know what? Fuck it... maybe use Django for the back-end calls 
FontAwesome - let's get some fancy icons in this bitch 
My own photo - why the fuck not?


### Process / Idea 

- pull in the json using json loading helper 
- create an array of objects for the contacts
- when creating a new user, add to the array of objects 
- maybe wanna use vue JS for the front end to make things simple
- for saving the file, use python on the back end 


### NOTE + TODO : 

- get the test library to read javascript from the static folder, not the src folder ;)
- update your gulp library versions and shit

