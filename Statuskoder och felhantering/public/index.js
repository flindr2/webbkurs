const url = 'http://localhost:5001/status-codes-e79aa/us-central1/users';

let users = [];

const HttpStatusCodes = {
    "BadRequest": 400,
}

const userTable = document.querySelector("#userTable");
const createUserButton = document.querySelector("#createUserButton");
const userNameField = document.querySelector("#userNameField");
const userEmailField = document.querySelector("#userEmailField");
const createUserErrorMessage = document.querySelector("#createUserErrorMessage");

initialize();

function initialize() {
    getUsers();
    createUserButton.addEventListener("click", createUser);
}

async function getUsers() {
    try {
        const response = await fetch(url);
        
        if(response.ok) {
            users = await response.json();
            renderUserTable();
        }
        else {
            throw new Error(response.statusText);
        }
    }
    catch (err) {
        throw err;
    }
}

async function createUser() {
    const newUser = { name: userNameField.value, email: userEmailField.value };
    
    // // client validation
    if(!newUser.name || !validateEmail(newUser.email)) {
        return showValidationMessage();
    }
    
    try {
        const response = await fetch(url, 
            { 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser) 
            });
        
        if(response.ok) {
            // if everything went ok we add the new user to the table, rerender the table and clears the form.
            users.push(newUser);
            renderUserTable();
            clearForm();
        }
        // bad request
        else if(response.status === HttpStatusCodes.BadRequest) {
            const message = await response.text();
            throw message;
        }
        else {
            throw response.statusText;
        }
    } 
    catch (err) {
        console.log(err);
        
        alert(err);
    }
}

function renderUserTable() {
    let tableRow = "";

    users.forEach(user => {
        tableRow += 
        `<tr id=${user.id}>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>`;
    });

    userTable.innerHTML = tableRow;
}

function showValidationMessage() {
    createUserErrorMessage.style.display = "block";
    createUserErrorMessage.innerHTML = "Both email and user name is required. Email needs to be a valid email-address.";
}

function validateEmail(email) {
    if(!email || !email.includes("@")) {
        return false;
    }
    else return true;
}

function clearForm() {
    userNameField.value = '';
    userEmailField.value = '';
    createUserErrorMessage.style.display = "none";
    createUserErrorMessage.innerHTML = "";
}
