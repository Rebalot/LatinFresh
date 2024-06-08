// La empresa perfumes latinos premiará a su empleado del mes (quien más dinero recaude en ventas) con una comisión y requiere un programa que almacene y muestre:
// Qué cantidad de cada productos vendió cada vendedor.
// La suma total de dinero recolectada por cada vendedor.
// Nombre del empleado del mes, en caso de haber vendido lo mismo indicar que fue un empate.
// La empresa actualmente cuenta con los siguientes 4 productos que tienen los siguientes nombres y precios:
// Aqua: 200 usd.
// Emoción: 180 usd.
// Alegría: 160 usd.
// Frescura: 150 usd.
// Y dos vendedores Juana y Pedro.
// Notas.
// Los resultados deben visualizarse en consola y deben activarse a través de botones.
// El programa debe validar y mostrar un mensaje de error si no se ingresa un valor numérico.(Opcional).
// Debe hacer uso de funciones, arrays y estructuras de control para resolver el ejercicio.

const catalogo = [
    {producto: 'Aqua', precio: 200, img: 'images/aqua.jpg'},
    {producto: 'Emoción', precio: 180, img: 'images/emocion.jpg'},
    {producto: 'Alegría', precio: 160, img: 'images/alegria.jpg'},
    {producto: 'Frescura', precio: 150, img: 'images/frescura.jpg'},
]
let vendedores = [
    {nombre: 'Juana', ventas: [], qtyProductos:{}, valorTotalVentas: 0, icono: 'images/female-avatar-girl-face-woman-user-4-svgrepo-com.svg'},
    {nombre: 'Pedro', ventas: [], qtyProductos:{}, valorTotalVentas: 0, icono: 'images/male-avatar-boy-face-man-user-7-svgrepo-com.svg'},
]

function aleatorio1o2(){
    return Math.floor(Math.random() * 2) + 1
}
let vendedorAleatorio = aleatorio1o2();
asignarVendedor();
function asignarVendedor(){
    const vendedorIcono = document.querySelector('.vendedor_logo img'),
    spanVendedor = document.getElementById('dialogo_vendedor');
    const vendedorActual = vendedores[vendedorAleatorio - 1]

        vendedorIcono.src = vendedorActual.icono;
        vendedorIcono.alt = `Vendedor: ${vendedorActual.nombre}`;
        spanVendedor.innerText = vendedorActual.nombre;
        return vendedorActual.nombre

}
const cambiarVendedorIcono = document.getElementById('iconoCambiarVendedor')
cambiarVendedorIcono.addEventListener('click', function(){
    vendedorAleatorio = (vendedorAleatorio === 1) ? 2 : 1;
    asignarVendedor();
})

function generarNumero() {
    // Genera id de producto
    let numero = Math.floor(Math.random() * 9) + 1;
    
    for (let i = 0; i < 4; i++) {
        numero = numero * 10 + Math.floor(Math.random() * 10);
    }

    return numero;
}





const productosContenedor = document.querySelector('.productos')

// Agrega todos los productos dentro del array catalogo en la gridilla
for (let index = 0; index < catalogo.length; index++) {
    let idGenerado = generarNumero();

    //En teoría, innerHTML += también debería agregar el nuevo HTML al final del contenido existente, pero con un comportamiento ligeramente diferente. Cuando utilizas innerHTML +=, el navegador reinterpreta y vuelve a renderizar todo el contenido HTML del elemento. Esto significa que el navegador tiene que reconstruir y renderizar todo el contenido, incluidos los elementos y event listeners existentes, cada vez que se actualiza el innerHTML. Dependiendo de la cantidad de contenido y la complejidad de la página, esto puede ser menos eficiente en términos de rendimiento, especialmente cuando se trata de grandes cantidades de contenido o elementos complejos.Por otro lado, insertAdjacentHTML ofrece un control más preciso sobre dónde se agrega el nuevo HTML en relación con el contenido existente, lo que puede ser útil en situaciones específicas. Además, insertAdjacentHTML no requiere que el navegador vuelva a interpretar y renderizar todo el contenido HTML, lo que puede ser más eficiente en términos de rendimiento, especialmente para actualizaciones de contenido pequeñas y específicas.

    productosContenedor.insertAdjacentHTML('beforeend', `
        <div class="producto_contenedor" id=${idGenerado}>
            <div class="producto_img">
                <img src=${catalogo[index].img}>
            </div>
            <div class="producto_info">
                <div class="producto_name">
                    <h3>${catalogo[index].producto}</h3>
                </div>
                <div class="producto_costo">
                    <p>$${catalogo[index].precio} usd</p>
                </div>
                <div class="producto_quantity">
                    <span>Qty:</span>
                    <div class="quantity_contenedor">
                        <span class="minus">-</span>
                        <span class="num">0</span>
                        <span class="plus">+</span>
                    </div>
                </div>
                <div class="producto_comprar">
                    <button>Agregar</button>
                </div>
            </div>
        </div>
    `);
    catalogo[index].id = idGenerado
}

