// contact de l'API pour récupérer les produits //
fetch("http://localhost:3000/api/products")
    .then ((res) => res.json())
    .then ((dataAPI) => {
      const products = dataAPI;
      console.table(products);

      // Boucle article par index
      for (let product in dataAPI) {
        
        // création de liens pour chaque articles
        let productLink = document.createElement("a");
        document.querySelector("#items").append(productLink);
        productLink.href = 'product.html?id=' + dataAPI[product]._id;

        // création des articles
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        //création des images
        let productImage = document.createElement("img");
        productArticle.appendChild(productImage);
        productImage.src = dataAPI[product].imageUrl;
        productImage.alt = dataAPI[product].altTxt;

        //création des noms
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList = "productName";
        productName.innerHTML = dataAPI[product].name;

        //création des descriptions
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList = "productDescription";
        productDescription.innerHTML = dataAPI[product].description;
      }
    })

.catch((error) => {
  error = "Désolé mais la page n'est pas disponible."
  console.log(error);
  alert(error);
});

