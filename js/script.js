const button = document.getElementById("myButton");
const input = document.getElementById("messageInput");
const message = document.getElementById("message");

button.addEventListener("click", async function () {

    await fetch("/api/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: input.value
        })
    });

    const response = await fetch("/api/message");
    const data = await response.json();

    message.textContent = data.message;
});