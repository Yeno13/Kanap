// récupération de lien
let str = window.location.href;

// création nouvelle url et récupération de l'id du produit
let url = new URL (str);
let productId = url.searchParams.get("id");

// Récupération du produit dans l'API
fetch("http://localhost:3000/api/products/" + productId)
    .then(res => {
        return res.json();
    })
    .then(result => {
        const products = result;
        console.log(result);

        document.querySelector('title').textContent = `${products.name}`;

        let productImage = document.createElement("img");
        document.querySelector(".item__img").append(productImage);
        productImage.src = products.imageUrl;
        productImage.alt = products.altTxt;


        let productName = document.getElementById("title");
        productName.innerHTML = products.name;

        let productPrice = document.getElementById("price");
        productPrice.innerHTML = products.price;
    })
