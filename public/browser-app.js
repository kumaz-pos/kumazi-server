const input= document.querySelector('.task-input');
const form= document.querySelector('.task-form');
const submitBtn=document.querySelector('.submit-btn');
const formAlert=document.querySelector('.form-alert');
const loading= document.querySelector('.loading-text');
const tasks= document.querySelector('.tasks');
loading.innerHTML=`Loading...`

const getData=()=>{
  fetch('http://localhost:3000/api/v1/tasks')
  .then(res=>res.json())
  .then((data)=>
  function () {
    loading.innerHTML='';
    data.Tasks.map((task)=>{
     tasks.innerHTML=
      `
     <ul>
     <li>${task.name}</li>
     </ul>
     `
    })
  }
  )
  .catch((error)=>{
    console.log(error);
  })

}
getData()