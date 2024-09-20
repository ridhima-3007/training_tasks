var userName = prompt("Enter your name");

if(userName != null) {
    document.getElementById("name").innerHTML = userName;
}

function getLocalStorage(a) {
    return JSON.parse(localStorage.getItem(a));
}

function setLocalStorage(a, b) {
    localStorage.setItem(a , JSON.stringify(b));
}



