const weatherAPIKey = "f76693de5c51ceb886c717bf7cb2d979";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={APIkey}&units=metric`;

const galleryImages = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
];

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ];

// Menu Section

function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    
    document.querySelector("#close-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

// Temperature Conversion

function celsiusToFahr(temperature){
    let fahr = (temperature * 9/5) + 32;
    return fahr;
}

// Greeting Section

function greetingHandler() {
    let currentHour = new Date().getHours();
    let greetingText;
    
    if (currentHour < 12) {
        greetingText = "Good morning!";
    } else if (currentHour < 19) {
        greetingText = "Good afternoon!";
    } else if (currentHour < 24) {
        greetingText = "Good evening!";
    } else {
        greetingText = "Welcome!";
    }
    
    document.querySelector("#greeting").innerHTML = greetingText;


}


function weatherHandler() {
    navigator.geolocation.getCurrentPosition(
        position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            let url = weatherAPIURL
                .replace("{lat}", latitude)
                .replace("{lon}", longitude)
                .replace("{APIkey}", weatherAPIKey);

            console.log("🔗 Weather URL:", url);

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Weather API response not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("✅ Weather data:", data);
                    const condition = data.weather[0].description;
                    const location = data.name;
                    const temperature = data.main.temp;

                    let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`;
                    let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;

                    document.querySelector("p#weather").innerHTML = celsiusText;

                    document.querySelector(".weather-group").addEventListener("click", function (e) {
                        if (e.target.id === "celsius") {
                            document.querySelector("p#weather").innerHTML = celsiusText;
                        } else if (e.target.id === "fahr") {
                            document.querySelector("p#weather").innerHTML = fahrText;
                        }
                    });
                })
                .catch(error => {
                    console.error("❌ Fetch error:", error);
                    document.querySelector("p#weather").innerHTML = "Failed to load weather info.";
                });
        },
        error => {
            console.error("📛 Geolocation error:", error);
            document.querySelector("p#weather").innerHTML = "Geolocation denied or unavailable.";
        }
    );
}

function clockHandler() {
    setInterval(function(){
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
    },1000);
}



function galleryHandler() {
    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");
    
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;
    
    galleryImages.forEach(function(image, index){
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;
    
        thumb.addEventListener("click", function(e){
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;
            thumbnails.querySelectorAll("img").forEach(function(img){
                img.dataset.selected = false;
            });
            e.target.dataset.selected = true;
    
        });
    
        thumbnails.appendChild(thumb);
    });
}


function populateProducts(productList) {
        
        let productsSection = document.querySelector(".products-area");
        productsSection.textContent = "";
        
        productList.forEach(function(product, index){
        
            let productElm = document.createElement("div");
            productElm.classList.add("product-item");
   
            let productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = "Image for " + product.title;

            let productDetails = document.createElement("div");
            productDetails.classList.add("product-details");
    
            let productTitle = document.createElement("h3");
            productTitle.classList.add("product-title");
            productTitle.textContent = product.title;
            let productAuthor = document.createElement("p");
            productAuthor.classList.add("product-author");
            productAuthor.textContent = product.author;
            let priceTitle = document.createElement("p");
            priceTitle.classList.add("price-title");
            priceTitle.textContent = "Price";
            let productPrice = document.createElement("p");
            productPrice.classList.add("product-price");
            productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";
    
            productDetails.append(productTitle);
            productDetails.append(productAuthor);
            productDetails.append(priceTitle);
            productDetails.append(productPrice);
    
            productElm.append(productImage);
            productElm.append(productDetails);
    
            productsSection.append(productElm);
    
        });
}

function productsHandler(){
    
    let freeProducts = products.filter( item => !item.price || item.price <= 0);

    let paidProducts = products.filter( item => item.price > 0 );

    populateProducts(products);

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    let productsFilter = document.querySelector(".products-filter");
    
    productsFilter.addEventListener("click", function(e){
        if (e.target.id === "all") {
            populateProducts(products);
        } else if (e.target.id === "paid") {
            populateProducts(paidProducts);
        } else if (e.target.id === "free") {
            populateProducts(freeProducts);
        }
    });
}

function footerHandler(){
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `Ⓒ ${currentYear} - All rights reserved`;
}




// Page Load

menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();