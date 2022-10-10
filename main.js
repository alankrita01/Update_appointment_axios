function saveToLocalStorage(event){

  event.preventDefault();
  const name=event.target.username.value;
  const email=event.target.emailId.value;

  const obj ={
    name : name,
    email : email
  }


  axios.post("https://crudcrud.com/api/0b4b1529b4a94a33b6c2b9fc99bc1a9c/appointmentData",obj)
    .then((response) => {
      //console.log('updated')
      showNewUserOnScreen(response.data)
    })
    .catch((err) => {
         
      document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>";
      console.log(err)
    })

  //localStorage.setItem('userDetails'+email,JSON.stringify(obj));
  //showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {

  axios.get("https://crudcrud.com/api/0b4b1529b4a94a33b6c2b9fc99bc1a9c/appointmentData")
    .then((response) => {
      console.log(response);
      for(var i=0; i<response.data.length; i++){
        showNewUserOnScreen(response.data[i])
      }
    })
    .catch((error) => {
      console.log(error)
    })
})

function showNewUserOnScreen(user){

  //check if email already present or not
  if(localStorage.getItem(user.email)!== null){
    removeUserFromScreen(user.email);
  }

  const parentNode=document.getElementById('listOfUser');
  const childHTML=`<li id=${user._id}> ${user.name} - ${user.email} <button style="border-color: green;" onclick=editUserDetails('${user.email}','${user.name}','${user._id}')>Edit</button> <button style="border-color: red;" onclick=deleteUser('${user._id}')>Delete</button> </li> `;

  parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

//edit user

function editUserDetails(emailId,name,userId){
console.log(emailId,name,userId)
  document.getElementById('email').value=emailId;
  document.getElementById('username').value=name;

  deleteUser(userId);
}

//delete user function

function deleteUser(userId){
  
  //localStorage.removeItem(emailId);
  axios
  .delete(`https://crudcrud.com/api/0b4b1529b4a94a33b6c2b9fc99bc1a9c/appointmentData/${userId}`)
.then(response => removeUserFromScreen(userId))
.catch(error => console.error(error)) ;
 // removeUserFromScreen(emailId);
}


//remove function
function removeUserFromScreen(emailId){
  const parentNode = document.getElementById('listOfUser');
  const childNodeToBeDeleted = document.getElementById(emailId);

  if(childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}