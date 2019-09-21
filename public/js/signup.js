var signUp = async function(elem){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("c_password").value;

    if(!email) return alert("email is required");
    if(!password) return alert("password is required");
    if(password !== confirm_password) return alert("password does not match");

    elem.disabled = true;
    elem.textContent = "Please Wait ...";

    let response = await fetch("/api/authenticate/register",{
      method: 'POST', 
      mode: 'same-origin', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        confirm_password
      })
    });

    let {data, message} = await response.json();

    if(message === "User account created sucessfully"){
      alert("Account Created")
      window.location.href = "/";
    }else{
      elem.disabled = false;
      elem.textContent = "Sign Up";
      alert(message)
    }

  }

  document.addEventListener("DOMContentLoaded", function(){
      document.getElementById("signupbtn").addEventListener("click", function({target}){
        signUp(target);
      })
  })
  