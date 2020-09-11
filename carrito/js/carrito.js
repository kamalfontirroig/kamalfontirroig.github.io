var productosEnCarro = []
var formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
})


const agregarAlCarro = (idProducto) => {

    var productoSeleccionado = listaProductos.filter(function (producto) {
        return producto.id === idProducto;
    })[0]

    if (productosEnCarro.some(producto => producto.id == productoSeleccionado.id)) {
        productosEnCarro.map((producto) => {
            if (producto.id == productoSeleccionado.id) {
                producto.cantidad += 1
            }
        })
    } else {
        productoSeleccionado.cantidad = 1
        productosEnCarro.push(productoSeleccionado)
    }

    renderCarro()
    actualizarCantidad()
}


const eliminarDelCarro = (idProducto) => {

    var productosMantenidos = productosEnCarro.filter(function (producto) {
        return producto.id != idProducto;
    })

    productosEnCarro = productosMantenidos
    console.log(productosEnCarro)
    renderCarro()
    actualizarCantidad()
}


function renderCarro() {

    $("#carro").empty()
    if ( productosEnCarro.length > 0) {
    var productosEnCarroHTML = '<h5 class="card-title"> Carro de Compras</h5>' +
                              '<table class="table">'

    for (i = 0; i < productosEnCarro.length; i++) {
        var producto =
                    '<tr>' +
                       '<td>' +
                            '<input class="input-cantidad d-inline"  id="cantidadDeProducto'+productosEnCarro[i].id+'" min="0" type="number" onchange="actualizarCantidad()" value=' + productosEnCarro[i].cantidad + '>' + 
                        '</td>' +
                        '<td>' +
                            'x <b>' + productosEnCarro[i].nombre + '</b>' +
                            '<p> ' + formatter.format(productosEnCarro[i].precioUnitario) + '</p>' +
                        '</td>' +
                        '<td>' +
                            '<div class="btn btn-danger d-inline eliminar" onclick="eliminarDelCarro(' + productosEnCarro[i].id + ')" >X' +
                            '</div>' +
                        '</td>' + 
                    '</tr>' 
         
        productosEnCarroHTML += producto
    }

    productosEnCarroHTML = productosEnCarroHTML + '</table>'
    }   
    $("#carro").append(productosEnCarroHTML)

}


function actualizarCantidad() {

    $("#precio-total").empty()
    var precioTotal = 0

    for (i = 0; i < productosEnCarro.length; i++) {
       
        productosEnCarro[i].cantidad = parseInt($("#cantidadDeProducto" + productosEnCarro[i].id).val())
        if (productosEnCarro[i].cantidad == 0) {
            eliminarDelCarro(productosEnCarro[i].id)
        } else if (productosEnCarro[i].cantidad > 0) {
            precioTotal += productosEnCarro[i].precioUnitario * productosEnCarro[i].cantidad
        } else {
            $("#cantidadDeProducto" + productosEnCarro[i].id).val("1")
            productosEnCarro[i].cantidad = parseInt($("#cantidadDeProducto" + productosEnCarro[i].id).val())
            precioTotal += productosEnCarro[i].precioUnitario * productosEnCarro[i].cantidad
        }

    }

   if (precioTotal != 0) {
       $("#precio-total").html('<h5 class="card-title my-2 mx-3 d-inline">Total ' + formatter.format(precioTotal) + '</h5>' + '<div class="btn btn-success" onclick="alert(`a pagar!`)">Pagar</div>')
   }
}