console.log(catalogo)

const iconoCart = document.getElementById('iconoCart'),
    shoppingList = document.querySelector('.shopping_list');
iconoCart.addEventListener('click', function(){
    if(shoppingList.classList.contains('hide')){
        shoppingList.classList.remove('hide')
    }else{
        shoppingList.classList.add('hide')
    }
})


const qtyCatalgo = {};
const qtyCart = {}

const productoContenedores = document.querySelectorAll('.producto_contenedor')

productoContenedores.forEach(contenedor => {

    minPlus(contenedor, 0, qtyCatalgo)

    const agregarBoton = contenedor.querySelector('.producto_comprar button');
    agregarBoton.addEventListener('click', function() {
        const idActual = Number(contenedor.id);
        const qtyActual = qtyCatalgo[contenedor.id]
        agregar(idActual, qtyActual)
    })
    
});


function minPlus(contenedor, qty, objeto){
    const plus = contenedor.querySelector('.plus'),
    minus = contenedor.querySelector('.minus'),
    num = contenedor.querySelector('.num');


    let quantity = qty;
    const idProducto = Number(contenedor.id.substr(-5));
    // Actualizacion inicial al llamado de la funcion, del valor en objeto
    objeto[idProducto] = quantity

    plus.addEventListener('click', ()=>{
        console.log('active plus contenedor: ', contenedor)
        quantity = objeto[idProducto]
        if(quantity < 10){
            quantity++
            num.innerText = quantity;
            if(contenedor.classList.contains('producto_contenedor')){
                objeto[idProducto] = quantity;
                console.log('qtyCatalogo: ', qtyCatalgo)
            }else{
                objeto[idProducto] = parseInt(num.innerText);
                quantity = objeto[idProducto]
                subtotal(idProducto)
                console.log('qtyCart: ', qtyCart)
            }
            
            
        }else{
            alert('Cantidad de artículo excedida. Max: 10')
        }
        
        
    })
    minus.addEventListener('click', ()=>{
        console.log('active minus contenedor: ', contenedor)
        quantity = objeto[idProducto]
        if(quantity > 0){
            quantity--
            num.innerText = quantity;
            if(contenedor.classList.contains('producto_contenedor')){
                objeto[idProducto] = quantity;
                console.log('qtyCatalogo: ', qtyCatalgo)
            }else{
                objeto[idProducto] = parseInt(num.innerText);
                quantity = objeto[idProducto]
                subtotal(idProducto)
                console.log('qtyCart: ', qtyCart)
            }
        }
    })
    
}
function eliminarProductoCart(contenedor, id){
    const iconoEliminar = contenedor.querySelector('.shopping_eliminar');
    iconoEliminar.addEventListener('click', function(){
        contenedor.remove();
        delete qtyCart[id]
        delete subtotalPrecio[id]
        iconoQtyCart('restar')
        console.log('qtyCart: ', qtyCart)
        console.log('subtotalPrecio: ', subtotalPrecio)
    })
}
function iconoQtyCart(tipo){
    const iconoQtyCart = document.querySelector('.productosCart'),
            spanIconoQtyCart = iconoQtyCart.querySelector('span');

    if(tipo === 'sumar'){
        iconoQtyCart.classList.remove('hide')
        spanIconoQtyCart.innerText++
    }else if(tipo === 'restar'){
        spanIconoQtyCart.innerText--
        if(spanIconoQtyCart.innerText == 0){
            iconoQtyCart.classList.add('hide')
            shoppingList.classList.add('hide')
        }
    }   
}
function encontrarProductoPorId(idBuscado, array) {
    // Devuelve el objeto del producto buscado dentro del array
    for (let i = 0; i < array.length; i++) {
        if (idBuscado === array[i].id) {
            return array[i];
        }
    }
    return null;
}

