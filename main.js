import { db } from "./firebase-config.js"
import { doc, collection, deleteDoc, updateDoc, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

async function displayAllTasks() {
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const list = document.getElementById("list");
        if (list) {
            list.innerHTML = ""; 
            querySnapshot.forEach((doc) => {
                const task = doc.data();
                const li = document.createElement("li");
                li.textContent = `ID: ${doc.id} | ${task.name} - ${task.date} - ${task.status} (${task.priority})`; 
                list.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Error with Task Display", error);
    }
}

// 
const taskForm = document.querySelector(".taskCreate form");
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const newTask = {
        name: document.getElementById("taskName").value,
        date: document.getElementById("ETC").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value
    };

    try {
        await addDoc(collection(db, "tasks"), newTask); 
        taskForm.reset(); 
        displayAllTasks(); 
        alert("Task Added!");
    } catch (error) {
        console.error("Error adding task:", error);
    }
});


displayAllTasks();

const completeButton = document.getElementById("complete");
const progressButton = document.getElementById("progress");

completeButton.addEventListener("click", async () => {
    const taskID = document.getElementById("taskID").value;
    const taskRef = doc(db, "tasks", taskID)
    await updateDoc(taskRef, { status: "Completed" })
    displayAllTasks(); 
    alert("Task has been completed")
})

progressButton.addEventListener("click", async () => {
    const taskID = document.getElementById("taskID").value;
    const taskRef = doc(db, "tasks", taskID)
    await updateDoc(taskRef, { status: "In Progress" })
    displayAllTasks(); 
    alert("Task is In Progress")
})

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", async () => {
    const taskID = document.getElementById("taskID").value;
    const taskRef = doc(db, "tasks", taskID)
    await deleteDoc(taskRef);
    displayAllTasks(); 
    alert("Task has been successfully deleted!")
})