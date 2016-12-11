# Marcus Veres - Contact Manager

## Requirements

- linux or mac SO system
- python 
- pip
- virtualenv 

## Installation

### Automated Installer 

You should be able to get everything to run with the install script.
It will install all dependencies 

    sh setup.sh


### Manual Install

Ensure you have pip installed  
https://pip.pypa.io/en/stable/installing/
    [sudo] easy_install pip

Ensure you have virtualenv installed  
https://virtualenv.pypa.io/en/stable/installation/
    [sudo] pip install virtualenv

Get the Python server running 
    [ run these from inside the parent directory ]
    virtualenv venv
    . venv/bin/activate
    pip install -r pip-requirements.txt
    py app.py
 
Navigate to localhost:5000/


## Notes

Apologies for some of the hacks in the code. I thought this test would be a good opportunity to learn VueJS. 
Unfortunately, it comes with a few caveats that would have required restructuring of the app to fix. Instead, I opted to hack together a solution.

I wish I had enough time to TDD this, but... oh well! 

### Original Brief

The detailed description of the assignment is included in the index.html file attached, but here are the highlights. 
The idea behind this assignment is to create a contact list with the following functionality:
1) As a user I can see a list of contacts (from JSON file attached)
2) As a user I am able to add a contact to the list
3) As a user I am able to edit user's detail

Bonus functionality:
1) When creating a new / editing existing user to add / update the record to the JSON file 
2) Add filtering or search to the list
3) Make the UI responsive 

### Process / Idea 

- pull in the json using json loading helper 
- create an array of objects for the contacts
- when creating a new user, add to the array of objects 
- maybe wanna use vue JS for the front end to make things simple
- for saving the file, use python on the back end 

