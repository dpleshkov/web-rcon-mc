io = io || null;

// Establish websocket connection to the root URL
let socket = io.connect(location.protocol+"//"+document.domain+":"+location.port);

let RCONPassword = window.localStorage.getItem("rcon-pw");

let postMessage = function(message) {
    // To avoid errors, set default values
    message.author = message.author || "";
    message.content = message.content || "";
    message.color = message.color || "#000000";
    // Create our HTML element which we will then display on the page
    let messageElement = document.createElement("span");
    // Format the innerHTML of the span element
    if (message.author.length > 0) {
        messageElement.innerHTML = `<b>${message.author}:</b> ${message.content} <br/>`;
    } else {
        messageElement.innerHTML = `${message.content} <br/>`;
    }
    // Color the message
    messageElement.setAttribute("style", `color: ${message.color}; display: block`);
    // Finally, display the message in #chatBox
    document.getElementById("chatBox").appendChild(messageElement);
}

// When server notifies me of new chat message =>
socket.on("message", (message, data) => {
    postMessage(data);
});

// Event listener for Enter key in the input box
document.getElementById("inputBox").addEventListener("keyup", function(evt) {
    if (evt.key === "Enter") {
        if (document.getElementById("messageInput").value.startsWith("/password")) {
            RCONPassword = prompt("Please enter the RCON password, leave empty if you wish to clear it");
            window.localStorage.setItem("rcon-pw", RCONPassword);
            window.localStorage.setItem("rcon-pw", RCONPassword);
            postMessage({
                content: "RCON password set. Type /password to reset it or change it."
            });
            document.getElementById("messageInput").value = "";
            document.getElementById("messageInput").focus();
            return;
        }
        socket.emit("command", {
            command: document.getElementById("messageInput").value,
            pw: RCONPassword
        });
        postMessage({
            author: "In",
            content: document.getElementById("messageInput").value
        });
        document.getElementById("messageInput").value = "";
        document.getElementById("messageInput").focus();
    }
});

if (!RCONPassword) {
    RCONPassword = prompt("Please enter the RCON password");
    window.localStorage.setItem("rcon-pw", RCONPassword);
    postMessage({
        content: "RCON password set. Type /password to reset it or change it."
    });
} else {
    postMessage({
        content: "Using saved RCON password. Type /password to reset it or change it."
    });
}