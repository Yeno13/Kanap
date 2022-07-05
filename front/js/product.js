// récupération de lien
let str = window.location.href;

// création nouvelle url et récupération de l'id du produit
let url = new URL (str);
let id = url.searchParams.get("id");

// Récupération du produit dans l'API
fetch("http://localhost:3000/api/products/" + id)
    .then(res => {
        return res.json();
    })

    .then(result => {
        const products = result;
        console.log(result);

        //Modification du titre de la page en fonction de l'id du produit 
        document.querySelector('title').textContent = `${products.name}`;

        //Implémentation de l'image
        let productImage = document.createElement("img");
        document.querySelector(".item__img").append(productImage);
        productImage.src = products.imageUrl;
        productImage.alt = products.altTxt;

        //Implémentation du titre
        let productName = document.getElementById("title");
        productName.innerHTML = products.name;

        //Implémentation du prix
        let productPrice = document.getElementById("price");
        productPrice.innerHTML = products.price;

        //Implémentation de la description
        let productDescription = document.getElementById("description");
        productDescription.innerHTML = products.description;

        //Implémentation des couleurs
        for (let color of products.colors) {
            let productcolor = document.createElement("option");
            document.querySelector('#colors').append(productcolor);
            productcolor.value = color;
            productcolor.innerHTML = color;

        }


        let colorPicked = document.querySelector('#colors');
        let quantityPicked = document.querySelector('#quantity');
        const btnAddToCart = document.querySelector('#addToCart');
        let getStorage = JSON.parse(localStorage.getItem("products"));            


        //Ecoute de clicks sur le bouton
        btnAddToCart.addEventListener("click", event => {
            if (quantityPicked.value > 0 && quantityPicked.value <= 100 && colorPicked.value != 0) {
                // Si les paramètres ont été rentrés correctement -> 
                let newArticle = {
                    id : id,
                    quantity : quantityPicked.value,
                    color : colorPicked.value
                }

                let articleInCart = [];

                if (getStorage == null) {
                    articleInCart.push(newArticle);
                    localStorage.setItem("products", JSON.stringify(articleInCart));
                } else if (getStorage !== null && getStorage.find(article => article.id === id && article.color === colorPicked.value) != undefined) {
                    let foundProduct = getStorage.find(article => article.id === id && article.color === colorPicked.value);
                    articleInCart = getStorage;
                    let addQuantity = parseInt(newArticle.quantity) + parseInt(foundProduct.quantity);
                    foundProduct.quantity = addQuantity;
                    localStorage.setItem("products", JSON.stringify(articleInCart));
                } else if (getStorage != null) {
                    articleInCart = getStorage;
                    articleInCart.push(newArticle);
                    localStorage.setItem("products", JSON.stringify(articleInCart));
                } alert(`Vous avez bien ajouté ${quantityPicked.value} ${products.name} ${colorPicked.value} à votre panier.`);
            } else 
                alert ("Veuillez sélectionner une couleur et une quantité entre 0 et 100, merci.")
        });
    })




