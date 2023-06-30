import cart from "./cart.js";
import products from "./product.js";

const productsList = document.getElementById("productsList");
const clearBtn = document.getElementById("clearBtn");

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

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = parseInt(button.dataset.productId);
    cart.addCart(productId);
    cart.totalCart();
    cart.displayCart();
  });
});

clearBtn.addEventListener("click", () => {
  cart.clearCart();
});

cart.displayCart(); // initial display render
