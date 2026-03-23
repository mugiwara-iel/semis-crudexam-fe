const content=document.querySelector("#content");
const submit=document.querySelector("#add");
const update=document.querySelector("#update");

//POST API
submit.addEventListener('click',()=>{
    let name=document.querySelector("#name").value;
    let university=document.querySelector("#university").value;
    let role=document.querySelector("#role").value;
    let department=document.querySelector("#department").value;
    let formData={name,university,role,department};

    fetch("https://semis-crudexam.onrender.com/api/users",{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("Intern Added Successfully");
    location.reload();
});


window.addEventListener('load', ()=>{
    getUsers();
})

function getUsers(){
    let html=""
    //FETCH API
    fetch('https://semis-crudexam.onrender.com/api/users',{mode:'cors'})
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`<tr><td> ${element.id} </td> 
            <td>${element.name}</td> 
            <td> ${element.university} </td>
            <td> ${element.role} </td>
            <td> ${element.department} </td>
            <td class="btns">
            <button onClick="deleteMember(${element.id})">Delete</a>
            
            <button onClick="updateMember(${element.id})">Update</a>
            </td>`
        })

        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
    })
}

//DELETE 
function deleteMember(id){

    let text;
    if(confirm("Press a button!")==true){
        fetch("https://semis-crudexam.onrender.com/api/users",{
        method:'DELETE',
        body: JSON.stringify({id}),
        headers:{
            "Content-Type":"application/json",
        },
    }).then(response=>response.text())
    .then(response=>console.log("response"))
    .catch(error=>{
        console.log(error);
    })

        location.reload();
}

    else{text="You canceled!";}
    
}

//SEARCH
function updateMember(id){
    fetch(`https://semis-crudexam.onrender.com/api/users/${id}`)
    .then(response=>response.json())
    .then(data=>{
        document.querySelector("#name").value=data[0].name;
        document.querySelector("#university").value=data[0].university;
        document.querySelector("#role").value=data[0].role;
        document.querySelector("#department").value=data[0].department;
        document.querySelector("#ID").value=data[0].id;
    }).catch(error=>{
        console.log(error);
    })
}

update.addEventListener('click',()=>{
    let name=document.querySelector("#name").value;
    let university=document.querySelector("#university").value;
    let role=document.querySelector("#role").value;
    let department=document.querySelector("#department").value;
    let id=document.querySelector("#ID").value;

    let formData={name,university,role,department,id};

    fetch("https://semis-crudexam.onrender.com/api/users",{
        method:'PUT',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("User Updated Successfully");
    location.reload();
})
