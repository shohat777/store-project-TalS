// models
var Product = /** @class */ (function () {
    function Product(name, price, imgUrl, amountAvailable, amountInCart) {
        this.name = name;
        this.id = "id-" + crypto.randomUUID();
        this.price = price;
        this.imgUrl = imgUrl;
        this.amountAvailable = amountAvailable;
        this.amountInCart = amountInCart;
    }
    return Product;
}());
var products = [];
// products:
var courtois = new Product("Courtois", 190, "./images/Courtois1.webp", 10, 0);
var carvajal = new Product("Carvajal", 190, "./images/2Carvajal.webp", 10, 0);
var militao = new Product("Militao", 190, "./images/3Militao.webp", 10, 0);
var alaba = new Product("Alaba", 190, "./images/4Alaba.webp", 10, 0);
var bellingham = new Product("Bellingham", 190, "./images/5Bellingham.webp", 10, 0);
var camavinga = new Product("Camavinga", 190, "./images/6Camavinga.webp", 10, 0);
var vini = new Product("Vinicius", 190, "./images/7ViniJr..webp", 10, 0);
var valverde = new Product("Valverde", 190, "./images/8Valverde.webp", 10, 0);
var mbappe = new Product("Mbappe", 190, "./images/9Mbappe.webp", 10, 0);
var modric = new Product("Modric", 190, "./images/10Modric.webp", 10, 0);
var rodrygo = new Product("Rodrygo", 190, "./images/11Rodrygo.webp", 10, 0);
var tchouameni = new Product("Tchouameni", 190, "./images/14Tchouameni.webp", 10, 0);
var guler = new Product("Arda Guler", 190, "./images/15Arda.webp", 10, 0);
var endrick = new Product("Endrick", 190, "./images/16Endrick.webp", 10, 0);
var lucas = new Product("Lucas Vázquez", 190, "./images/17Lucas.webp", 10, 0);
var vallejo = new Product("Vallejo", 190, "./images/18Vallejo.webp", 10, 0);
var franGarcia = new Product("Fran Garcia", 190, "./images/20Fran.webp", 10, 0);
var brahim = new Product("Brahim", 190, "./images/21Brahim.webp", 10, 0);
var rudiger = new Product("Antonio Rudiger", 190, "./images/22Rudiger.webp", 10, 0);
var mendy = new Product("Mendy", 190, "./images/23Mendy.webp", 10, 0);
products.push(courtois, carvajal, militao, alaba, bellingham, camavinga, vini, valverde, mbappe, modric, rodrygo, tchouameni, guler, endrick, lucas, vallejo, franGarcia, brahim, rudiger, mendy);
var userCart = [];
// view
function renderHome(products) {
    try {
        document.getElementById("productContainer").style.display =
            "block";
        document.getElementById("userCart").style.display = "none";
        var html_1 = "<div>";
        html_1 += "<h2> Catalogue</h2>";
        products.forEach(function (product) {
            product.amountInCart > 0 ? "visible" : "hidden";
            html_1 += "<div id= " + product.id + " class=\"productCard\">\n      <img src=\"" + product.imgUrl + "\" alt=\"" + product.name + "\"><br>\n      " + product.name + "'s Home Authentic Shirt 24/25 \n      <hr>\n      $" + product.price + "\n      <button onclick=\"handleAddToCart('" + product.id + "')\">Add To Cart</button>\n      In Cart: " + product.amountInCart + "\n      </div>";
        });
        html_1 += "</div>";
        var productCards = document.querySelector("#productContainer");
        if (!productCards)
            throw new Error("Products not found");
        productCards.innerHTML = html_1;
    }
    catch (error) {
        console.error(error);
    }
}
renderHome(products);
function renderMyCart(userCart) {
    try {
        document.getElementById("productContainer").style.display =
            "none";
        document.getElementById("userCart").style.display =
            "block";
        var cartHtml_1 = "<div><h2> My Cart</h2>";
        var totalCartPrice_1 = 0;
        if (userCart.length === 0) {
            cartHtml_1 += "<p> Your cart is empty </p>";
        }
        else {
            userCart.forEach(function (product) {
                var totalPrice = product.price * product.amountInCart;
                totalCartPrice_1 += totalPrice;
                cartHtml_1 += "<div id=" + product.id + " class=\"cartItem\">\n        <img src=\"" + product.imgUrl + "\" alt= \"" + product.name + "\"> <br>\n        " + product.name + "'s Home Authentic Shirt 24/25 <br>\n        <button onclick=\"handleAddInCart('" + product.id + "')\">+</button>" + product.amountInCart + "\n          <button onclick=\"handleReduceFromCart('" + product.id + "')\">-</button>  $" + totalPrice.toFixed(2) + "\n        <hr>\n        </div>";
            });
        }
        cartHtml_1 += "<div class=\"buyNow\">\n          <h3>Total Price: $" + totalCartPrice_1.toFixed(2) + "</h3>\n          <button onclick=\"handleBuyNow()\">Buy Now</button>\n          </div>\n        </div>";
        var userCartElement = document.getElementById("userCart");
        if (!userCartElement)
            throw new Error("Cart container not found");
        userCartElement.innerHTML = cartHtml_1;
    }
    catch (error) {
        console.error(error);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    renderHome(products);
    document.getElementById("userCart").style.display = "none";
});
// controllers
function handleAddToCart(productId) {
    try {
        var product = products.find(function (p) { return p.id === productId; });
        if (!product)
            throw new Error("Product not found");
        if (product.amountAvailable > 0) {
            var productInCart = userCart.find(function (p) { return p.id === productId; });
            if (productInCart) {
                productInCart.amountInCart++;
            }
            else {
                product.amountInCart = 1;
                userCart.push(product);
            }
            product.amountAvailable--;
            updateProductCard(product);
        }
        else {
            alert("Sorry, this item is out of stock.");
        }
    }
    catch (error) {
        console.error(error);
    }
}
function updateProductCard(product) {
    var productCard = document.getElementById("" + product.id);
    if (productCard) {
        productCard.innerHTML = "\n      <img src=\"" + product.imgUrl + "\" alt=\"" + product.name + "\"><br>\n      " + product.name + "'s Home Authentic Shirt 24/25 \n      <hr>\n      $" + product.price + "\n      <button onclick=\"handleAddToCart('" + product.id + "')\">Add To Cart</button>\n      In Cart: " + product.amountInCart + " \n    ";
    }
}
function handleAddInCart(productId) {
    try {
        var productInCart = userCart.find(function (p) { return p.id === productId; });
        if (!productInCart)
            throw new Error("Product not found in cart");
        var product = products.find(function (p) { return p.id === productId; });
        if (!product)
            throw new Error("Product not found");
        if (product.amountAvailable > 0) {
            productInCart.amountInCart++;
            product.amountAvailable--;
            renderMyCart(userCart);
        }
        else {
            alert("Sorry, this item is out of stock.");
        }
    }
    catch (error) {
        console.error(error);
    }
}
function handleReduceFromCart(productId) {
    try {
        var productInCart = userCart.find(function (p) { return p.id === productId; });
        if (!productInCart)
            throw new Error("Product not found in cart");
        var product = products.find(function (p) { return p.id === productId; });
        if (!product)
            throw new Error("Product not found");
        if (productInCart.amountInCart > 0) {
            productInCart.amountInCart--;
            product.amountAvailable++;
            if (productInCart.amountInCart === 0) {
                userCart.splice(userCart.indexOf(productInCart), 1);
            }
            renderMyCart(userCart);
        }
        else {
            console.log("There are no more of this item in your cart.");
        }
    }
    catch (error) {
        console.error(error);
    }
}
function handleBuyNow() {
    alert("Thank you for your purchase!");
}
