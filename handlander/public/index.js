const socket = io()

function renderProducto(producto){
     const titulo = document.createElement("h5")
        titulo.innerHTML = producto.nombre

        const imagen = document.createElement("img")
         imagen.src= producto.imagen

        const div = document.createElement("div")
        const precio = document.createElement("p")
        precio.innerHTML =producto.precio
        div.appendChild(precio)

        const contenedor = document.getElementById('contenedorProducto')
    
        contenedor.appendChild(titulo)
        contenedor.appendChild(imagen)
        contenedor.appendChild(div)
    }


    
socket.on("new-coneccion", data =>{
    data.forEach(element => {
   renderProducto(element)
    });
})


socket.on("producto", data =>{
  
      renderProducto(data)
})




function addProduct (e){
const productoNuevo = {
nombre: document.getElementById("nombre").value,
precio:document.getElementById("precio").value,
imagen:document.getElementById("imagen").value
}
console.log("productoNuevo:",productoNuevo)
socket.emit("nuevo-producto", productoNuevo)
return false
}



function render(data) {
    const html = data.map((elem, index) => {
        return(`<div style="color: brown">
            <strong style="color: blue">${elem.email}</strong> [${elem.time}] :
            <em style="color: green">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
  }
  
  socket.on('messages', function(data) { render(data); });
  
  function addMessage(e) {
    const mensaje = {
        email: document.getElementById('email').value,
        text: document.getElementById('texto').value
    };
    if (mensaje.email) {
      socket.emit('new-message', mensaje);
    } else {
      alert('Por favor introducir email');
    }
    
    return false;
  }