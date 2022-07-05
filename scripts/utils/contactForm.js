// DOM
const modal = document.getElementById("contact_modal");
const openModalBtn  = document.querySelector(".photograph-header .contact_button");
const mainWrapper = document.getElementById("main-wrapper");
const modalCloseBtn = document.querySelector(".modal img");
const submit = document.getElementById("submit")





function displayModal() {
    modal.style.display = "block";
    mainWrapper.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
    modalCloseBtn.focus()
    keyEscapeModal()
    document.getElementById("first").focus()
    
}

function closeModal() {
    modal.style.display = "none";
    mainWrapper.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-hidden', 'true')
    openModalBtn.focus()
}

function keyEscapeModal(e) {
    document.addEventListener("keydown", e => {
        if (e.key == "Escape") {
            e.preventDefault()
            closeModal()
        }
    });
}

    // recuperation des entrées dans le formulaire
    const inputs = document.querySelectorAll("input, textarea");
    Array.from(inputs).forEach((input) => {
        submit.addEventListener("click", e=>{
            e.preventDefault()
            closeModal()
            console.log(input.value)
        }) 
    });