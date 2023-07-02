from flask import Flask, Blueprint, render_template, request, flash, redirect, url_for, session, jsonify, Response
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_, desc
import datetime
from datetime import timedelta, datetime, date
from .models import User, Score, Follow
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user
import random, time
import pytz #timezone calculations
from flask_session import Session

auth = Blueprint('auth', __name__)

#<-----------------------------SIGNUP----------------------------->
@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        name = request.form.get('fullname')
        dobRaw = request.form.get('dob')
        dob = datetime.strptime(dobRaw, '%m/%d/%Y')

        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(username=username).first()
        if user and user.is_active:
            flash('username already exists.', category='error')
        elif len(username) < 2:
            flash('Your username must be greater than 1 character', category='error')
        elif password1 != password2:
            flash('Passwords must match!', category='error')
        elif len(password1) < 4:
            flash('password must be greater than 7 characters', category='error')
        else:
            new_user = User(username=username, name=name, dob=dob, password=generate_password_hash(password1, method="sha256"))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account successfully created', category='success')
            return redirect(url_for('auth.prompt'))

    return render_template("signup.html", user=current_user)

#<-----------------------------LOGIN----------------------------->
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()

        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('auth.prompt'))
            else:
                flash('Incorrect password', category='error')
        else:
            flash('user does not exist', category='error')

    return render_template("login.html", user=current_user)

#<-----------------------------PROMPT----------------------------->
@auth.route('/prompt', methods=['GET', 'POST'])
@login_required
def prompt():
    if request.method =='POST':
        return redirect(url_for('auth.question'))

    return render_template("prompt.html", user=current_user)

#<-----------------------------LOGOUT----------------------------->
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

#<-----------------------------LEADERBOARD----------------------------->
@auth.route('/leaderboard')
def leaderboard():
    scores = Score.query.order_by(Score.score.desc()).limit(15).all()
    for score in scores:
        score.score = int(score.score)
    return render_template('leaderboard.html', user=current_user, scores=scores)

#<-----------------------------QUESTION----------------------------->
@auth.route('/question', methods=['GET', 'POST'])
@login_required
def question():
    if request.method =='GET':
        selector = request.args.get("selector")
        return render_template("question.html", user=current_user, selector=selector)

#<-----------------------------END----------------------------->
@auth.route('/end', methods=['GET', 'POST'])
def end():
    if request.method =='GET':
        score = request.args.get("score")
        correct = request.args.get("Correct")
        return render_template("end.html", user=current_user, score=score, correct=correct)

#<-----------------------------SCORE----------------------------->
@auth.route('/savescore', methods=['POST'])
@login_required
def savescore():
    if request.method =='POST':

        # retrieve score variable from js file using fetch
        score = request.json['score']
        selector = request.json['selector']

        if selector == '1':
            type = 'Addition'
        elif selector == '2':
            type = 'Subtraction'
        elif selector == '3':
            type = 'Multiplication'
        elif selector == '4':
            type = 'Everything'
        else:
            type = 'Unknown'

        # get current username
        username = current_user.username

        #get current user full name
        name = current_user.name

        # find current time in BST
        bst = pytz.timezone('Europe/London')
        date = datetime.now(bst)

        flash('Score saved sucessfully!')

        new_score = Score(username=username, name=name, score=score, type=type, date=date)
        db.session.add(new_score)
        db.session.commit()

#<-----------------------------SEARCH----------------------------->
@auth.route('/search', methods=['GET', 'POST'])
@login_required
def search():
    if request.method == 'POST':
        search_query = request.form['search']

        # Perform search query and return results
        search = User.query.filter(or_(User.username.like(f'%{search_query}%'),
                                        User.name.like(f'%{search_query}%'))).all()

        # query if current user is already following result user
        follows = Follow.query.filter_by(current_user=current_user.username).all()
        usernames = [follow.username for follow in follows]
        length = len(search)

        results = []
        for i in range(length):
            results.append(len(search))

        lengthFinal = length
        for user in search:
            if user.username == current_user.username:
                lengthFinal -= 1

        return render_template('search_results.html', usernames=usernames, user=current_user, results=results, User=User, length=length, lengthFinal=lengthFinal, search=search)
    return render_template('search.html', user=current_user)

