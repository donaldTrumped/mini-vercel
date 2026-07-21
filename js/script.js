const button = document.getElementById("myButton");
const input = document.getElementById("messageInput");
const message = document.getElementById("message");

button.addEventListener("click", async function () {

fetch("/api/message")
    .then(response => response.json())
    .then(data => {
        document.getElementById("message").textContent = data.message;
    });


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