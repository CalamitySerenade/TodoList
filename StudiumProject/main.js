const inputCreate=document.getElementById("name");
const inputJoin=document.getElementById("")
const ul=document.getElementById("testing");
const create=document.getElementById("createBtn");
create.addEventListener("click", async(e)=>{
    e.preventDefault();
    const studyboardCreate=document.createElement("li");
    const studyboardCreateDisplay=document.createTextNode(inputCreate.value);
    studyboardCreate.appendChild(studyboardCreateDisplay);
    document.getElementById("testing").appendChild(studyboardCreate);
    alert("Studyboard created sucessfully!");
    inputCreate.value="";
})

const join=document.getElementById("joinBtn");
join.addEventListener("click", async(e)=>{
    e.preventDefault();
    const studyboardJoin=document.createElement("li");
    const studyboardJoinDisplay=document.createTextNode(inputCreate.value);
    studyboardCreate.appendChild(studyboardCreateDisplay);
    document.getElementById("testing").appendChild(studyboardCreate);
    alert("Sucessfully joined a studyboard!")
})