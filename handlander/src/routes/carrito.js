import express from "express";
import { Producto } from "../manejoDeArchivos/archivos.js";
const routeCarrito = express.Router()


 const carrito= new Producto('./src/archivos/carrito.txt')
 const producto = new Producto('./src/archivos/producto.txt')

 
 routeCarrito.post('/', async(peticion, respuesta) => {
  const nuevoCarrito ={
    timestamp: Date.now(),
    productos : []
  }
  const id = await carrito.save(nuevoCarrito)
  respuesta.json(id)
})


routeCarrito.get('/', async(peticion, respuesta) => {
    const listaCarrito = await carrito.getall()
    respuesta.json(listaCarrito)
})

routeCarrito.delete('/:id', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    await producto.deleteById(id)
    respuesta.json({
        status: id 
      });

}) 

routeCarrito.get('/:id/productos', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    console.log("id",id)
  const productoPedido = await carrito.getById(id)
  console.log("productoPedido",productoPedido)
  if (productoPedido) {
    respuesta.json(productoPedido.productos);
  } else {
    respuesta.status(404);
    respuesta.json({ error : 'producto no encontrado' });}
})

routeCarrito.post('/:id/productos', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id) - 1;
    const productoCarrito = peticion.body.productoCarrito
    const product = await producto.getById(productoCarrito)
    const carrito =  carrito.getById(id)
    carrito.productos.push(product )

    const array = await producto.getall()
    array[id]= carrito
    carrito.productoCarrito(array)
    respuesta.json({
        status: "okey" 
      });
})



routeCarrito.delete('/:id/productos/:id_prod', async(peticion, respuesta) => {
    const id = parseInt(peticion.params.id) - 1;
    const productoCarrito = parseInt(peticion.params.id_prod)
   const carrito = await carrito.getById(id)
   let indexDelete = -1
    carrito.productos.forEach(element, index => {
        if(producto.id == id){
            indexDelete = index
        }
        if(indexDelete => 0){
            carrito.productos.splice(indexDelete, 1)
        }
    });

    const array = await producto.getall()
    array[id]= carrito
    carrito.productoCarrito(array)
    respuesta.json({
        status: "okey" 
      });
}) 
 
export {routeCarrito}