let productsInLocalStorage = JSON.parse(localStorage.getItem("item"));
const showCart = document.querySelector("#cart__items");
console.table(productsInLocalStorage);


getCart();

getTotal();

let goodQuantity = true;

changeQuant();

deleteProduct();

let firstNameCheck = false;
let lastNameCheck = false;
let addressCheck = false;
let cityCheck = false;
let emailCheck = false;

getForm();

postForm();


function getCart() { //Récupération des éléments du panier dans le localStorage puis création des éléments HTML
    if(productsInLocalStorage === null || productsInLocalStorage.length == 0) { //Si le panier est vide
        const emptyCart = '<p> Vous n\'avez rien dans votre panier. </p>';
        showCart.innerHTML = emptyCart;
        const orderBtn = document.getElementById("order");
        orderBtn.addEventListener("click", (event)=> {
            event.preventDefault();
            alert("Vous n\'avez rien dans votre panier.");
        });
    }else { //Si il y a des produits dans le panier
        for(let product in productsInLocalStorage) {

            let productArticle = document.createElement("article"); 
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", productsInLocalStorage[product].idStored);
            productArticle.setAttribute("data-color", productsInLocalStorage[product].colorsStored);

            let productImageDiv = document.createElement("div");
            productArticle.appendChild(productImageDiv);
            productImageDiv.className = "cart__item__img";

            let productImage = document.createElement("img");
            productImageDiv.appendChild(productImage);
            productImage.src = productsInLocalStorage[product].imageStored;
            productImage.alt = productsInLocalStorage[product].altTxtStored;

            let productCartItemContent = document.createElement("div");
            productArticle.appendChild(productCartItemContent);
            productCartItemContent.className = "cart__item__content";

            let productCartItemContentDescription = document.createElement("div");
            productCartItemContent.appendChild(productCartItemContentDescription);
            productCartItemContentDescription.className = "cart__item__content__description";

            let productName = document.createElement("h2");
            productCartItemContentDescription.appendChild(productName);
            productName.innerHTML = productsInLocalStorage[product].nameStored;

            let productColors = document.createElement("p");
            productCartItemContentDescription.appendChild(productColors);
            productColors.innerHTML = productsInLocalStorage[product].colorsStored;

            let productPrice = document.createElement("p");
            productCartItemContentDescription.appendChild(productPrice);
            productPrice.innerHTML = productsInLocalStorage[product].priceStored;

            let productCartItemContentSettings = document.createElement("div");
            productCartItemContent.appendChild(productCartItemContentSettings);
            productCartItemContentSettings.className = "cart__item__content__settings";

            let productCartItemContentSettingsQuantity = document.createElement("div");
            productCartItemContentSettings.appendChild(productCartItemContentSettingsQuantity);
            productCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            let productCartQuantityParagraph = document.createElement("p");
            productCartItemContentSettingsQuantity.appendChild(productCartQuantityParagraph);
            productCartQuantityParagraph.innerHTML = "Qté : ";

            let productQuantity = document.createElement("input");
            productCartItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = productsInLocalStorage[product].quantityStored;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            let productCartItemContentSettingsDelete = document.createElement("div");
            productCartItemContentSettings.appendChild(productCartItemContentSettingsDelete);
            productCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            let productDeleteItem = document.createElement("p");
            productCartItemContentSettingsDelete.appendChild(productDeleteItem);
            productDeleteItem.className = "deleteItem";
            productDeleteItem.innerHTML = "Supprimer";
        }
    }
}




function getTotal() { //Calcul des totaux 

    let itemQuantity = document.getElementsByClassName('itemQuantity'); //Récupération de la quantité
    let arrayLength = itemQuantity.length; //Nombres de colonnes dans l'array 
    let totalQuantity = 0; //Quantité de base

    for(let i = 0; i < arrayLength; ++i) { //Boucle parcourant l'array tant que i < au nb de colonne dans l'array 
        totalQuantity += itemQuantity[i].valueAsNumber; //Addition de chaque valeurs 
    }

    let productTotalQuantity = document.getElementById('totalQuantity'); //Affichage de la quantité totale 
    productTotalQuantity.innerHTML = totalQuantity;
    console.log(totalQuantity);


    //Récupération du prix
    let totalPrice = 0;  //Valeur de base du prix 

    for(let i = 0; i < arrayLength; ++i) { //Boucle parcourant l'array tant que i < au nb de colonne dans l'array 
        totalPrice += itemQuantity[i].valueAsNumber * productsInLocalStorage[i].priceStored; //Prix total; Quantités multipliées par le prix de chaque produit
    }

    let productTotalPrice = document.getElementById('totalPrice'); //Affichage prix total 
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}




