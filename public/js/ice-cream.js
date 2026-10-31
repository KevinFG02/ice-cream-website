//alert("Hello, ice cream!") ; 

document.getElementById("order-form").onsubmit = () => {
    let isValid = true;

    clearErrors();

    // Name
    let name = document.getElementById("name").value.trim();
    if (name === ""){
        document.getElementById("err-name").style.display = "block";
        isValid = false;
    }

    // Email
    let email = document.getElementById("email").value.trim();
    if (!email.includes("@") || email === ""){
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    // Flavors
    let methodSelected = false;
    let methodButtons = document.getElementsByName("flavor");
    for (let i=0; i<methodButtons.length; i++) {
        if(methodButtons[i].checked) {
            methodSelected = true;
        }
    }

    if (!methodSelected) {
        document.getElementById("err-flavor").style.display = "block";
        isValid = false;
    } else {
        clearErrors();
    }
    
    // Cones
    let waffle = document.getElementById("waffle").value;
    let cup = document.getElementById("cup").value;
    let sugar = document.getElementById("sugar").value;
   
    if (!document.getElementById('waffle').checked || !document.getElementById('cup').checked || !document.getElementById('sugar').checked) {
        document.getElementById("err-cone").style.display = "block";
        isValid = false;

    }

    function clearErrors(){
        let errors = document.getElementsByClassName("err");
        for(let i=0; i < errors.length; i++){
            errors[i].style.display = "none";
        }
    }

    return isValid;
}