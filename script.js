let products = `[
    {
        "src": "image1.jpg",
        "description": "Description for image 1",
        "full-description": "product for bla bla bla 1  ",
        "category": "kitchen"
    },
    {
        "src": "image2.jpg",
        "description": "Description for image 2",
        "full-description": "product for bla bla bla 2 ",
        "category": "home"
    },
    {
        "src": "image3.jpg",
        "description": "Description for image 3",
        "full-description": " product for bla bla bla 3",
        "category": "home"
    },
    {
        "src": "image4.jpg",
        "description": "Description for image 4",
        "full-description": " product for bla bla bla 4",
        "category": "medical"
    },
    {
        "src": "image5.jpg",
        "description": "Description for image 5",
        "full-description": "product for bla bla bla 5",
        "category": "home"
    },
    {
        "src": "image6.jpg",
        "description": "Description for image 6",
        "full-description": "product for bla bla bla 6 ",
        "category": "medical"
    },
    {
        "src": "image7.jpg",
        "description": "Description for image 7",
        "full-description": "product for bla bla bla 7 ",
        "category": "home"
    },
    {
        "src": "image8.jpg",
        "description": "Description for image 8",
        "full-description": "product for bla bla bla 8 ",
        "category": "kitchen"
    },
    {
        "src": "image9.jpg",
        "description": "Description for image 9",
        "full-description": "product for bla bla bla 9 ",
        "category": "home"
    }
]`;

const productsData = JSON.parse(products);

window.addEventListener('DOMContentLoaded', () => {
    const imageElements = document.querySelectorAll('.image');
    const descriptionElements = document.querySelectorAll('.description p'); // Select all paragraph elements under .description class
    productsData.forEach((product, index) => {
        const imageElement = imageElements[index];
        const descriptionElement = descriptionElements[index];
        if (imageElement) {
            imageElement.src = product.src;
            imageElement.alt = product.description;
        }
        if (descriptionElement) {
            descriptionElement.textContent = product.description;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const imageElements = document.querySelectorAll('.image');
    const descriptionElements = document.querySelectorAll('.description p');
    const categoryItems = document.querySelectorAll('.category-item');
    let defaultImages = [];

    function storeDefaultImages() {
        defaultImages = [...productsData];
    }

    function displayAllImages() {
        defaultImages.forEach((product, index) => {
            const imageElement = imageElements[index];
            const descriptionElement = descriptionElements[index];
            if (imageElement) {
                imageElement.src = product.src;
                imageElement.alt = product.description;
            }
            if (descriptionElement) {
                descriptionElement.textContent = product.description;
            }
        });
    }

    function crossfadeImages(selectedCategory) {
        const filteredImages = defaultImages.filter(product => product.category === selectedCategory);
        const otherImages = defaultImages.filter(product => product.category !== selectedCategory);
        const combinedImages = [...filteredImages, ...otherImages];

        imageElements.forEach((imageElement, index) => {
            const descriptionElement = descriptionElements[index];
            if (imageElement) {
                imageElement.classList.add('hidden');

                setTimeout(() => {
                    imageElement.src = combinedImages[index].src;
                    imageElement.alt = combinedImages[index].description;

                    imageElement.classList.remove('hidden');
                }, 750 * index); // Adjust the time for the effect

                if (descriptionElement) {
                    descriptionElement.textContent = combinedImages[index].description;
                }
            }
        });
    }

    storeDefaultImages();

    categoryItems.forEach(categoryItem => {
        categoryItem.addEventListener('click', () => {
            const selectedCategory = categoryItem.dataset.category;
            if (selectedCategory === 'all') {
                displayAllImages();
            } else {
                crossfadeImages(selectedCategory);
            }
        });
    });
});

