var signIn = async function(elem){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(!email) return alert("email is required");
    if(!password) return alert("password is required");

    elem.disabled = true;
    elem.textContent = "Please Wait ...";

    let response = await fetch("/api/authenticate/login",{
      method: 'POST', 
      mode: 'same-origin', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,password })
    });


    let { message } = await response.json();

    if(message === "login sucesss"){
      elem.textContent = "Success Redirecting ...";
      setTimeout(()=> window.location.href = "/wecolme.html", 500);
    }else{
      elem.disabled = false;
      elem.textContent = "Login";
      alert(message)
    }

  }

  document.addEventListener("DOMContentLoaded", function(){
      document.getElementById("loginbtn").addEventListener("click", function({target}){
        signIn(target);
      })
  })
  