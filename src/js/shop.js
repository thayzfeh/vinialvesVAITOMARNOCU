var divProducts = document.body.querySelector('div.products');
var cardCounter = document.body.querySelector('div#cartCounter');
var divPopup = document.body.querySelector('aside#popup');
var suggestionsDiv = document.body.querySelector('div#suggestions');
class Product{
    constructor(id, name, price, image, category, brand, buyed){
        this.id = id;
        this.name = name;
        this.price= price;
        this.image = image;
        this.category = category;
        this.brand = brand;
        this.buyed = buyed
    };
    renderProduct(){
        let element = document.createElement("div");
        element.setAttribute("class","product");
        element.innerHTML = `
            <div class="productImageDiv">
                <img src="${this.image}" alt="${this.name}" class="productImage" onclick="show(${this.id})">
                <img src="${this.buyed?"src/img/cancel.png":"src/img/buy.png"}" alt="comprar" class="buy" onclick="${this.buyed?`cancelBuy(${this.id})`:`buy(${this.id})`}">
            </div>
            <p class="productName">${this.name}</p>
            <p class="productPrice">R$${this.price.toFixed(2)}</p>
        `;
        divProducts.append(element);
    }
};

const generateProducts = () =>{
    var products = [];
    products.push(new Product(1, "Creatina em Pó Black Skull",29.9, "src/img/products/1.png", "Suplemento" ,"Black Skull", false));
    products.push(new Product(2, "Loratadina 10mg Genérico Neo Química",6.99, "src/img/products/2.png", "Medicamento" ,"Genérico", false));
    products.push(new Product(3, "Repelente Loção Off! Family",19.49, "src/img/products/3.png", "Repelente" ,"Off", false));
    products.push(new Product(4, "Acetilcisteína Granulado",25.99, "src/img/products/4.png", "Medicamento" ,"Genérico", false));
    products.push(new Product(5, "Simeticona 125mg Cimed",5.99, "src/img/products/5.png", "Medicamento" ,"Cimed", false));
    products.push(new Product(6, "Suplemento Vitamínico Imecap Hair Max Homens E Mulheres",67.39, "src/img/products/6.png", "Suplemento" ,"Imecap", false));
    products.push(new Product(7, "Máscara Capilar Intensiva Pantene Pro-V Nutrição",20.24, "src/img/products/7.png", "Máscara" ,"Pantene", false));
    products.push(new Product(8, "Fórmula Infantil Aptanutri Premium",68.99, "src/img/products/8.png", "Fórmula Infantil" ,"Aptanutri", false));
    products.push(new Product(9, "Hidratante Corporal Neutrogena Body Care Intensive Hidrata&Repara",26.99, "src/img/products/9.png", "Hidratante" ,"Neutrogena", false));
    products.push(new Product(10, "Protetor Solar Bioré Uv Aqua Rich FPS50",74.9, "src/img/products/10.png", "Protetor Solar" ,"Bioré UV", false));
    products.push(new Product(11, "Água Oxigenada Cremosa Ox Knut",10.99, "src/img/products/11.png", "Insumo" ,"Ox Knut", false));
    products.push(new Product(12, "Creme Dental para Sensibilidade Elmex",29.39, "src/img/products/12.png", "Creme Dental" ,"Elmex", false));
    products.push(new Product(13, "Blowtex Sabor Tutti Frutti",13.49, "src/img/products/13.png", "Preservativo" ,"Blowtex", false));
    products.push(new Product(14, "Absorvente Intimus® Noturno Suave com Abas",24.99, "src/img/products/14.png", "Absorvente" ,"Intimus", false));
    products.push(new Product(15, "Extrato de Cannabis 160,32mg/ml Mantecorp",297.91, "src/img/products/15.png", "Medicamento" ,"Mantecorp", false));

    return products;
    };
const renderProducts = (products) =>{
    divProducts.innerHTML ="";
    products.map((x) => x.renderProduct())
    let productsBuyed = products.filter((x) => x.buyed == true);
    cardCounter.innerHTML = productsBuyed.length;
}



var products = generateProducts();

renderProducts(products);

const buy= (id) =>{
    products = products.map((x) =>{
        if(x.id == id){
            x.buyed = true;
        }
        return x;
    });
    renderProducts(products);
}
const cancelBuy= (id) =>{
    products = products.map((x) =>{
        if(x.id == id){
            x.buyed = false;
        }
        return x;
    });
    renderProducts(products);
}

const popupBuy= (id) =>{
    products = products.map((x) =>{
        if(x.id == id){
            x.buyed = true;
        }
        return x;
    });
    renderProducts(products);
    show(id);
}
const popupCancelBuy= (id) =>{
    products = products.map((x) =>{
        if(x.id == id){
            x.buyed = false;
        }
        return x;
    });
    renderProducts(products);
    show(id);
}
const show = (id) =>{
    divPopup.innerHTML = '';
    let product = products.find((x) => x.id == id);

    let element = document.createElement('div');
    element.setAttribute('class','popupContent');
    element.innerHTML = `
        <button class="hidePopup" onclick="hidePopup()">X</button>
        <h1>Página de Produto</h1>
        <div class="productImageDiv">
            <img src="${product.image}" alt="imagem do produto" class="popupImage">
            <img src="${product.buyed?"src/img/cancel.png":"src/img/buy.png"}" alt="comprar" class="buy" onclick="${product.buyed?`popupCancelBuy(${product.id})`:`popupBuy(${product.id})`}">
        </div>
        <p class="productName">${product.name}</p>
        <p><span class="bold">Categoria:</span> ${product.category}</p>
        <p><span class="bold">Marca:</span> ${product.brand}</p>
        <p class="productPrice">R$${product.price.toFixed(2)}</p>

        `;
    divPopup.append(element);

    if(!divPopup.classList.contains('show')) divPopup.classList.add('show');
    
}
const hidePopup = () =>{
    divPopup.classList.remove('show');
}

const showSuggestions = () =>{
    let input = document.body.querySelector('input#textSearch');
    let valueUser = input.value.toLowerCase();
    suggestionsDiv.innerHTML = '';

    if(input){
        const suggestions = products.map((x) => x.name);
        const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(valueUser));

        if(filteredSuggestions.length > 0){
        filteredSuggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.classList.add('autocomplete-suggestion');
            div.textContent = suggestion;
            div.onclick = () => {
                input.value = suggestion;
                suggestionsDiv.innerHTML = '';
            };
            suggestionsDiv.appendChild(div);
        })
    }else{
        const div = document.createElement('div');
        div.classList.add('autocomplete-suggestion');
        div.textContent = `Não há nenhum ${valueUser} :(`;
        suggestionsDiv.appendChild(div);
    }
}
}

const searchProduct = () =>{
    let input = document.body.querySelector('input#textSearch');
    let valueUser = input.value;

    let product = products.find((x) => x.name == valueUser);
    if(product){
        show(product.id);
        input.value = '';
    }
    
}


document.addEventListener('click', function(event) {
    if (!document.getElementById('search').contains(event.target)) {
        document.getElementById('suggestions').innerHTML = '';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    
    const productName = getUrlParameter('product');
    if (productName) {
        let product = products.find((x) => x.name.toLowerCase() == productName.toLowerCase());
        if (product) {
            show(product.id); 
        }
    }
});