import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userStatus = document.querySelector("nav h3"); // Update to match your nav structure
    const createBtn = document.getElementById("createBtn");
    const joinBtn = document.getElementById("joinBtn");
    const studyboardsList = document.getElementById("testing");

    // Listen for authentication state changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Display user information
            userStatus.textContent = `Welcome, ${user.displayName || "User"}!`;

            // Display study boards for the logged-in user
            await displayStudyBoards(user);
        } else {
            // Redirect to home page if not logged in
            window.location.href = "home.html";
        }
    });

    // Function to display study boards
    async function displayStudyBoards(user) {
        try {
            const q = query(collection(db, "studyboards"), where("owner", "==", user.email));
            const querySnapshot = await getDocs(q);

            studyboardsList.innerHTML = ""; // Clear the list before rendering

            querySnapshot.forEach((doc) => {
                const board = doc.data();
                const li = document.createElement("li");
                li.textContent = board.name;
                li.style.cursor = "pointer";

                // Add click event to navigate to dashboard
                li.addEventListener("click", () => {
                    window.location.href = `dashboard.html?boardId=${doc.id}`;
                });

                studyboardsList.appendChild(li);
            });
        } catch (error) {
            console.error("Error fetching study boards:", error);
        }
    }

    // Create a new study board
    createBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        if (!name) return alert("Enter a name.");

        try {
            const user = auth.currentUser;
            await addDoc(collection(db, "studyboards"), {
                name,
                owner: user.email,
                timestamp: new Date(),
            });

            alert("Studyboard created successfully!");
            await displayStudyBoards(user); // Refresh the list
        } catch (error) {
            console.error("Error creating study board:", error);
        }
    });

    // Join an existing study board
    joinBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const boardId = document.getElementById("ID").value.trim();
        if (!boardId) return alert("Enter a board ID.");

        try {
            const docRef = doc(db, "studyboards", boardId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                alert("Board not found.");
                return;
            }

            window.location.href = `dashboard.html?boardId=${boardId}`;
        } catch (error) {
            console.error("Error joining study board:", error);
        }
    });
});