var loggedusers = [];
var users = [{
  // ID of the user
  id: 1,
  // username of the user
  username: 'user1',
  password: 'a',
  // type of the user, currently using 'user', 'admin' and 'supplier', but technically it could be _anything_
  type: 'user'
}, {
  id: 2,
  username: 'admin1',
  password: 'b',
  type: 'admin'
}, {
  id: 3,
  username: 'supplier1',
  password: 'c',
  type: 'supplier'
}];

function getUserByProperty(key, value, strict, multiple, case_insensitive) {
  // prepare a result array
  var result = [];

  // loop through all of our users
  for (var index in users) {
    // get the user we are iterating through now
    var user = users[index];

    // check if the user has the specified property
    if (typeof user[key] != 'undefined') {
      // get the property value
      var compare = user[key];

      // doing something case insensitive
      if (case_insensitive) {
        // if the property value is a string
        if (typeof compare == 'string')
        // we want to turn it to lower case
          compare = compare.toLowerCase();

        // if the specified value is a string
        if (typeof value == 'string')
        // we want to turn it to lower case
          value = value.toLowerCase();
      }

      // if specified value is not defined, or values match
      if (typeof value == 'undefined' || ((strict && compare === value) || (!strict && compare == value))) {
        // if we want multiple results
        if (multiple) {
          // the result will be appended to the result array
          result.push(user);
        } else {
          // otherwise we just return it
          return user;
        }
      }
    }
  }

  // return the results or null, if nothing was found (for single match search)
  return multiple ? result : null;
}

function getUserById(id) {
  return getUserByProperty('id', id);
}

function getUserByUsername(username, case_insensitive) {
  return getUserByProperty('username', username, false, false, case_insensitive);
}

function getUsersByType(type, case_insensitive) {
  return getUserByProperty('type', type, false, true, case_insensitive);
}

function login(username, password) {
  // checks whether username and password have been filled in
  if (typeof username == 'string' && typeof password == 'string' && username.length > 0 && password.length > 0) {
    // prepare a variable to store the user object, if any is received
    var loggeduser;

    // server should handle everything below...
    // iterate through all users in the 'users' array (or database table perhaps, on server-side)
    for (var index in users) {
      // grab the property value with the property
      var user = users[index];

      // check if username and password match
      if (username === user.username && password === user.password)
      // set value of 'loggeduser' to the property value (user)
        loggeduser = user;
    }
    // ... up to this point, and the user returned from the server should be set in to 'loggeduser'
    // make sure highly sensitive information is not returned, such as hash, salt or anything

    // check whether the user is set
    if (typeof loggeduser != 'undefined') {
      // save the ID of the user to the 'loggedusers' array
      loggedusers[loggeduser.id] = true;

      // update the logged in list
      updatelist();

      // return the received user object
      return loggeduser;
    }
  }

  return false;
}

function logout(userid) {
  // check whether the ID is actually logged in
  if (loggedusers[userid]) {
    // temporary array, which we will be filling
    var temporary = [];

    // let's loop through logged users
    for (var id in loggedusers)
    // ignore our user
      if (id != userid)
      // let's put this user to the array
        temporary[id] = true;

      // we replace the 'loggedusers' array with our new array
    loggedusers = temporary;

    // update the logged in list
    updatelist();

    // we have successfully logged out
    return true;
  }

  // we have not successfully logged out
  return false;
}

function updatelist() {
  // get the #logged-in-list element
  var list_element = document.getElementById('logged-in-list');

  // check the element exists 
  if (list_element) {
    // get the #logged-in element
    var list_container_element = document.getElementById('logged-in');

    // check the element exists and that we should be changing the styles
    if (list_container_element)
    // if there are no logged in users, "hide" the element, otherwise "show" it
      list_container_element.style.visibility = loggedusers.length === 0 ? 'hidden' : 'visible';

    // we take the first child with a while loop
    while (list_element.firstChild)
    // remove the child, and it will repeat doing so until there is no firstChild left for the list_element
      list_element.removeChild(list_element.firstChild);

    // we loop through every logged in user
    for (var id in loggedusers) {
      // get the user by ID
      var user = getUserById(id);

      // check if that user is a user
      if (user) {
        // we create necessary elements to cover our logout functionality
        var p = document.createElement('P');
        p.innerText = user.username;
        var a = document.createElement('A');
        a.userid = id;
        a.href = '#';
        a.innerHTML = '(logout)';

        // we bind an onclick event listener to the link
        a.addEventListener('click', function(e) {
          e.preventDefault();

          // we will now execute the logout function for this user ID
          logout(e.srcElement.userid);
        });

        // we append the link to the paragraph element
        p.appendChild(a);

        // we append the paragraph to the list element
        list_element.appendChild(p);
      }
    }

    return true;
  }

  return false;
}

// add a new 'onsubmit' event listener to the '#login-form' node
// this will be triggered each time the form is submitted via any method
document.getElementById('login-form').addEventListener('submit', function(e) {
  // prevent default browser behavior
  e.preventDefault();

  // find the username and password nodes
  var username_element = e.srcElement.elements.username;
  var password_element = e.srcElement.elements.password;

  // check whether these elements return right stuff
  if (username_element && password_element) {
    // get the values of username and password
    username = username_element.value;
    password = password_element.value;

    // execute the 'login' function with the username and password filled in on the client
    var user = login(username, password);

    // check whether the login was successful
    if (user !== false) {
      // reset the username input field
      username_element.value = '';

      // reset the password input field
      password_element.value = '';

      // alert the client that login was successful
      alert('Logged in as ' + user.username + '.');


      if(users.type=='admin'){

      window.open('AdminPanel.html');
      }      
      else
      {
      window.open('Attendance.html');
      }


    } else {
      // reset the password input field
      password_element.value = '';

      // alert the client that login was not successful
      alert('Invalid username and/or password.');
    }
  }
}); 