function agregar(id, qty){
    // Cuando uno hace click en el boton Agregar en algun producto del catalogo, esta función agrega el producto dentro del shopping cart
    const productoObjeto = encontrarProductoPorId(id, catalogo),
        shoppingDiv = document.querySelector('.shopping_contenido');

    let alreadyOnList = document.getElementById(`CartList_${id}`),
        valorQtyActual = qtyCart[id];


    function actualizarValor(valorActual, cantidadAgregar){
        return valorActual + cantidadAgregar
    }

    if(qty === 0 || actualizarValor(valorQtyActual, qty) > 10){
        if(qty === 0){
            alert('No has ingresado una cantidad válida')
        }else{
            alert('Cantidad de artículo excedida. Max: 10')
        }
        
    }else{
        if(alreadyOnList === null){
            shoppingDiv.insertAdjacentHTML('beforeend', `

            <div class="shopping_compra" id=CartList_${id}>
                <div class="shopping_img">
                    <img src=${productoObjeto.img}>
                </div>
                <div class="shopping_nameContenedor">
                    <p>Producto:</p>
                    <span>${productoObjeto.producto}</span>
                </div>
                <div class="shopping_qtyContenedor">
                    <p>Cantidad:</p>
                    <div class="quantity_contenedor">
                        <span class="minus">-</span>
                        <span class="num">${qty}</span>
                        <span class="plus">+</span>
                    </div>
                </div>
                <div class="shopping_eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                </div>
            </div>
        `);

        iconoQtyCart('sumar')
        
        alreadyOnList = document.getElementById(`CartList_${id}`);
        // Una vez agregado el producto al shopping cart, se busca el div. Y se le agregan sus respectivos eventlisteners al selector de qty y al icono de eliminar
        eliminarProductoCart(alreadyOnList, id)

        minPlus(alreadyOnList, qty, qtyCart)
        console.log('qtyCart: ', qtyCart)

        subtotal(id)
        }else{
            // Actualizar span con nueva cantidad agregada a producto
            const actualizarQtyCart = alreadyOnList.querySelector('span.num');
            actualizarQtyCart.innerText = parseInt(actualizarQtyCart.innerText) + qty;
            
            // Actualizar cantidad dentro del objeto. Se actualiza valor de clave.
            
            qtyCart[id] = actualizarValor(valorQtyActual, qty);

            console.log(valorQtyActual, qty, qtyCart, 'agregar')
        }
    }
}

function encontrarPrecioPorId(idBuscado) {
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].id === idBuscado) {
            return catalogo[i].precio;
        }
    }
    return null;
}

const subtotalPrecio = {}
function subtotal(id){

    subtotalPrecio[id] = encontrarPrecioPorId(id)
    subtotalPrecio[id] *= qtyCart[id]
    
    console.log('subtotalPrecio: ', subtotalPrecio)
    total();
}

function total(){
    let sumatoria = 0;

    for (const producto in subtotalPrecio) {
        sumatoria += subtotalPrecio[producto];
    }
    console.log('totalPrecio: ', sumatoria)
    return sumatoria;
}

const botonComprar = document.getElementById('botonComprar');

botonComprar.addEventListener('click', comprarList)

