1. Installed the important packages 
2. Created the database folder and created the db.js file inside it,and used the standard code to connect the database using the connectDB() function which can be named anything while importing in the index.js. It triggers the connect function.
3. Written the index.js with all the checks and security such as rate-limiting,cors,error handling,route error handling,security middleware,body parser middleware.

4. Plan the model and create the userSchema and export the model.

# this->it is the object for an object, instance for an schema. Arrow functions don't have their own this,so avoid arrow function where this is required :
<!-- userSchema.methods.checkPassword = function (enteredPassword) {
  return this.password === enteredPassword;
}; -->

