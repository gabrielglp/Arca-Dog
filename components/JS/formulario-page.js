const buttonForm = document.querySelector('.button');
const fadeElement = document.querySelector('#fade');
const closeButton = document.querySelector('#close-message');
const messageElement = document.querySelector('#message');
const form = document.querySelector('.address-from');


let clickButton = (e) => {
    e.preventDefault();
     messageElement.classList.toggle('hide');
     fadeElement.classList.toggle('hide')
};

let hidenMessage = (e) => {
    e.preventDefault();
    fadeElement.classList.toggle('hide')
    messageElement.classList.toggle('hide')
}

form.addEventListener('submit', clickButton)
closeButton.addEventListener('click', hidenMessage)