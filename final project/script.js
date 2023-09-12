const cart = [];

const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      { 
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];


const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
  


menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment= document.querySelector(".payment");
const close = document.querySelector(".close");
const checkoutButton = document.querySelector(".checkout-button")
const finishCheckout = document.querySelector(".payButton")
const finish = document.querySelector(".afterPayment")



checkoutButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

finish.addEventListener("click", () => {
  finish.style.display = "none";
});


// Add to Cart button listener
const addToCartButton = document.querySelector(".productButton");

addToCartButton.addEventListener("click", () => {
  // Check if the product is already in the cart
  const productInCart = cart.find(item => item.product.id === choosenProduct.id);

  if (!productInCart) {
    // Add the chosen product to the cart
    cart.push({
      product: choosenProduct,
      quantity: 1,
    });

      // Change button text and style
    addToCartButton.textContent = "In Cart";
    addToCartButton.classList.add("inCart");
  }else{
    productInCart.quantity++;
  }
  
  updateCartDisplay();

});

function calculateCartTotal() {
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  return cartTotal;
}

function removeFromCart(productId) {
  // Find the index of the item in the cart array based on the product ID
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  
  // If the item is found, remove it from the cart array
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);

    updateCartDisplay();
  }
}


  function updateCartDisplay() {
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");
    cartCountElement.textContent = cartItemCount;
  
    const cartTotal = calculateCartTotal();
    const cartTotalElement = document.querySelector(".cart-total");
    cartTotalElement.textContent = "$" + cartTotal.toFixed(2);
    const cartDropdownElement = document.querySelector(".cart-dropdown");
    const cartListElement = document.querySelector(".cart-list");
    cartListElement.innerHTML = ""; // Clear the existing list
  
     cart.forEach(item => {
      const removeButton = document.createElement("button");
      removeButton.addEventListener("click", () => {
      removeFromCart(item.product.id);
      });
      
        
      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.style.backgroundColor = "#369e62";
      increaseButton.style.borderRadius = "5px"
      increaseButton.addEventListener("click", () => {
        increaseQuantity(item.product.id);
      });
    
      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.style.backgroundColor = "#369e62";
      decreaseButton.style.borderRadius = "5px"
      decreaseButton.addEventListener("click", () => {
        decreaseQuantity(item.product.id);
      });
    
      const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    
       
      cartListElement.appendChild(cartItemElement);
      cartItemElement.appendChild(document.createTextNode(item.product.title + " - $" + item.product.price));
      cartItemElement.appendChild(removeButton);
      cartItemElement.appendChild(decreaseButton);
      cartItemElement.appendChild(document.createTextNode("Cantitate: " + item.quantity));
      cartItemElement.appendChild(increaseButton);
    
      if (cart.length > 0) {
        cartDropdownElement.style.display = "flex";
      } else {
        cartDropdownElement.style.display = "none";
      }

      const clearCartButton = document.querySelector(".clear-cart-button");
      clearCartButton.addEventListener("click", () => {
        clearCart();
      });
    

    });

    function clearCart() {
      cart.length = 0;
      updateCartDisplay();
      // Reset the add to cart button
      addToCartButton.textContent = "CUMPARA ACUM!";
      addToCartButton.classList.remove("inCart");
    }
   
    finishCheckout.addEventListener("click", () =>{
      clearCart();
    });

    // Function to increase the quantity of a product in the cart
    function increaseQuantity(productId) {
      const item = cart.find(item => item.product.id === productId);
      if (item) {
        item.quantity++;
        updateCartDisplay();
      }
    }
    
    // Function to decrease the quantity of a product in the cart
    function decreaseQuantity(productId) {
      const item = cart.find(item => item.product.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          removeFromCart(productId);
        }
        updateCartDisplay();
      }
    }
  }

  const categories = [...new Set(products.map(item => item.title))];

  document.querySelector('.searchInput').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = categories.filter(category => {
        return (
            category.toLowerCase().includes(searchData)
        );
    });
    displayItem(filteredData);
});

const productContainer = document.querySelector(".sliderWrapper"); // Get the product container element

const displayProducts = (productsToShow) => {
    productContainer.innerHTML = productsToShow
        .map(product => {
            const { colors, title, price } = product;
            const colorImages = colors.map(color => `<img src="${color.img}" alt="${color.code}" class="color-image">`).join('');
            return `
                <div class='sliderItem'>
                    ${colorImages}
                    <h1 class='sliderTitle'>${title}</h1>
                    <h2 class='sliderPrice'>$ ${price}.00</h2>
                    </div>`;
        })
        .join('');
};

document.querySelector('.searchInput').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchData));
    displayProducts(filteredProducts);
});

// Initial display of all products
displayProducts(products);


const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('password');
const creditCard = document.getElementById('password2');
const cardMonth = document.querySelector(".card1");
const cardYear = document.querySelector(".card2");
const cardCvv = document.querySelector(".card3");


const areAllInputsValid = () => {
  const inputs = document.querySelectorAll('.input-control input') ;
  let allValid = true;

  inputs.forEach(input => {
      const inputControl = input.parentElement;
      if (!inputControl.classList.contains('success')) {
          allValid = false;
      }
  });

  return allValid;
};


form.addEventListener("submit", e => {
    e.preventDefault();

    validateInputs();

    if(areAllInputsValid()){
      payment.style.display = "none";
      finish.style.display = "flex";
    }});
    

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};




const validateInputs = () => {
  console.log('validateInputs')
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const creditCardValue = creditCard.value.trim();
    const cardMonthValue = cardMonth.value.trim();
    const cardYearValue = cardYear.value.trim();
    const cardCvvValue = cardCvv.value.trim();


    if(usernameValue === '') {
        setError(username, 'Numele este necesar!');
    } else {
        setSuccess(username);console.log('name is empty')
    }

    if(emailValue === '') {
        setError(email, 'Adresa este necesara!');
    } 
     else {
        setSuccess(email);
    }

    if(phoneNumberValue === '') {
        setError(phoneNumber, 'Numarul de telefon este necesar!');
    } else if (phoneNumberValue.length !== 10 ) {
        setError(phoneNumber, 'Numarul de telefon trebuie sa contita 10 numere!')
    } else {
        setSuccess(phoneNumber);
    }
    
    if(creditCardValue === ''){
      setError(creditCard, 'Inroduceti cardul!');
    
    } else if (creditCardValue.length !== 16) {
        setError(creditCard, "Card de credit incorect!");
    } else {
        setSuccess(creditCard);
    }


    if(cardYearValue ===''){
      setError(cardYear, 'Inroduceti anul!');

    } else if (cardYearValue.length !== 4) {
        setError(cardYear, "An incorect!");
    } else {
       setSuccess(cardYear);
    }

    

    if(cardMonthValue === ''){
      setError(cardMonth, 'Inroduceti luna!');
    
    } else if (cardMonthValue.length !== 2) {
        setError(cardMonth, "Luna incorecta!");
    } else {
        setSuccess(cardMonth);
    }

    if(cardCvvValue === ''){
      setError(cardCvv, 'Inroduceti cardul!');
    
    } else if (cardCvvValue.length !== 3) {
        setError(cardCvv, "Card de credit incorect!");
    } else {
        setSuccess(cardCvv);
    }

};





