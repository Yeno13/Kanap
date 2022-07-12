let productsInLocalStorage = JSON.parse(localStorage.getItem("item"));
const showCart = document.querySelector("#cart__items");
console.table(productsInLocalStorage);


function getCart() {
    if(productsInLocalStorage === null || productsInLocalStorage == 0) {
        const emptyCart = '<p> Vous n\'avez rien dans votre panier. </p>';
        showCart.innerHTML = emptyCart;
        const orderBtn = document.getElementById("order");
        orderBtn.addEventListener("click", (event)=> {
            event.preventDefault();
            alert("Vous n\'avez rien dans votre panier.");
        });
    }else {
        for(let product in productsInLocalStorage) {

            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", productsInLocalStorage[product].idStored);

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
getCart();

function getTotal() {
    let itemQuantity = document.getElementsByClassName('itemQuantity');
    let arrayLength = itemQuantity.length;
    let totalQuantity = 0;

    for(let i = 0; i < arrayLength; ++i) {
        totalQuantity += itemQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;
    console.log(totalQuantity);

    let totalPrice = 0; 

    for(let i = 0; i < arrayLength; ++i) {
        totalPrice += itemQuantity[i].valueAsNumber * productsInLocalStorage[i].priceStored;
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotal();

let goodQuantity = true;

function changeQuant() {
    let quantityModified = document.querySelectorAll(".itemQuantity");

    for(let i = 0; i < quantityModified.length; i++) {
        quantityModified[i].addEventListener("change", (event) => {
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
            if (quantAfterModsValue < 1 || quantAfterModsValue > 100) {
                alert("Veuillez choisir une quantité entre 1 et 100, merci.");
                goodQuantity = false;
            }else {
                localStorage.setItem("item", JSON.stringify(productsInLocalStorage));
                goodQuantity = true;
            }
        })
    }
}
changeQuant();

function deleteProduct() {
    let deleteBtn = document.querySelectorAll(".deleteItem");

    for(let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (event) => {
            event.preventDefault();

            let idDelete = productsInLocalStorage[i].idStored;
            let colorDelete = productsInLocalStorage[i].colorsStored;

            productsInLocalStorage = productsInLocalStorage.fiter( element => element.idStored !== idDelete || element.colorsStored !== colorDelete);

            localStorage.setItem("item", JSON.stringify(productsInLocalStorage));

            alert("Ce produit a été supprimé du panier.");
            location.reload();
        })
    }
}
deleteProduct();

let firstNameCheck = false;
let lastNameCheck = false;
let addressCheck = false;
let cityCheck = false;
let emailCheck = false;

function getForm() {
    let form = document.querySelector(".cart__order__form");

    let emailRegEx = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
    let addressRegEx = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
    let charRegEx = /^[a-zA-Z ,.'-]+$/;

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

    const validFirstName = function(inputFirstName) {
        let firstNameError = inputFirstName.nextElementSibling;
        if (charRegEx.test(inputFirstName.value)) {
            firstNameError.innerHTML = " ";
            firstNameCheck = true;
        }else {
            firstNameError.innerHTML = "Veuillez remplir ce champ avec des valeurs correctes.";
        }
    };

    const validLastName = function(inputLastName) {
        let lastNameError = inputLastName.nextElementSibling;
        if (charRegEx.test(inputLastName.value)) {
            lastNameError.innerHTML = " ";
            lastNameCheck = true;
        }else {
            lastNameError.innerHTML = "Veuillez remplir ce champ avec des valeurs correctes.";
        }
    };

    const validAddress = function(inputAddress) {
        let addressError = inputAddress.nextElementSibling;
        if (addressRegEx.test(inputAddress.value)) {
            addressError.innerHTML = " ";
            addressCheck = true;
        }else {
            addressError.innerHTML = "Veuillez remplir ce champ avec des valeurs correctes.";
        }
    };

    const validCity = function(inputCity) {
        let cityError = inputCity.nextElementSibling;
        if (charRegEx.test(inputCity.value)) {
            cityError.innerHTML = " ";
            cityCheck = true;
        }else {
            cityError.innerHTML = "Veuillez remplir ce champ avec des valeurs correctes.";
        }
    };

    const validEmail = function(inputEmail) {
        let emailError = inputEmail.nextElementSibling;
        if (emailRegEx.test(inputEmail.value)) {
            emailError.innerHTML = " ";
            emailCheck = true;
        }else {
            emailError.innerHTML = "Veuillez remplir ce champ avec des valeurs correctes.";
        }
    };
}
getForm();

function postForm() {
    const commandBtn = document.getElementById("order");

    commandBtn.addEventListener("click", (event)=> {
        event.preventDefault();

        let inputFirstName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputAddress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputEmail = document.getElementById("email");

        if (firstNameCheck == true && lastNameCheck == true && addressCheck == true && cityCheck == true && emailCheck == true && goodQuantity == true ) {
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
                localStorage.clear();
                const orderId = data.orderId;
                window.location.href = "./confirmation.html" + "?orderId=" + orderId;
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
postForm();