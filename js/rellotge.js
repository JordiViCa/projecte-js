
export async function rellotge() {
    // Rellotge que s'autocrida cada 5 segons
    let date = new Date();
    let hours = date.getHours().toString()  .length == 1 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes().toString()  .length == 1 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds().toString()  .length == 1 ? "0" + date.getSeconds() : date.getSeconds();
    let time = `${hours}:${minutes}:${seconds}`
    document.getElementById("rell").innerText = time;
    setTimeout(() => {
        rellotge();
    }, 5000);
}