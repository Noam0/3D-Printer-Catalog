let products = `[
    {
        "src": "image0.jpg",
        "description": "Description for image 0",
        "fullDescription": "product for bla bla bla 0  ",
        "category": "kitchen"
    },
    {
        "src": "image1.jpg",
        "description": "Description for image 1",
        "fullDescription": "product for bla bla bla 1 ",
        "category": "home"
    },
    {
        "src": "image2.jpg",
        "description": "Description for image 2",
        "fullDescription": " product for bla bla bla 2",
        "category": "home"
    },
    {
        "src": "image3.jpg",
        "description": "Description for image 3",
        "fullDescription": " product for bla bla bla 3",
        "category": "medical"
    },
    {
        "src": "image4.jpg",
        "description": "Description for image 4",
        "fullDescription": "product for bla bla bla 4",
        "category": "home"
    },
    {
        "src": "image5.jpg",
        "description": "Description for image 5",
        "fullDescription": "product for bla bla bla 5 ",
        "category": "medical"
    },
    {
        "src": "image6.jpg",
        "description": "Description for image 6",
        "fullDescription": "product for bla bla bla 6 ",
        "category": "home"
    },
    {
        "src": "image7.jpg",
        "description": "Description for image 7",
        "fullDescription": "product for bla bla bla 7 ",
        "category": "kitchen"
    },
    {
        "src": "image8.jpg",
        "description": "Description for image 8",
        "fullDescription": "product for bla bla bla 8 ",
        "category": "home"
    },
    {
        "src": "image9.jpg",
        "description": "Description for image 9",
        "fullDescription": "product for bla bla bla 9 ",
        "category": "medical"
    },
    {
        "src": "image10.jpg",
        "description": "Description for image 10",
        "fullDescription": "product for bla bla bla 10 ",
        "category": "home"
    }
]`;

let productsJSON = JSON.parse(products);
let pageNumber = 0;
let categories = ["all", "kitchen", "home", "medical"];
let chosenCategory = "all";
let numberOfPages;
let numberOfProducts = productsJSON.length;
//the div images element:
const imageContainers = document.querySelectorAll('.cataloug .image-container');
//ON PAGE LOAD:
document.addEventListener('DOMContentLoaded', onPageLoad);

function onPageLoad() {
    numberOfPages = Math.floor(numberOfProducts / 9) + 1;
    chosenCategory = "all"
  
    for(let i = 0 ; i < 9 ; i++){
         let image = document.querySelector(`#image${i}`);
         let description = document.querySelector(`p-description${i}`);
         let categoryDescription = document.querySelector(`#category-bellow-image${i}`)
         categoryDescription.textContent =("category: " + productsJSON[i].category);
         image.src = productsJSON[i].src;
    }
  
}

//FUNCTION TO SORT THE ARRAY OF PRODUCTS BY CATEGORY
function sortProducts(productsJSON, chosenCategory) {

    if(chosenCategory === 'all'){
     let sortedProducts = JSON.parse(products);
     return sortedProducts;
    }else{
    // First, filter the products by the chosen category
    const chosenCategoryProducts = productsJSON.filter(product => product.category === chosenCategory);
    
    // Then, filter the products excluding the chosen category
    const otherCategoryProducts = productsJSON.filter(product => product.category !== chosenCategory);
    
    // Concatenate the chosen category products with the other category products
    const sortedProducts = chosenCategoryProducts.concat(otherCategoryProducts);
    
    return sortedProducts;
    }
}

function changePicturesDisplay(productsJSON, pageNumber) {
    for (let i = 0; i < 9 && i < productsJSON.length; i++) {
        let image = document.querySelector(`#image${i}`);
        let description = document.querySelector(`#p-description${i}`);
        let categoryDescription = document.querySelector(`#category-bellow-image${i}`);

        if (image) {
            // Apply a fade out effect by reducing opacity to 0
            image.style.opacity = 0;
            categoryDescription.style.opacity = 0;
            description.style.opacity = 0;

            // Change the image source
            setTimeout(() => {
                if (i + (pageNumber) * 9 >= numberOfProducts) {
                    image.src = 'white.jpg';
                    categoryDescription.innerHTML = '';
                    description.innerHTML = '';
                } else {
                    image.src = productsJSON[i + (pageNumber) * 9].src;
                    categoryDescription.innerHTML = productsJSON[i + (pageNumber) * 9].category;
                }
            }, 800); // Adjust this timeout as needed

            // Apply a fade in effect by increasing opacity to 1 after a delay
            setTimeout(() => {
                image.style.opacity = 1;
                categoryDescription.style.opacity = 1;
                description.style.opacity = 1;
            }, 850); // Should be greater than the previous timeout
        }
    }
}
//ON CLICK FUNCTION ON EACH CATEGORY THAT WAS CLICKED:
const categoryItems = document.querySelectorAll('.category-item');
categoryItems.forEach(item => {
    item.addEventListener('click', function() {
        const category = item.getAttribute('data-category');
        console.log(`You clicked on category: ${category}`);
        productsJSON = sortProducts(productsJSON,category);
        pageNumber = 0;
        changePicturesDisplay(productsJSON , 0);
    });
});



//NEXT AND PREVIOUS BUTTON ONCLICK 
const nextButton = document.getElementById('next');
nextButton.addEventListener('click' , ()=>{

if(pageNumber < numberOfPages -1){
    pageNumber++;
    changePicturesDisplay(productsJSON,pageNumber);
}else{

}

});


const prevButton = document.getElementById('prev');
prevButton.addEventListener('click' , ()=>{

if(pageNumber > 0){
    pageNumber--;
    changePicturesDisplay(productsJSON,pageNumber);
}

});


//////PRODUCT PAGE//////
const images2 = document.querySelectorAll('.cataloug img');

images2.forEach(image => {
    image.addEventListener('click', function() {
        console.log('clicked Image ID:', image.id);
        console.log('clicked image source:', image.src);

        localStorage.setItem('clickedImageSrc', image.src);
        const productIndex = parseInt(image.id.split('image')[1]);
        const fullDescription = productsJSON[productIndex].fullDescription;
        localStorage.setItem('clickedImageFullDescription', fullDescription);
        

        // Redirect to the second page
       
    });
});



