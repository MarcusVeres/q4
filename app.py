from flask import Flask, request, render_template, redirect
from werkzeug.utils import secure_filename
from datetime import datetime
import os

# initial app config

UPLOAD_DIR = 'static/img'
ALLOW = ["png", "jpg", "jpeg", "gif", "webm"]

app = Flask(__name__)

app.config['UPLOAD_DIR'] = UPLOAD_DIR
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


# configure jinja to use different {{ delimiters }}
# since jinja and vue use the same ones 

jinja_options = app.jinja_options.copy()

jinja_options.update(dict(
    block_start_string='<%',
    block_end_string='%>',
    variable_start_string='%%',
    variable_end_string='%%',
    comment_start_string='<#',
    comment_end_string='#>'
))
app.jinja_options = jinja_options


# helper functions 

def validate_file(filename) :
     return '.' in filename and filename.rsplit('.', 1)[1] in ALLOW


# routes 

@app.route('/')
def index() :
    return render_template( 'index.html' )


# start the app

if __name__ == '__main__' :

    app.debug = True
    app.run()

