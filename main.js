import {db} from "./firebase-config.js"
import {doc,collection,deleteDoc,updateDoc,getDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"



const deleteButton=document.getElementById("delete");
deleteButton.addEventListener("click", async()=>{
    const taskID=document.getElementById("taskID").value;
    const taskRef=doc(db,"tasks",taskID)
    await deleteDoc(taskRef);
    alert("Task has been sucessfully deleted!")
})
