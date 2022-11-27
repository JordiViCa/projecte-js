import "../node_modules/flatpickr/dist/flatpickr.js";
await fetch('/.env', {method: 'GET'}).then(response => response.json()).then(response => {regToken = response.fakejsonToken});
var regToken = ""
export function initRegister() {
    // Iniciar flatpickr
    flatpickr("#bDate")
    // variables
    let filter = /^[a-z \u00E0-\u00FC · \s .]{2,50}$/i;
    let finalController = true;
    let nameControler = false;
    let surnameControler = false;
    let emailControler = false;
    let genders = ["men","woman","no-binary"]
    let bDateControler = false;
    // Adeventlistener a click de tencar popup
    document.getElementById("closePopup").addEventListener("click", () => {
        popup.classList.add("opacity-0");
        popup.classList.add("-z-10");
        popup.classList.remove("opacity-100");
        popup.classList.remove("z-10");
        document.body.style.overflow = "auto";
    });
    // Comprovar nom
    document.getElementById("name").addEventListener("focusout", (el) => {
        let error = document.getElementById("nameError");
        if (filter.test(el.target.value)) {
            error.classList.add("opacity-0");
            nameControler = true;
        } else {
            error.classList.remove("opacity-0");
            nameControler = false;
        }
        if (nameControler && surnameControler && emailControler && bDateControler) {
            document.getElementById("sendRegister").disabled = false;
        } else {
            document.getElementById("sendRegister").disabled = true;
        }
    });
    // Comprovar cognom
    document.getElementById("surname").addEventListener("focusout", (el) => {
        let error = document.getElementById("surnameError");
        if (filter.test(el.target.value)) {
            error.classList.add("opacity-0");
            surnameControler = true;
        } else {
            error.classList.remove("opacity-0");
            surnameControler = false;
        }
        if (nameControler && surnameControler && emailControler && bDateControler) {
            document.getElementById("sendRegister").disabled = false;
        } else {
            document.getElementById("sendRegister").disabled = true;
        }
    });
    // Comprovar email
    document.getElementById("email").addEventListener("focusout", (el) => {
        let error = document.getElementById("emailError");
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.target.value)) {
            error.classList.add("opacity-0");
            emailControler = true;
        } else {
            error.classList.remove("opacity-0");
            emailControler = false;
        }
        if (nameControler && surnameControler && emailControler && bDateControler) {
            document.getElementById("sendRegister").disabled = false;
        } else {
            document.getElementById("sendRegister").disabled = true;
        }
    });
    // Comprovar genere
    document.getElementById("gender").addEventListener("change", (el) => {
        let error = document.getElementById("genderError");
        if (genders.includes(el.target.value)) {
            error.classList.add("opacity-0");
        } else {
            error.classList.remove("opacity-0");
        }
        if (nameControler && surnameControler && emailControler && bDateControler && genders.includes(el.target.value)) {
            document.getElementById("sendRegister").disabled = false;
        } else {
            document.getElementById("sendRegister").disabled = true;
        }
    });
    // Comprovar bDate
    document.getElementById("bDate").addEventListener("change", (el) => {
        let error = document.getElementById("bDateError");
        try {
            let actualYear = new Date();
            let bDate = new Date(el.target.value);
            if (bDate < actualYear) {
                let age = actualYear.getFullYear() - bDate.getFullYear()
                document.getElementById("age").value = age;
                error.classList.add("opacity-0");
                bDateControler = true;
            } else {
                throw(error)
            }
        } catch (error) {
            bDateControler = false;
            error.classList.remove("opacity-0");
        }
        if (nameControler && surnameControler && emailControler && bDateControler) {
            document.getElementById("sendRegister").disabled = false;
        } else {
            document.getElementById("sendRegister").disabled = true;
        }
    });
    // Comprovar registre
    document.getElementById("sendRegister").addEventListener("click", () => {
        // Mirar que tots siguin true i sino error al que toca
        if (!nameControler) {
            finalController = false;
            document.getElementById("nameError").classList.remove("opacity-0");
        }
        if (!surnameControler) {
            finalController = false;
            document.getElementById("surnameError").classList.remove("opacity-0");
        }
        if (!emailControler) {
            finalController = false;
            document.getElementById("emailError").classList.remove("opacity-0");
        }
        if (!genders.includes(document.getElementById("gender").value)) {
            finalController = false;
            document.getElementById("genderError").classList.remove("opacity-0");
        }
        if (!bDateControler) {
            finalController = false;
            document.getElementById("bDateError").classList.remove("opacity-0");
        }
        // Si tots ok enviar fetch
        if (finalController) {
            var body = {
                "token": regToken,
                "data": {
                    "bdate": document.getElementById("bDate").value,
                    "email": document.getElementById("email").value,
                    "gender": document.getElementById("gender").value,
                    "name": document.getElementById("name").value,
                    "surname": document.getElementById("surname").value
                }
            };
            // Fetch a fakejson
            fetch('https://app.fakejson.com/q/cX7LZfDc', {
                method: 'POST',
                body: JSON.stringify(body),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .catch(error => {
                // Mostrar popup amb error
                let popup = document.getElementById("popup");
                document.getElementById("textPopup").innerHTML = `<h1 class="text-2xl text-red-500 font-bold">Error</h1><p>Torna a intentar en 5 minuts</p>`;
                popup.classList.remove("opacity-0");
                popup.classList.remove("-z-10");
                popup.classList.add("opacity-100");
                popup.classList.add("z-10");
                document.body.style.overflow = "hidden";
            })
            .then(response => response.json())
            .then(response => {
                // Mostrar popup amb done
                let popup = document.getElementById("popup");
                document.body.style.overflow = "hidden";
                document.getElementById("textPopup").innerHTML = `<h1 class="text-2xl text-green-500 font-bold">Registre creat!</h1>`;
                popup.classList.remove("opacity-0");
                popup.classList.remove("-z-10");
                popup.classList.add("opacity-100");
                popup.classList.add("z-10");
            });
        } else {
            finalController = true;
        }
    });
}