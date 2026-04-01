import { auth, db } from "./firebase-config.js";
import { collection, addDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const boardId = params.get("boardId");

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("messageInput");
    const boardName = document.getElementById("boardName");

    // Set the board name
    boardName.textContent = `Study Board: ${boardId}`;

    // Send a new message
    sendBtn.addEventListener("click", async () => {
        const text = messageInput.value.trim();
        if (!text) return alert("Enter a message.");

        try {
            const user = auth.currentUser;
            await addDoc(collection(db, "messages"), {
                boardId,
                text,
                user: user.displayName || "Anonymous",
                pfp: user.photoURL || "",
                timestamp: new Date(),
            });

            messageInput.value = ""; // Clear the input
        } catch (error) {
            console.error("Error sending message:", error);
        }
    });

    // Listen for new messages
    const q = query(collection(db, "messages"), where("boardId", "==", boardId));
    onSnapshot(q, (snapshot) => {
        container.innerHTML = ""; // Clear the container before rendering

        snapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement("div");
            div.classList.add("message-box");

            div.innerHTML = `
                <div class="row">
                    <img class="pfp" src="${data.pfp}" alt="User PFP">
                    <b>${data.user}</b>
                </div>
                <div class="msg-content">${data.text}</div>
            `;

            container.appendChild(div);
        });
    });
});