 class Prenda {
    constructor (id, nombre, precio,img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}
const calza = new Prenda(1,"calza", 2500, "img/calza.jpg");
const campera = new Prenda(2, "campera", 5000,"img/campera.jpg");
const gorra = new Prenda(3,"gorra", 1000, "img/gorra.jpg");
const short = new Prenda(4, "short", 3000, "img/short.jpg");
const zapatillas = new Prenda(5, "zapatillas", 7000, "img/zapatillas.jpg");

const prendas = [calza, campera, gorra, short, zapatillas];
console.log(prendas)    

    
let carrito = [];

carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let Prendas
async function fetchPrendas() {

    try {

        const response = await fetch(listadoDePrendas);

        if (!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);

        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

    }

}

async function importarPrendas() {

    try {

        const data = await fetchPrendas();

          prendas = data; // Use spread operator to append new data to prendas array

        mostrarPrendas(prendas);

    } catch (error) {

        console.error(error);

        }

}

importarPrendas();





const mostrarPrendas = () => {
    prendas.forEach(prenda  => {
        const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
            card.innerHTML = ` 
                    <div class="card">
                        <img src = "${prenda.img}" class = "card-img-top  imgPrenda" alt= "${prenda.nombre}">
                        <div>
                            <h5> ${prenda.nombre} </h5>
                            <p> ${prenda.precio} <p>
                            <button class = "btn  colorButton" id="boton${prenda.id}">Agregar al carrito</button>
                        </div>
                    </div>
                    `
        listaDePrendas.appendChild(card);  
        const boton = document.getElementById(`boton${prenda.id}`); 
        boton.addEventListener("click", () => {
            agregarAlCarrito(prenda.id);     
        })        
    })              
} 
mostrarPrendas();



const agregarAlCarrito = (id) => {
    const prendaEnCarrito = carrito.find(prenda => prenda.id === id); 
    if(prendaEnCarrito) {
    prendaEnCarrito.cantidad++;
    }else {
        const prenda = prendas.find(prenda => prenda.id === id);
        carrito.push(prenda);
    }
    montoTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById ("verCarrito");
    verCarrito.addEventListener("click", () =>{
        mostrarCarrito();
    })
const mostrarCarrito =() => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(prenda => {
            const card = document.createElement("div");
                card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
                card.innerHTML = ` 
                        <div class="card">
                            <img src = "${prenda.img}" class = "card-img-top  imgPrenda" alt= "${prenda.nombre}">
                            <div>
                                <h5> ${prenda.nombre} </h5>
                                <p> ${prenda.precio} </p>
                                <p> ${prenda.cantidad} </p> 
                                <button class = "btn  colorButton" id="mas${prenda.id}" >+</button>
                                <button class = "btn  colorButton" id="menos${prenda.id}" >-</button>
                                <button class = "btn  colorButton" id="eliminar${prenda.id}" >Eliminar</button>
                            </div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);
        
        const botonMenos = document.getElementById(`menos${prenda.id}`);
        botonMenos.addEventListener("click", () => {
            modificarCantidad(prenda.id, "restar"); 
        })
        
        const botonMas = document.getElementById(`mas${prenda.id}`);
        botonMas.addEventListener("click", () => {
            modificarCantidad(prenda.id, "sumar"); 
        }) 
        
            const boton = document.getElementById(`eliminar${prenda.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(prenda.id); 
        })
        
    
    montoTotal();
    }) }

const eliminarDelCarrito = (id)  => {
    const prenda = carrito.find(prenda => prenda.id === id);
    const indice = carrito.indexOf(prenda);
    carrito.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



function modificarCantidad(id, accion) {
    const prenda = carrito.find(prenda => prenda.id === id);
    if (prenda) {
        if (accion === "sumar") {
        prenda.cantidad += 1;
} else if (accion === "restar" && prenda.cantidad > 1) {
    prenda.cantidad -= 1;
}}
mostrarCarrito();
}
    

const total = document.getElementById("total");

const montoTotal = () => {
    let compraTotal = 0;
    carrito.forEach(prenda =>{
        compraTotal += prenda.precio * prenda.cantidad;
        total.innerHTML = `Total: $${compraTotal}`
    })
}

const vaciarCarrito = document.getElementById("vaciarCarrito");
    vaciarCarrito.addEventListener("click", () => {
        eliminarTodo();
    })

const eliminarTodo = () => {
    carrito = [];
    mostrarCarrito();
    localStorage.clear();
}
const finalizarCompra= document.getElementById("finalizarCompra");
finalizarCompra.addEventListener("click", () => {
    Toastify({
        text: "Gracias por su compra",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
    }).showToast();
    eliminarTodo();
})