function changeQuant() { //Modification quantité
    let quantityModified = document.querySelectorAll(".itemQuantity");

    for(let i = 0; i < quantityModified.length; i++) {
        quantityModified[i].addEventListener("change", (event) => { //Ecoute si changement de quantité 
            event.preventDefault();

            let quantAfterMods = productsInLocalStorage[i].quantityStored;
            console.log(quantAfterMods);
            let quantAfterModsValue = quantityModified[i].valueAsNumber;
            console.log(quantAfterModsValue);

            const resultSearch = productsInLocalStorage.find((element) => element.quantAfterMods !== quantAfterMods);
            console.log(resultSearch);

            resultSearch.quantityStored = quantAfterModsValue;
            productsInLocalStorage[i].quantityStored = resultSearch.quantityStored;
            console.log(resultSearch);
            if (quantAfterModsValue < 1 || quantAfterModsValue > 100) { //Si la quantité choisie n'est pas bonne
                alert("Veuillez choisir une quantité entre 1 et 100, merci.");
                goodQuantity = false;
            }else {
                localStorage.setItem("item", JSON.stringify(productsInLocalStorage));
                goodQuantity = true;
            }

            location.reload(); //refresh de la page après chaque modification
        })
    }
}


function deleteProduct() { //Suppression d'un produit
    let deleteBtn = document.querySelectorAll(".deleteItem");

    for(let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (event) => {
            event.preventDefault();

            //Sélection de l'élément à supprimer
            let idDelete = productsInLocalStorage[i].idStored;
            let colorDelete = productsInLocalStorage[i].colorsStored;

            productsInLocalStorage = productsInLocalStorage.filter( element => element.idStored !== idDelete || element.colorsStored !== colorDelete);

            localStorage.setItem("item", JSON.stringify(productsInLocalStorage));

            alert("Ce produit a été supprimé du panier."); //Confirmation de suppression et refresh de la page
            location.reload();
        })
    }
}




function getForm() { //Gestion du formulaire 

    let form = document.querySelector(".cart__order__form"); //Sélection formulaire

    let errorMsg = "Veuillez remplir ce champ avec des valeurs correctes."; //Message d'erreur si les champs ne sont pas conformes au valeurs regex

    let emailRegEx = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
    let addressRegEx = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
    let charRegEx = /^[a-zA-Z ,.'-]+$/;

    //Ecoute de chaque input du formulaire
    form.firstName.addEventListener("change", function() {
        validFirstName(this);
    });
    form.lastName.addEventListener("change", function() {
        validLastName(this);
    });
    form.address.addEventListener("change", function() {
        validAddress(this);
    });
    form.city.addEventListener("change", function() {
        validCity(this);
    });
    form.email.addEventListener("change", function() {
        validEmail(this);
    });

    const validFirstName = function(inputFirstName) { //Validation prénom
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        if (charRegEx.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = " ";
            firstNameCheck = true;
        }else {
            firstNameErrorMsg.innerHTML = errorMsg;
        }
    };

    const validLastName = function(inputLastName) { //Validation nom
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        if (charRegEx.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = " ";
            lastNameCheck = true;
        }else {
            lastNameErrorMsg.innerHTML = errorMsg;
        }
    };

    const validAddress = function(inputAddress) { //Validation adresse 
        let addressErrorMsg = inputAddress.nextElementSibling;
        if (addressRegEx.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = " ";
            addressCheck = true;
        }else {
            addressErrorMsg.innerHTML = errorMsg;
        }
    };

    const validCity = function(inputCity) { //Validation ville
        let cityErrorMsg = inputCity.nextElementSibling;
        if (charRegEx.test(inputCity.value)) {
            cityErrorMsg.innerHTML = " ";
            cityCheck = true;
        }else {
            cityErrorMsg.innerHTML = errorMsg;
        }
    };

    const validEmail = function(inputEmail) { //Validation mail
        let emailErrorMsg = inputEmail.nextElementSibling;
        if (emailRegEx.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = " ";
            emailCheck = true;
        }else {
            emailErrorMsg.innerHTML = errorMsg;
        }
    };
}


function postForm() { //Envoi des infos dans le localStorage
    const commandBtn = document.getElementById("order");

    commandBtn.addEventListener("click", (event)=> {
        event.preventDefault();

        //Récupération des coordonnées du formulaire
        let inputFirstName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputAddress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputEmail = document.getElementById("email");


        //Construction d'un array dans le localStorage
        if (firstNameCheck == true && lastNameCheck == true && addressCheck == true && cityCheck == true && emailCheck == true && goodQuantity == true ) { //Vérification que tous les champs sont remplis et valides
            let idProducts = [];
            for (let i = 0; i < productsInLocalStorage.length; i++) {
                idProducts.push(productsInLocalStorage[i].idStored);
            }
            const order = {
                contact : {
                    firstName: inputFirstName.value,
                    lastName: inputLastName.value,
                    address: inputAddress.value,
                    city: inputCity.value,
                    email: inputEmail.value,
                },
                products: idProducts,
            }
            console.log(order);

            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            };
            console.log(options);

            fetch("http://localhost:3000/api/products/order", options)
            .then((res)=> {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                localStorage.clear(); //Clear du localStorage
                const orderId = data.orderId;
                window.location.href = "./confirmation.html" + "?orderId=" + orderId; //Redirection vers la page confimation et obtention du numéro de commande
                
            })
            .catch((error)=> {
                error = "Oups, le chargement a rencontré une erreur, veuillez recharger la page, merci"
                console.log(error);
                alert(error);
            });
        }else {
            alert("Veuillez vérifier les champs requis ainsi que la quantité appropriée.")
        }
    })
}
