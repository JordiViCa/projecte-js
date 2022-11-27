fetch('/.env', {method: 'GET'}).then(response => response.json()).then(response => {OPAItoken = response.openaiToken});
var OPAItoken = ""
export async function fetchText(text, length = 100, model = "text-davinci-002") {
    return await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + OPAItoken
        },
        body: JSON.stringify({
            "model": model,
            "prompt": text,
            "max_tokens": length,
            "temperature": 0
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        return response.choices[0].text
    });
}
export async function fetchImg(text) {
    // Fetch d'imatges a openai
    return await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': OPAItoken
        },
        body: JSON.stringify({
            "prompt": text,
            "n": 3,
            "size": "512x512",
            "response_format": "url"
        })
    })
    .then(response => response.json())
    .then(response => {
        return response.data
    });
}