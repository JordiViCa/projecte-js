// Element joc
const jocQuiz = document.getElementById("jocQuiz");
// Exportar funcio initGame()
export function initGame() {
    // Fem el fetch per carregar resposetes
    let correctResponses = {}
    fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple',{
        method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
        let res = response.results;
        let i = 0;
        // Recorrem les respostes
        res.forEach(el => {
            // Guardem la resposta correcte
            correctResponses[i] = el.correct_answer;
            // Creem el contingut de la pregunta -> div 4 radio i labels
            let responses = [el.correct_answer].concat(el.incorrect_answers)
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
            let text = document.createElement("p");
            text.innerHTML = "Pregunta " + i + "<br>" + el.question;
            let div = document.createElement("div");
            div.setAttribute("class","flex flex-col m-2 p-5 bg-gray-100 rounded-md");
            div.appendChild(text);
            
            responses.forEach(response => {
                let div2 = document.createElement("div");
                let radio = document.createElement("input");
                radio.setAttribute("type","radio");
                radio.setAttribute("id",response);
                radio.setAttribute("class","mr-10");
                radio.setAttribute("name",i);
                let label = document.createElement("label");
                label.innerText = response;
                label.setAttribute("for",response);
                label.setAttribute("id",response+"r");
                div2.appendChild(radio);
                div2.appendChild(label);
                div.appendChild(div2);
            });
            jocQuiz.appendChild(div);
            i++;
        });
        // Creem el boto per avaluar
        let button = document.createElement("button");
        button.innerText = "Avalua";
        button.setAttribute("class","px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-all");
        button.setAttribute("id","avaluaJoc");
        jocQuiz.appendChild(button);
        // Afegim el addEventListener per enviar
        document.getElementById("avaluaJoc").addEventListener("click", () => {
            let i = 0
            Object.keys(correctResponses).forEach(key => {
                if (document.getElementById(correctResponses[key]).checked) {
                    document.getElementById(correctResponses[key]+"r").classList.add("text-green-500")
                    i++;
                } else {
                    document.getElementById(correctResponses[key]+"r").classList.add("text-orange-500")
                }
            });
            jocQuiz.removeChild(document.getElementById("avaluaJoc"))
            let correcte = document.createElement("p");
            correcte.innerText = "Has encertat " + i + " respostes !!"
            jocQuiz.appendChild(correcte)
        });
    });
}