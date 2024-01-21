const data = [               //every array must have an id,img,price and categorie is falls under
    {
      id: 1,
      name: "Nutella",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZ0tDKcPsBE3FWp08S9MuvVVbnbvnJ8aRbw&usqp=CAU",
      price: 8.99,
      cat: "Pantry & Condiments",
    },
    {
      id: 2,
      name: "Ketchup",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Vw1gJdg0dBPF_4w9JMdGv4A8kCO4b3DJ4w&usqp=CAU",
      price: 5.99,
      cat: "Pantry & Condiments",
    },
    {
      id: 3,
      name: "Diapers ",
      img: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd8yimDCXthxAjcxIkzZwN_fblsSMwCJIHag&usqp=CAU",
      price: 35.99,
      cat: "Baby",
    },
    {
      id: 4,
      name: "Body Wash",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5SqLC_5MMGW3tepfj1rJXPiEpT-PnKS3hig&usqp=CAU",
      price: 14.99,
      cat: "Health & Beauty",
    },
    {
      id: 5,
      name: "CeraVe Cleanser ",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZNaf3jPxXMJOQT_mzUHpF9KWC_UgblSZrg&usqp=CAU ",
      price: 23.99,
      cat: "Health & Beauty",
    },
    {
      id: 6,
      name: "Toilet Paper ",
      img: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1lCfgUuRLxuR7bBl34E1MWLPRv0i4oH3csQ&usqp=CAU",
      price: 17.99,
      cat: "Household Supplies",
    },
    {
        id: 7,
        name: "Disinfectant Wipes ",
        img: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUR0vf8SPZA6CU8W8TkOG6k4FHD8A8FE0UdQ&usqp=CAU",
        price: 13.99,
        cat: "Household Supplies",
      },
      {
        id: 8,
        name: "Tuna ",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZERHL4QnFRcluVDOKJKMfq0f003hAXi2QyQ&usqp=CAU",
        price: 14.99,
        cat: "Food",
      },
      {
        id: 9,
        name: "Corn Flakes",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStdt6hkT9nT1OZWbmwTfeJfePz5D_ZiDvsnQ&usqp=CAU",
        price: 7.99,
        cat: "Food",
      },
      {
        id: 10,
        name: "Air Freshener",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB_UVZI6P43w0ez0SHe8466FIYGVcmGymCBg&usqp=CAU",
        price: 4.99,
        cat: "Household Supplies",
      },

  ];

const productsContainer= document.querySelector(".products")
const searchInput= document.querySelector(".search")
const categoriesContainer= document.querySelector(".categories")
const priceRange= document.querySelector(".priceRange")
const priceValue= document.querySelector(".priceValue")

//lets display our products
const displayProducts=(filteredProducts) =>{             //for filtered products based on categories,price range etc
     productsContainer.innerHTML= filteredProducts.map((product)=>
         `
           <div class="product">
            <img src=${product.img} alt=""   />
            <span class="name">${product.name}</span>      
            <span class="priceTag">$${product.price}</span>     
           </div>
         `
        ).join("");                                     //to not display the commas on the web page
};

//lets call the function display products
displayProducts(data);


searchInput.addEventListener("keyup", (e) => {                     //enables keyboard interaction
    const value = e.target.value.toLowerCase();                     //even if user enters uppercase it would still filter to the desired product
  
    if (value) {                                                   //if product name is not found display all available products
      displayProducts(
        data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
      );
    } else {
      displayProducts(data);
    }
  });

  const setCategories = () => {                                 //create categories using our product list
    const allCats = data.map((item) => item.cat);               
    const categories = [
      "All",                                                    //spread operator to see All above other categories
      ...allCats.filter((item, i) => {
        return allCats.indexOf(item) === i;                    //this returns all the categories created in our data array
      }),
    ];
  
    categoriesContainer.innerHTML = categories
      .map(
        (cat) =>
          `
        <span class="cat">${cat}</span>
      `
      )
      .join("");
  
    categoriesContainer.addEventListener("click", (e) => {                  //to enable the user to click on a category and obtain products for that category only
      const selectedCat = e.target.textContent; 
  
      selectedCat === "All"
        ? displayProducts(data)
        : displayProducts(data.filter((item) => item.cat === selectedCat));
    });
  };
  
  const setPrices = () => {                                       //sets the price range using the min and max prices indicated in the array
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
  
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice;
  
    priceRange.addEventListener("input", (e) => {                             //to enable the user to enter the product name in the search bar
      priceValue.textContent = "$" + e.target.value;
      displayProducts(data.filter((item) => item.price <= e.target.value));
    });
  };
  
  setCategories();                  //function call
  setPrices();