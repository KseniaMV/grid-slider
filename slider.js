let sliderItem = document.querySelectorAll(".slider_item");

/* on click to slider_item create ajax to slider.html*/
sliderItem.forEach(item => {
    item.addEventListener("click", (e)=>{
        let targetItem = e.target;
        let itemNumber = targetItem.dataset.number;
        console.log(itemNumber);
        let slider = new Promise((resolve, reject)=>{
            let request = new XMLHttpRequest();
            request.open("GET", 'slider.html');
            request.send();
            request.onload = function(){
                if(request.status!=200){
                    reject(this.status + " " + this.statusText);
                    errorMessage();
                }else{
                    document.querySelector(".loader").remove();
                    let data = request.response;
                    let sliderConteiner = document.createElement("div");
                    sliderConteiner.classList.add("slider_conteiner");
                    sliderConteiner.innerHTML = data;
                    let sliderSection = document.querySelector(".slider_section");
                    sliderSection.prepend(sliderConteiner);
                    resolve();
                };       
            };
            request.onprogress = function(){
                loader();
            };
            request.onerror = function(){
                reject(this.status + " " + this.statusText);
                errorMessage();
            };
        });
        slider.then(() => getImage(itemNumber)).then(navigationSlider).then(closeClider);    
    })   
});

/****error message*****/
function errorMessage(){
    let errorBlock = document.createElement("div");
    errorBlock.classList.add("erroblock");
    errorBlock.innerHTML = "<p>Ошибка</p>";
    document.body.append(errorBlock);
    setTimeout(() => {
            errorBlock.remove();
        }, 3000)
};

/*****loader*******/
function loader(){
    let loader = document.createElement("div");
    loader.classList.add("loader");
    document.body.append(loader);
};


/***********create image for slider*************/

function getImage(imageNumber){ 
    let sliderImages = document.querySelector(".slider_images_conteiner");
    if(sliderImages.hasChildNodes()){
        let imageInSlider = sliderImages.firstChild;
        imageInSlider.remove();
    }
    let imageUrl = `images/${imageNumber}.jpg`;
        let image = document.createElement("img"); 
        image.src = imageUrl 
        image.classList.add("slider_image");
        image.setAttribute("data-number", imageNumber); 
        sliderImages.append(image);  
        document.querySelector(".image_number").innerHTML = imageNumber; //вывод номера картинки в span    
};


/********navigation by arrows on click**********/
function navigationSlider(){
    let leftArrow = document.querySelector(".left_arrow");
    let rightArrow = document.querySelector(".right_arrow");
    let previousImage;
    let nextImage;
    leftArrow.addEventListener("click", (e)=>{
        let imageData = Number(document.querySelector(".slider_image").dataset.number);
        if(imageData == 1 ){
            e.preventDefault();
        }else{
            previousImage = imageData - 1;
            getImage(previousImage);
        }      
    });
    rightArrow.addEventListener("click", (e)=>{
        let imageData = Number(document.querySelector(".slider_image").dataset.number);
        if(imageData == 9 ){
            e.preventDefault();
        }else{
            nextImage = imageData + 1;
            getImage(nextImage);
        }
    })
};

function closeClider(){
    let closeSliderButton = document.querySelector(".close_slider");
    closeSliderButton.addEventListener("click", ()=>{
        document.querySelector(".slider_conteiner").remove();

    })
};


