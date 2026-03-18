import {db} from "firebase-config.js"
const deleteButton=document.getElementById("delete");
deleteButton.addEventListener("click", async()=>{
    const taskID=document.getElementById("taskID").value;
    const taskRef=doc(db,"tasks",taskID)
    await deleteDoc(taskRef);
    alert("Task has been sucessfully deleted!")
})