let noOrden = 0
let ventasRegistradas = [];
function comprarList(){
    if(Object.keys(qtyCart).length !== 0){
        noOrden++
        const orden = new Venta(noOrden, asignarVendedor(), qtyCart, subtotalPrecio, total())
        ventasRegistradas.push({...orden});
        console.log(ventasRegistradas)
        delete orden.vendedor;
        for (let index = 0; index < vendedores.length; index++) {
            if(vendedores[index].nombre === asignarVendedor()){
                vendedores[index].ventas.push({...orden})
                // console.log(vendedores[index].ventas)
                actualizarVendedor(vendedores[index])
                break;
            }
        }
        alert('Gracias por tu compra!')
    }else{
        alert('No has agregado ningún artículo al carrito')
    }
    
}

class Venta {
    constructor(noOrden, vendedor, qtyCart, subtotal, total) {
        this.noOrden = noOrden;
        this.vendedor = vendedor;
        this.qtyCart = { ...qtyCart};
        this.subtotal = { ...subtotal};
        this.total = total;
    }
}

function actualizarVendedor(vendedorObjeto){

    let qtyProductos = {},
        valorVentas = 0;

    vendedorObjeto.ventas.forEach(venta => {
        //venta es cada objeto dentro de ventas (cada uno compuesto de las propiedades de la funcion constructora Venta, a excepeción de la propiedad vendedor, la cual se eliminó para este caso)
        for (let key in venta.qtyCart) {
            if (qtyProductos.hasOwnProperty(key)) {
                // Si la clave ya existe en qtyProductos, suma los valores
                qtyProductos[key] += venta.qtyCart[key];
            } else {
                // Si la clave no existe en qtyProductos, simplemente agrega la clave y el valor
                qtyProductos[key] = venta.qtyCart[key];
            }
        }
        valorVentas += venta.total
    });

    // Asignar qtyProductos actualizado al objeto vendedor
    vendedorObjeto.qtyProductos = qtyProductos;
    vendedorObjeto.valorTotalVentas = valorVentas
    console.log(vendedores)
}
function mostrarEmpleadoDelMes(){
    const window = document.getElementById('empleadoDelMes_contenedor'),
        empleadoDelMesSpan = document.getElementById('empleadoDelMes_nombre'),
        articulosListado = document.querySelector('.articulos_nombre'),
        articulosQty = document.querySelector('.articulos_qty'),
        totalVendidoSpan = document.getElementById('totalVendido');

    window.style.display = 'flex'

    let todasLasValorVentasSonCero = vendedores.every(vendedor => vendedor.valorTotalVentas === 0);

    if (!todasLasValorVentasSonCero) {
        //Para obtener el objeto del vendedor con más ganancias totales, dentro de vendedores
        let mayorTotalVentas = vendedores[0];

        for (let i = 0; i < vendedores.length; i++) {
            
            if (vendedores[i].valorTotalVentas > mayorTotalVentas.valorTotalVentas) {
                mayorTotalVentas = vendedores[i];
            }
        }
        console.log(mayorTotalVentas)
        empleadoDelMesSpan.innerText = mayorTotalVentas.nombre;

        let productosVendidos = {}
        for (let idProducto in mayorTotalVentas.qtyProductos) {
            // Producto se refiere al objeto dentro del array Catalogo. El cual será el que coincida el valor del ID con la clave actual dentro del objeto qtyProductos
            const productoEncontrado = catalogo.find(producto => producto.id == idProducto);
            if (productoEncontrado) {
                
                // Si se encuentra el producto, agregar su nombre y valor al array
                productosVendidos[productoEncontrado.producto] = mayorTotalVentas.qtyProductos[idProducto];
            }
        }
        console.log(productosVendidos)

        let listadoContenido = '';
        let qtyContenido = '';

        Object.entries(productosVendidos).forEach(([clave, valor]) => {
            listadoContenido += `<span class="producto_nombre">${clave}</span>`;
            qtyContenido += `<span class="producto_qty">${valor}</span>`;
        });

        articulosListado.innerHTML = listadoContenido;
        articulosQty.innerHTML = qtyContenido;

        totalVendidoSpan.innerText = '$' + mayorTotalVentas.valorTotalVentas
    }else{
        empleadoDelMesSpan.innerText = '---';
    }
}
function cerrarEmpleadoDelMes(){
    const window = document.getElementById('empleadoDelMes_contenedor')
    window.style.display = 'none'

}