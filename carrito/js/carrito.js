var productosEnCarro = []
var carroAbierto = false;
var formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
})


function toggleCarro() {
    if (productosEnCarro.length < 1){
        alertify.message('El carro está vacío', 2)
    } else {
    if (carroAbierto) {
        carroAbierto = false
        $("#contenedor-carro").toggleClass("d-none")
    } else {
        carroAbierto = true
        $("#contenedor-carro").toggleClass("d-none")
       
    }
}
}
const agregarAlCarro = (idProducto) => {

    var productoSeleccionado = listaProductos.filter(function (producto) {
        return producto.id === idProducto;
    })[0]

    if (productosEnCarro.some(producto => producto.id == productoSeleccionado.id)) {
        productosEnCarro.map((producto) => {
            if (producto.id == productoSeleccionado.id) {
                producto.cantidad += 1
                if (!carroAbierto){
                alertify.success('Agregado ' + productoSeleccionado.nombre + ' al carro (Cantidad: ' + producto.cantidad + ')', 4);
                }
            }
        })
    } else {
        productoSeleccionado.cantidad = 1
        productosEnCarro.push(productoSeleccionado)
        alertify.success('Agregado ' + productoSeleccionado.nombre + ' al carro', 4);
    }
    
    renderCarro()
    actualizarCantidad()
}


const eliminarDelCarro = (idProducto) => {
    var productoEliminado =  productosEnCarro.filter(function (producto) {
        return producto.id == idProducto;
    })[0]
    var productosMantenidos = productosEnCarro.filter(function (producto) {
        return producto.id != idProducto;
    })
   
    productosEnCarro = productosMantenidos
    renderCarro()
    actualizarCantidad()
    alertify.notify(`Eliminado ${productoEliminado.nombre} `, 'error', 5);
}


function renderCarro() {

    $("#carro").empty()
    if ( productosEnCarro.length > 0) {
        
        $("#carrito-icono").html('<img src="img/carrito-lleno.png" height="50px" >')
    var productosEnCarroHTML = '<h5 class="card-title"> Carro de Compras</h5>' +
                              '<table class="table">' +
                              '<td> Cantidad </td> <td> Producto </td> <td>  </td>'

    for (i = 0; i < productosEnCarro.length; i++) {
        var producto =
                    `<tr>
                       <td> 
                            <input class="input-cantidad d-inline"  id="cantidadDeProducto${productosEnCarro[i].id}" min="0" type="number" onchange="actualizarCantidad()" value=${productosEnCarro[i].cantidad}>  
                        </td> 
                        <td>
                        x <b>${productosEnCarro[i].nombre}</b>  ${formatter.format(productosEnCarro[i].precioUnitario)}
                        </td> 
                        <td> 
                            <div class="btn btn-primary d-inline botones-carro boton-falso" onclick="aumentarCantidad(${productosEnCarro[i].id})"><b>+</b>
                            </div> 
                            <div class="btn btn-secondary d-inline botones-carro boton-falso disminuir" onclick="disminuirCantidad(${productosEnCarro[i].id})"><b>-</b>
                            </div> 
                            <div class="btn btn-danger d-inline botones-carro boton-falso" onclick="eliminarDelCarro(${productosEnCarro[i].id})" ><b>X</b> 
                            </div> 
                        </td>  
                    </tr> `
         
        productosEnCarroHTML += producto
    }

    productosEnCarroHTML = productosEnCarroHTML + '</table>'
    } else {
        $("#carrito-icono").html('<img src="img/carrito.PNG" height="50px" >')
    }
    $("#carro").append(productosEnCarroHTML)
  
}



function actualizarCantidad() {

    $("#precio-total").empty()
    var cantidadProductosEnCarro = 0;
    var precioTotal = 0

    for (i = 0; i < productosEnCarro.length; i++) {
       
        productosEnCarro[i].cantidad = parseInt($("#cantidadDeProducto" + productosEnCarro[i].id).val())
        if (productosEnCarro[i].cantidad == 0) {
            eliminarDelCarro(productosEnCarro[i].id)
        } else if (productosEnCarro[i].cantidad > 0) {
            cantidadProductosEnCarro += productosEnCarro[i].cantidad
            precioTotal += productosEnCarro[i].precioUnitario * productosEnCarro[i].cantidad
        } else {
            $("#cantidadDeProducto" + productosEnCarro[i].id).val("1")
            productosEnCarro[i].cantidad = parseInt($("#cantidadDeProducto" + productosEnCarro[i].id).val())
            cantidadProductosEnCarro += productosEnCarro[i].cantidad
            precioTotal += productosEnCarro[i].precioUnitario * productosEnCarro[i].cantidad
        }

    }

   if (precioTotal != 0) {
       $("#precio-total").html(`<div class="container-fluid text-right"><h5 class="card-title d-inline">Total  ${formatter.format(precioTotal)} </h5> <div class="btn btn-success boton-falso" onclick="alert('Realicé esta página con dedicación para respaldar lo que dije: estoy sumamente entusiasmado de seguir aprendiendo y hacer lo mejor que pueda. Sé que todo el empeño que pongo en mi trabajo no solo se plasmará en un buen producto, también, quedará en mí como conocimiento y experiencia. Saludos!')">Pagar</div><div>`)
       $("#cantidad-en-carro").addClass("d-inline")
       $("#cantidad-en-carro").html(cantidadProductosEnCarro)
    } else {
       $("#cantidad-en-carro").addClass("d-none")
    }
}


function aumentarCantidad(idProducto){
    productosEnCarro.map(producto => { 
                            if (producto.id == idProducto) {
                                producto.cantidad++
                            $("#cantidadDeProducto" + producto.id).val(producto.cantidad)
                                actualizarCantidad()            
                            }   
    })
    
}

function disminuirCantidad(idProducto){
    productosEnCarro.map(producto => { 
                            if (producto.id == idProducto && producto.cantidad > 1) {
                                producto.cantidad--
                            $("#cantidadDeProducto" + producto.id).val(producto.cantidad)
                                actualizarCantidad()            
                            } else {
                                if (producto.id == idProducto) {
                                alertify.notify('Aprete X para eliminar', 'error', 2);
                                }
                            }
    })
    
}
