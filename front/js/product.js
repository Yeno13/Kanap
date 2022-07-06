// récupération de lien
let str = window.location.href;

// création nouvelle url et récupération de l'id du produit
let url = new URL (str);
let id = url.searchParams.get("id");
let product = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération du produit dans l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
        return res.json();
    })

    .then(async function (dataAPI) {
        product = await dataAPI;
        console.table(product);
        if (product){
            getPost(product);
        }
    })
    .catch((error) => {
        error = "Désolé, nous n'avons pas pu charger la page, veuillez réessayer."
        console.log(error);
        alert(error);
    })
}
//Affichage des éléments du produit
function getPost(product) {

    document.querySelector('title').textContent = `${product.name}`;

    let productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = product.name;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = product.price;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = product.description;

    for(let colors of product.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(product);
}

//Ajout du produit au panier
function addToCart(product) {
    const btnAddToCart = document.querySelector("#addToCart");
    
    btnAddToCart.addEventListener("click", (event) => { //Ecoute du click sur le bouton ajouter au panier
        event.preventDefault

        if (quantityPicked.value > 0 && quantityPicked.value <= 100 && colorPicked.value != 0) {
         let newColor = colorPicked.value;
         let newQuantity = quantityPicked.value;
         let productInfo = {
            idStored: id,
            colorsStored: newColor,
            quantityStored: Number(newQuantity),
            nameStored: product.name,
            priceStored: product.price,
            descriptionStored: product.description,
            imageStored: product.imageUrl,
            altTxtStored: product.altTxt
         };
        
        let productLocalStorage = JSON.parse(localStorage.getItem("item"));

        const popup = () => { //Affichage d'une alerte pour demander à l'utilisateur si il veut voir son panier 
            if(window.confirm(`Vous avez ajouté ${newQuantity} ${product.name} ${newColor} à votre panier, voulez vous le consulter?`)) {
              window.location.href = "cart.html";  
            }
        }
        //import dans le local storage
        if(productLocalStorage) { //Si il y a déjà un élément présent dans le local storage
            const findResult = productLocalStorage.find((element) => element.idStored === id && element.colorsStored === newColor); //Comparaison du produit existant avec le produit ajouté
                if(findResult) {
                    let finalQuantity = parseInt(productInfo.quantityStored) + parseInt(findResult.quantityStored); //Ajout de la quantité du produit
                    findResult.quantityStored = finalQuantity;
                    localStorage.setItem("item", JSON.stringify(productLocalStorage));
                    console.table(productLocalStorage);
                    popup();
                }else { //Si c'est un nouveau produit on l'ajoute grace au push 
                    productLocalStorage.push(productInfo);
                    localStorage.setItem("item", JSON.stringify(productLocalStorage));
                    console.table(productLocalStorage);
                    popup();
                }
        }else { //Si le panier est vide
            productLocalStorage = [];
            productLocalStorage.push(productInfo);
            localStorage.setItem("item", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popup();
        }}else { //Si aucune des conditions sont remplies, alors on retourne une erreur 
            alert("Veuillez choisir une couleur et une quantité entre 1 et 100 pour ce produit, merci de votre compréhension.");
            console.log("Quantité et/ou couleurs manquantes")
        }
    });
}
