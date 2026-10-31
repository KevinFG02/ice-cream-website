//alert("Hello, ice cream!") ; 

document.getElementById("order-form").onsubmit = () => {
    let isValid = true;

    clearErrors();

    // Name
    let name = document.getElementById("name").value.trim();
    if (name === ""){
        document.getElementById("err-name").style.display = "inline-block";
        isValid = false;
    }

    //Email
    let email = document.getElementById("email").value.trim();

    if(email === "" || !email.includes('@') || !email.includes('.')){
        document.getElementById("err-email").style.display = "inline-block";
        isValid = false;
    }

    // Flavors
    let chosenflavor = document.getElementsByName("flavor").value;
    
    if(chosenflavor === "none"){
        document.getElementById("err-flavor").style.display = "inline-block";
        isValid = false;
    }
    // Cone
/*

    if (!methodSelected) {
        document.getElementById("err-flavor").style.display = "block";
        isValid = false;
    } else {
        clearErrors();
    }*/
    
    // Cones
    /*
    let waffle = document.getElementById("waffle").value;
    let cup = document.getElementById("cup").value;
    let sugar = document.getElementById("sugar").value;
   
    if (!document.getElementById('waffle').checked || !document.getElementById('cup').checked || !document.getElementById('sugar').checked) {
        document.getElementById("err-cone").style.display = "block";
        isValid = false;

    }*/

    return isValid;
}

function clearErrors(){
        let errors = document.getElementsByClassName("err");
        for(let i=0; i < errors.length; i++){
            errors[i].style.display = "none";
        }
    }