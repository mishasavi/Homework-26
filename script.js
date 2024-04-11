let newUser = {}

addUser.onclick = () => {
    if (login.value.trim() !== '') {
        newUser = {
        "firstName": firstName.value.trim(),
        "lastName": lastName.value.trim(),
        "login": login.value.trim(),
        "password": password.value.trim() //Should I or should I not?
    }
        addNewUser();

}else{
        alert('Please enter login');
    }
    firstName.value = '';
    lastName.value = '';
    login.value = '';
    password.value = '';
}

addNewUser = function (){

fetch('https://webaccounting.herokuapp.com/account/user', {
    method: 'post',
    headers: {
        'Authorization': 'Basic '+btoa('username:password'),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
})
    .then(response => {
        if (response.ok) {
            return response.json();
        }else{
            throw new Error (response.status)
        }
    })
    .then(data => {
        const output = document.createElement('h3');
        const outputText = document.createTextNode(`Login created successfully: ${data.login}`);
        output.appendChild(outputText);
        (result.firstElementChild) ? result.replaceChild(output,result.firstElementChild) : result.appendChild(output);
    })
    .catch(e => {
        const errorStatus = document.createElement('h3');
        const errorText = document.createTextNode(`Could not add user: ${e}`);
        errorStatus.appendChild(errorText);
        (result.firstElementChild) ? result.replaceChild(errorStatus,result.firstElementChild) : result.appendChild(errorStatus);
    })}


