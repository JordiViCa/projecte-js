// Imports dels moduls
import { Slider } from './slider.js';
import { fetchText,fetchImg } from './openAI.js';
import { rellotge } from './rellotge.js';
import { initRegister } from './register.js';
import { initGame } from './joc.js';
// Funcio getText 
async function getText(text) {
    // Crida fetch a modul
    let result = await fetchText(text);
    // Eliminem \n i mostrem
    result = result.replace("\n\n","");
    textOutput.value = result;
    buttonSendToImg.disabled = false;
}
async function getImages(text) {
    // eliminem el slider actual i afegim hmtl generant imatge
    generateSlider.delete();
    document.getElementById("openAi").innerHTML = "<div class='bg-slate-200 relative'><p class='text-center text-lg sm:text-xl lg:text-4xl py-[50px] sm:py-[100px] lg:py-[200px] font-medium'>GENERANT...</p></div>";
    // Crida fetch a modul
    let result;
    try {
        result = await fetchImg(text);
        if (result != undefined) {
            // Per cada element afegim un div amb img
            document.getElementById("openAi").innerHTML = "";
            result.forEach(element => {
                let el = document.createElement("div");
                el.innerHTML = "<img src='" + element.url + "' class='mx-auto'>"
                document.getElementById("openAi").appendChild(el)
            });
        }
    } catch (error) {

    }
    // Tornem a generar slider
    generateSlider = new Slider(".openAi");
}
// variables i constants
const textOutput = document.getElementById("textOutput");
const buttonSendToImg = document.getElementById("sendTextToImg");
const displaySlider = new Slider(".displaySlider");
var generateSlider = new Slider(".openAi");
var window = "main";
// Carregar tema actual
if (localStorage.hasOwnProperty("href")) {
    document.getElementById("theme").setAttribute("href",localStorage.getItem("href"))
} else {
    document.getElementById("theme").setAttribute("href","css/" + "default" + ".css")
}
// Cridar als init dels moduls
rellotge();
initRegister();
initGame();
// addEventListener per desabilitar o no
textOutput.addEventListener("input", () => {
    if (textOutput.value != "") {
        buttonSendToImg.disabled = false;
    } else {
        buttonSendToImg.disabled = true;
    }
});
// addeventlistener sendInputToTXT
document.getElementById("sendInputToTXT").addEventListener("click", () => {
    getText(document.getElementById("textInputTXT").value);
});
// addeventlistener sendTextToImg
document.getElementById("sendTextToImg").addEventListener("click", () => {
    getImages(document.getElementById("textOutput").value);
});
// addeventlistener sendInputToIMG
document.getElementById("sendInputToIMG").addEventListener("click", () => {
    getImages(document.getElementById("textInputIMG").value);
});
// addeventlistener goStart (scroll)
document.getElementById("goStart").addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
// addeventlistener changeColor
document.getElementById("changeColor").addEventListener("click", (e) => {
    let arr = ["default","green","blue","red"]
    if (arr.includes(e.target.id)) {
        document.getElementById("theme").setAttribute("href","css/" + e.target.id + ".css");
        localStorage.setItem("href","css/" + e.target.id + ".css")
    }
});
// addeventlistener navBar (one page web)
document.getElementById("navBar").addEventListener("click", (e) => {
    let arr = ["nmain","nrellotge","nregistre","njoc"];
    let id = e.target.id.substring(1)
    if (arr.includes(e.target.id) && window != id) {
        document.getElementById(window).classList.add("hidden");
        document.getElementById(id).classList.remove("hidden");
        window = id;
    }
});