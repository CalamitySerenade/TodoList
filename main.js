import {db} from "./firebase-config.js"
import {doc,collection,deleteDoc,updateDoc,getDocs} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

async function displayAllTasks(){
    try{
        const querySnapshot=await getDocs(collection(db,"tasks"));
        const tasks = [];
        querySnapshot.forEach((doc)=>{
            tasks.push({
                id: doc.id,
                ...doc.data()
            });
        })
        const list=document.getElementById("list")
        if(list){
            tasks.forEach((task)=>{
                const li=document.createElement("li");
                li.textContent=task.name + task.date + task.status + task.priority
            })
        }
        return tasks
    }catch (error){
        console.error("Error with Task Display", error);
    }
}
displayAllTasks();

const completeButton=document.getElementById("complete");
const progressButton=document.getElementById("progress");
completeButton.addEventListener("click", async()=>{
    const taskID=document.getElementById("taskID").value;
    const taskRef=doc(db, "tasks", taskID)
    await updateDoc(taskRef, {
        status:"Completed"
    })
    alert("Task has been completed")
})
progressButton.addEventListener("click", async()=>{
    const taskID=document.getElementById("taskID").value;
    const taskRef=doc(db, "tasks", taskID)
    await updateDoc(taskRef, {
        status:"In Progress"
    })
    alert("Task is In Progress")
})

const deleteButton=document.getElementById("delete");
deleteButton.addEventListener("click", async()=>{
    const taskID=document.getElementById("taskID").value;
    const taskRef=doc(db,"tasks",taskID)
    await deleteDoc(taskRef);
    alert("Task has been sucessfully deleted!")
})