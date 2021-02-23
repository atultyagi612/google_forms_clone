# google_forms_clone

A clone of Google forms using nodejs

This repository contains code for google forms clone using Nodejs , express .

# Getting Start

The backend of this application consists of a MongoDB database managed with REST API powered by Node and Express. The backend is hosted on and deployed to Heroku. The frontend is made in EJS .

# Dependencies 

```
Nodejs
express
EJS
express-session
method-override
mongoose
dotenv
connect-mongo
passport
passport-google-oauth20
path
mime-lib
multer
nodemailer
sharp
uuidv4
```
* The overall application is similar to google forms. There are following major functionalities of application:
   * A Form builder
   * Sharing, filling & submitting the form
   * Viewing the responses
   * marking the filled form 
   * Email after succesfull submission

# DEMO 

Installing  all the dependances by ``` npm install ```

Run application by ``` npm start  ```

### **Login page**


![](images/login.jpg)


### **Create Form**

![](images/create_form.gif)

### **Add Images to form**

![](images/add_images.jpg)

### **Share Form**

![](images/share.jpg)

### **User form submission**

![](images/user_form.gif)
