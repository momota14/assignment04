import cart from "./cart.js";
import products from "./product.js";

const { productArr } = cart || {};

const productsList = document.getElementById("productsList");
const totalProduct = document.getElementById("totalProduct");
const cartList = document.getElementById("cartList");

document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.getElementById("dropdownBtn");
  const dropdownMenu = dropdownBtn.nextElementSibling;

  dropdownMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  dropdownBtn.addEventListener("click", function () {
    if (!dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.add("show");
    } else {
      dropdownMenu.classList.remove("show");
    }
  });
});

products.map((product) => {
  // console.log(product);
  return (productsList.innerHTML += `
     <div class="col-lg-3 col-md-6 col-sm-6 d-flex">
              <div class="card w-100 my-2 shadow-2-strong">
                <img
                  src=${product?.image}
                  class="card-img-top"
                  style="aspect-ratio: 1 / 1"
                />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title h6">
                   ${product?.name}
                  </h5>
                  <p class="card-text"> $${product?.price}</p>
                  <div
                    class="card-footer d-flex align-items-center pt-0 px-0 pb-0 mt-auto bg-white border-0"
                  >
                    <div class="add-to-cart btn btn-primary shadow-0 me-1" data-product-id="${product?.id}"
                      >Add to cart</
                    >
                  </div>
                </div>
              </div>
            </div>
    `);
});

function totalCart() {
  let totalQuantity = 0;
  let grandTotalProduct = 0;
  if (productArr.length > 0) {
    for (var i = 0; i < productArr.length; i++) {
      totalQuantity += productArr[i].quantity;
      grandTotalProduct += productArr[i].total;
    }
  }
  cart.grandTotal = grandTotalProduct;
  console.log(cart.grandTotal);
  totalProduct.innerHTML = `(${totalQuantity})`;
  cart.grandTotalFUnc();
}

function displayCart() {
  if (productArr.length > 0) {
    cartList.innerHTML = "";
    productArr.map((product) => {
      return (cartList.innerHTML += `
          <li>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="item-left d-flex align-items-center">
                        <img class="w-25" src=${product?.image} alt="" />
                        <div class="item-info">
                            <div class="line-clamp">${product?.name}</div>
                            <div class="productDetails">${product?.quantity} x <span class="text-danger ">$${product?.price}</span></div>
                        </div>
                    </div>
                    <div class="item-right">
                        <button class="remove-item btn btn-danger  fa-solid fa-trash-can" data-item-id="${product?.id}">
                          
                        </button>
                    </div>
                </div>
              </li>
    `);
    });
  } else {
    cartList.innerHTML =
      "<div class='text-center text-secondary'>No products in the cart</div>";
  }

  const removeItemButtons = document.querySelectorAll(".remove-item");
  removeItemButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = parseInt(button.dataset.itemId);
      console.log("itemId: " + itemId);
      cart.removeCart(itemId);

      totalCart();
      displayCart();
    });
  });
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");
console.log(addToCartButtons);
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = parseInt(button.dataset.productId);
    const selectProduct = products.find((product) => product.id === productId);
    const existingProduct = productArr?.find(
      (product) => product?.id === productId
    );
    let quantity;
    if (existingProduct && selectProduct) {
      quantity = existingProduct?.quantity + 1;
    } else {
      quantity = 1;
    }

    if (selectProduct) {
      cart.addCart(selectProduct, quantity, existingProduct);
    }

    totalCart();
    displayCart();
  });
});

displayCart(); // initial display render
