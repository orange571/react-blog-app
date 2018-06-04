# Thought Collector

[Live Demo](https://thought-collector-app.herokuapp.com)

Thought Collector is an online diary app that allows users to create and keep track of posts. Users also have to capability of marking posts as public or private. Public posts are able to be viewed without logging in under the browse tab. Specific posts may be shared using a unique URL.

Features:
* Mark posts as public or private
* Share posts with friends with a unique URL
* Dashboard Sort: Sort posts by title alphabetically or by date created
* Search Posts: Search for a specific post title
* Display of Public Posts: Public posts may be viewed in stacked or grid view.

## Background And Learning Process

This project was primarily an exercise in using React, Redux, Webpack, and Firebase after having taken a React course. While basic operations such as creating, viewing, updating, and deleting posts were covered in the course, creating the distinction between public and private posts was a new challenge. I found that I had to reorganize how my Firebase database was structured and learn how to write more complex security rules for reading and writing data to the database.

## Possible Improvements
* Admin role to remove inappropriate posts
* More error handling for firebase requests
* Implement quill rich text editor
* Addition Login Options

## Built With

* React
* Redux
* Webpack
* NodeJS
* Firebase
* Express
* Jest