#<-----------------------------PROFILE----------------------------->
@auth.route('/profile/<username>')
@login_required
def profile(username):

    session = db.session
    userQuery = User.query.filter_by(username=username).first()

    today = date.today()
    dob = userQuery.dob
    age = today.year - dob.year  - ((today.month, today.day) < (dob.month, dob.day))
    scores = Score.query.order_by(Score.score.desc()).filter_by(username=username).limit(15).all()
    for score in scores:
        score.score = int(score.score)

    follows = Follow.query.filter_by(current_user=current_user.username).all()
    usernames = [follow.username for follow in follows]

    # find number of users you are following
    followingQuery = Follow.query.filter_by(current_user=username).all()
    following = len(followingQuery)
    # find number of followers the user has
    followersQuery = Follow.query.filter_by(username=username).all()
    followers = len(followersQuery)

    # calculate the last time the user saved a game score
    mostRecent = session.query(Score).order_by(desc(Score.date)).first()
    mostRecent = Score.query.filter_by(username=username).order_by(desc(Score.date)).first()
    current = datetime.now()
    timeDifference = current - mostRecent.date
    mins = int(timeDifference.total_seconds() // 60)
    hours = int(timeDifference.total_seconds() // 3600)
    days = timeDifference.days
    months = int(days / 30)

    # loop that converts the time to the correct units

    if months > 0:
        last = f"{months} month{'s' if months > 1 else ''} ago"
    elif days > 0:
        last = f"{days} day{'s' if days > 1 else ''} ago"
    elif hours > 0:
        last = f"{hours} hour{'s' if hours > 1 else ''} ago"
    else:
        last = f"{mins} minute{'s' if mins > 1 else ''} ago"

    for score in scores:
        score.score = int(score.score)

    return render_template('profile.html', user=current_user, scores=scores, User=User, age=age, last=last, following=following, followers=followers, userQuery=userQuery)

#<-----------------------------FOLLOW----------------------------->
@auth.route('/follow/', methods=['POST'])
@login_required
def follow():
    if request.method =='POST':

        username = request.json['username']

        user = User.query.filter_by(username=username).first()

        current_username = current_user.username

        follow_user = Follow(current_user=current_username, username=username)
        db.session.add(follow_user)
        db.session.commit()

        return Response(status=204)

#<-----------------------------UNFOLLOW----------------------------->
@auth.route('/unfollow/', methods=['POST'])
@login_required
def unfollow():
    if request.method=='POST':

        username = request.json['username']
        user = User.query.filter_by(username=username).first()
        current_username = current_user.username

        unfollow_user = Follow.query.filter_by(current_user=current_username, username=username).first()
        db.session.delete(unfollow_user)
        db.session.commit()

        return Response(status=204)

#<-----------------------------FOLLOWING----------------------------->
@auth.route('/following/')
@login_required
def following():
    search_query = " "
    # show list of users that current user has followed
    search = User.query.filter(or_(User.username.like(f'%{search_query}%'),
                                        User.name.like(f'%{search_query}%'))).all()

    # query if current user is already following result user
    follows = Follow.query.filter_by(current_user=current_user.username).all()
    usernames = [follow.username for follow in follows]
    length = len(follows)

    results = []
    for i in range(length):
        results.append(length)

    return render_template('following.html', usernames=usernames, user=current_user, results=results, User=User, length=length, search=search, follows=follows)


#<-----------------------------FOLLOWERS----------------------------->
@auth.route('/followers/')
@login_required
def followers():
    search_query = " "
    search = User.query.filter(or_(User.username.like(f'%{search_query}%'),
                                        User.name.like(f'%{search_query}%'))).all()

    followers = Follow.query.filter_by(username=current_user.username).all()
    usernames = [follower.current_user for follower in followers]
    length = len(followers)

    results = []
    for i in range(length):
        results.append(length)

    return render_template('followers.html', usernames=usernames, user=current_user, results=results, User=User, length=length, search=search, followers=followers)

#<-----------------------------REMOVE FOLLOWER----------------------------->
@auth.route('/remove/', methods=['POST'])
@login_required
def remove():
    if request.method=='POST':
        current_username = request.json['username']

        user = User.query.filter_by(username=current_username).first()

        username = current_user.username

        remove_user = Follow.query.filter_by(current_user=current_username, username=username).first()
        db.session.delete(remove_user)
        db.session.commit()

        return Response(status=204)