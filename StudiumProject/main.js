import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userStatus = document.getElementById("userStatus");
    const createBtn = document.getElementById("createBtn");
    const joinBtn = document.getElementById("joinBtn");
    const studyboardsList = document.getElementById("testing");

    // Check user authentication state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            userStatus.textContent = "Welcome, " + user.email;
            await displayStudyBoards(user); // Display study boards for the logged-in user
        } else {
            userStatus.textContent = "Please log in to view your study boards.";
            setTimeout(() => {
                window.location.href = "Home.html";
            }, 2000);
        }
    });

    // Function to display study boards
    async function displayStudyBoards(user) {
        try {
            const q = query(
                collection(db, "studyboards"),
                where("owner", "==", user.email) // Fetch study boards owned by the user
            );
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs;

            studyboardsList.innerHTML = ""; // Clear the list before rendering

            docs.forEach((doc) => {
                const board = doc.data();
                const li = document.createElement("li");
                li.textContent = `${board.name} - ${board.timestamp ? new Date(board.timestamp.seconds * 1000).toLocaleString() : "No date"}`;
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
        const nameInput = document.getElementById("name");
        const name = nameInput.value.trim();

        if (!name) {
            alert("Please enter a studyboard name.");
            return;
        }

        try {
            const user = auth.currentUser;
            if (!user) {
                alert("You must be logged in to create a studyboard.");
                return;
            }

            // Add the new study board to Firestore
            await addDoc(collection(db, "studyboards"), {
                name: name,
                owner: user.email,
                timestamp: new Date(),
            });

            nameInput.value = ""; // Clear the input
            alert("Studyboard created successfully!");
            await displayStudyBoards(user); // Refresh the list to show the new study board
        } catch (error) {
            console.error("Error creating studyboard:", error);
        }
    });

    // Join an existing study board
    joinBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const idInput = document.getElementById("ID");
        const boardId = idInput.value.trim();

        if (!boardId) {
            alert("Please enter a studyboard ID.");
            return;
        }

        try {
            const q = query(collection(db, "studyboards"), where("__name__", "==", boardId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("Studyboard not found. Please check the ID.");
                return;
            }

            alert("Successfully joined the studyboard!");
            idInput.value = ""; // Clear the input
        } catch (error) {
            console.error("Error joining studyboard:", error);
        }
    });
});