function checkPass() {
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if (pass1.value == pass2.value) {
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match"
    } else {
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
}

// validates text only
function Validate(txt) {
    txt.value = txt.value.replace(/[^a-zA-Z-'\n\r.]+/g, '');

}
// validate email
function email_validate(email) {

    var regMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regMail.test(email) == false) {
        document.getElementById("status").innerHTML = "<span class='warning'>Email address is not valid yet.</span>";

    } else {
        document.getElementById("status").innerHTML = "<span class='valid'>Thanks, you have entered a valid Email address!</span>";

    }
}

// validate address
function add_validate(address) {
    var regAdd = /^(?=.*\d)[a-zA-Z\s\d\/]+$/;

    if (regAdd.test(address) == false) {
        document.getElementById("statusAdd").innerHTML = "<span class='warning'>Address is not valid yet.</span>";
    } else {
        document.getElementById("statusAdd").innerHTML = "<span class='valid'>Thanks, Address looks valid!</span>";
    }
}
// validate Age
function add_validate(age) {

    var age = +document.getElementById('age').value;

    if (!(age > 20 && age < 60)) {

        alert("The age must be a number between 20 and 60");
        return false;
    }
    return true;
}

// save data to json file

$(document).ready(function() {
    $("#btn-register").click(function(e) {
            var jsonData = [];

            if ($("#password").val() == $("#rewritepassword").val()) {
                if (localStorage.getItem("users") == null) {

                    jsonData.push({
                        "username": $("#username").val(),
                        "firstname": $("#firstname").val(),
                        "lastname": $("#lastname").val(),
                        "address": $("#address").val(),
                        "email": $("#email").val(),
                        "age": $("#age").val(),
                        "password": $("#password").val(),
                    });

                    localStorage.setItem("users", JSON.stringify(jsonData));

                } else {

                    jsonData = JSON.parse(localStorage.getItem("users"));
                    var checkusername = false;
                    var checkemail = false;

                    $.each(jsonData, function(key, value) {
                        if (value.username == $("#username").val()) {
                            checkusername = true;
                        }
                        if (value.email == $("#email").val()) {
                            checkemail = true;
                        }
                    })
                    if (checkusername) { alert("You Register with this youser please  change username please") } else if (checkemail) { alert("change email please") } else {
                        jsonData.push({
                            "username": $("#username").val(),
                            "firstname": $("#firstname").val(),
                            "lastname": $("#lastname").val(),
                            "address": $("#address").val(),
                            "email": $("#email").val(),
                            "age": $("#age").val(),
                            "password": $("#password").val(),
                            "new": true

                        });
                        //console.log("ss");
                        $("#pReg").removeClass("d-none");

                        localStorage.setItem("users", JSON.stringify(jsonData));
                    }
                }
            } else { alert("check the two password please"); }

        }

    );
});