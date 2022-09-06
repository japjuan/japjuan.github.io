
let cat = [];
let productsArray = []


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cat = resultObj.data;
            productsArray = cat.products
            showProductsList(productsArray);
            console.log(productsArray)
        }
    });
});

function sortByMostEx(){
    productsArray.sort(function(x, y){
        return y.cost - x.cost;
    })
    showProductsList(productsArray);
}

function sortByLessEx(){
    productsArray.sort(function(x, y){
        return  x.cost - y.cost;
    })
    showProductsList(productsArray);

}

function sortByRelevant(){
    productsArray.sort(function(x, y){
        return y.soldCount - x.soldCount;
    })
    showProductsList(productsArray);

}

function filtrar(){
    productsArray = cat.products   
    productsArray = productsArray.filter(product => product.cost >= document.getElementById("rangeFilterCountMin").value && product.cost <= document.getElementById("rangeFilterCountMax").value)
    showProductsList(productsArray)


}

function limpiar(){
    
    document.getElementById("rangeFilterCountMin").value = ""
    document.getElementById("rangeFilterCountMax").value = ""
    productsArray = cat.products
    showProductsList(productsArray);

}



function showProductsList(array){
    let htmlContentToAppend = "";
    document.getElementById("cat-name").innerHTML = "Verás aquí todos los productos de la categoría " + cat.catName

    for(const product of array){ 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + " - " + product.cost + " " + product.currency +`</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}

