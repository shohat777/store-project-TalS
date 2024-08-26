// models

class Product {
  name: string;
  id: string;
  price: number;
  imgUrl: string;
  amountAvailable: number;
  amountInCart: number;

  constructor(
    name: string,
    price: number,
    imgUrl: string,
    amountAvailable: number,
    amountInCart: number
  ) {
    this.name = name;
    this.id = `id-${crypto.randomUUID()}`;
    this.price = price;
    this.imgUrl = imgUrl;
    this.amountAvailable = amountAvailable;
    this.amountInCart = amountInCart;
  }
}

const products: Product[] = [];

// products:
const courtois = new Product("Courtois", 190, "./images/Courtois1.webp", 10, 0);
const carvajal = new Product("Carvajal", 190, "./images/2Carvajal.webp", 10, 0);
const militao = new Product("Militao", 190, "./images/3Militao.webp", 10, 0);
const alaba = new Product("Alaba", 190, "./images/4Alaba.webp", 10, 0);
const bellingham = new Product(
  "Bellingham",
  190,
  "./images/5Bellingham.webp",
  10,
  0
);
const camavinga = new Product(
  "Camavinga",
  190,
  "./images/6Camavinga.webp",
  10,
  0
);
const vini = new Product("Vinicius", 190, "./images/7ViniJr..webp", 10, 0);
const valverde = new Product("Valverde", 190, "./images/8Valverde.webp", 10, 0);
const mbappe = new Product("Mbappe", 190, "./images/9Mbappe.webp", 10, 0);
const modric = new Product("Modric", 190, "./images/10Modric.webp", 10, 0);
const rodrygo = new Product("Rodrygo", 190, "./images/11Rodrygo.webp", 10, 0);
const tchouameni = new Product(
  "Tchouameni",
  190,
  "./images/14Tchouameni.webp",
  10,
  0
);
const guler = new Product("Arda Guler", 190, "./images/15Arda.webp", 10, 0);
const endrick = new Product("Endrick", 190, "./images/16Endrick.webp", 10, 0);
const lucas = new Product("Lucas Vázquez", 190, "./images/17Lucas.webp", 10, 0);
const vallejo = new Product("Vallejo", 190, "./images/18Vallejo.webp", 10, 0);
const franGarcia = new Product(
  "Fran Garcia",
  190,
  "./images/20Fran.webp",
  10,
  0
);
const brahim = new Product("Brahim", 190, "./images/21Brahim.webp", 10, 0);
const rudiger = new Product(
  "Antonio Rudiger",
  190,
  "./images/22Rudiger.webp",
  10,
  0
);
const mendy = new Product("Mendy", 190, "./images/23Mendy.webp", 10, 0);

products.push(
  courtois,
  carvajal,
  militao,
  alaba,
  bellingham,
  camavinga,
  vini,
  valverde,
  mbappe,
  modric,
  rodrygo,
  tchouameni,
  guler,
  endrick,
  lucas,
  vallejo,
  franGarcia,
  brahim,
  rudiger,
  mendy
);

const userCart: Product[] = [];

// view

function renderHome(products: Product[]) {
  try {
    (document.getElementById("productContainer") as HTMLElement).style.display =
      "block";
    (document.getElementById("userCart") as HTMLElement).style.display = "none";
    let html = "<div>";
    html += `<h2> Catalogue</h2>`;
    products.forEach((product) => {
      product.amountInCart > 0 ? "visible" : "hidden";
      html += `<div id= ${product.id} class="productCard">
      <img src="${product.imgUrl}" alt="${product.name}"><br>
      ${product.name}'s Home Authentic Shirt 24/25 
      <hr>
      $${product.price}
      <button onclick="handleAddToCart('${product.id}')">Add To Cart</button>
      In Cart: ${product.amountInCart}
      </div>`;
    });
    html += "</div>";

    const productCards = document.querySelector("#productContainer");
    if (!productCards) throw new Error("Products not found");

    productCards.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}
renderHome(products);

function renderMyCart(userCart: Product[]) {
  try {
    (document.getElementById("productContainer") as HTMLElement).style.display =
      "none";
    (document.getElementById("userCart") as HTMLElement).style.display =
      "block";

    let cartHtml = "<div><h2> My Cart</h2>";
    let totalCartPrice = 0;

    if (userCart.length === 0) {
      cartHtml += "<p> Your cart is empty </p>";
    } else {
      userCart.forEach((product) => {
        const totalPrice = product.price * product.amountInCart;
        totalCartPrice += totalPrice;

        cartHtml += `<div id=${product.id} class="cartItem">
        <img src="${product.imgUrl}" alt= "${product.name}"> <br>
        ${product.name}'s Home Authentic Shirt 24/25 <br>
        <button onclick="handleAddInCart('${product.id}')">+</button>${
          product.amountInCart
        }
          <button onclick="handleReduceFromCart('${
            product.id
          }')">-</button>  $${totalPrice.toFixed(2)}
        <hr>
        </div>`;
      });
    }

    cartHtml += `<div class="buyNow">
          <h3>Total Price: $${totalCartPrice.toFixed(2)}</h3>
          <button onclick="handleBuyNow()">Buy Now</button>
          </div>
        </div>`;

    const userCartElement = document.getElementById("userCart");
    if (!userCartElement) throw new Error("Cart container not found");

    userCartElement.innerHTML = cartHtml;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome(products);
  (document.getElementById("userCart") as HTMLElement).style.display = "none";
});

// controllers

function handleAddToCart(productId: string) {
  try {
    const product = products.find((p) => p.id === productId);
    if (!product) throw new Error("Product not found");

    if (product.amountAvailable > 0) {
      const productInCart = userCart.find((p) => p.id === productId);

      if (productInCart) {
        productInCart.amountInCart++;
      } else {
        product.amountInCart = 1;
        userCart.push(product);
      }

      product.amountAvailable--;

      updateProductCard(product);
    } else {
      alert("Sorry, this item is out of stock.");
    }
  } catch (error) {
    console.error(error);
  }
}

function updateProductCard(product: Product) {
  const productCard = document.getElementById(`${product.id}`);
  if (productCard) {
    productCard.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.name}"><br>
      ${product.name}'s Home Authentic Shirt 24/25 
      <hr>
      $${product.price}
      <button onclick="handleAddToCart('${product.id}')">Add To Cart</button>
      In Cart: ${product.amountInCart} 
    `;
  }
}

function handleAddInCart(productId: string) {
  try {
    const productInCart = userCart.find((p) => p.id === productId);
    if (!productInCart) throw new Error("Product not found in cart");

    const product = products.find((p) => p.id === productId);
    if (!product) throw new Error("Product not found");

    if (product.amountAvailable > 0) {
      productInCart.amountInCart++;
      product.amountAvailable--;

      renderMyCart(userCart);
    } else {
      alert("Sorry, this item is out of stock.");
    }
  } catch (error) {
    console.error(error);
  }
}

function handleReduceFromCart(productId: string) {
  try {
    const productInCart = userCart.find((p) => p.id === productId);
    if (!productInCart) throw new Error("Product not found in cart");

    const product = products.find((p) => p.id === productId);
    if (!product) throw new Error("Product not found");

    if (productInCart.amountInCart > 0) {
      productInCart.amountInCart--;
      product.amountAvailable++;

      if (productInCart.amountInCart === 0) {
        userCart.splice(userCart.indexOf(productInCart), 1);
      }
      renderMyCart(userCart);
    } else {
      console.log("There are no more of this item in your cart.");
    }
  } catch (error) {
    console.error(error);
  }
}

function handleBuyNow() {
  alert("Thank you for your purchase!");
}
