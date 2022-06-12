const modal = document.getElementById("contact_modal");
const openModalBtn  = document.querySelector(".photograph-header .contact_button");
const mainWrapper = document.getElementById("main-wrapper");
const modalCloseBtn = document.querySelector(".modal img");




function displayModal() {
    modal.style.display = "block";
    mainWrapper.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
    modalCloseBtn.focus()
    keyEscapeModal()
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
