

/*const fs = require('fs')


class Producto {
 constructor(archivo)
    {
  this.archivo= archivo


   }

save =  async (producto) =>{
     try{

      if (fs.existsSync(this.archivo)) {

        let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
        let productosExistentes =  JSON.parse(archivo)

        if (productosExistentes.length>0) {
            let identificador = productosExistentes[productosExistentes.length-1].id +1
            let product ={
                id:identificador,
                ...producto
            }
            productosExistentes.push(product)
            await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
            return identificador
        }

        else{
            let identificador = 1 
            let product ={
                id:identificador,
                ...producto
            }
            productosExistentes.push(product)
            await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
            return identificador
        }

      
      }

      else{
        let product ={
            id:1,
            ...producto
        }
        await fs.promises.writeFile(this.archivo,JSON.stringify([product],null,2))
        return 1;
      }  

     }
     catch{
        console.log("error")
     }

}

getById= async (id)=>{
    let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
    let productosExistentes =  JSON.parse(archivo)
    let MiProducto = productosExistentes.find((el)=> el.id ===id)
    return MiProducto
}

getall = async ()=>{
    let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
    let productosExistentes =  JSON.parse(archivo)
    return productosExistentes
}

deleteById= async (id)=>{
    let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
    let productosExistentes =  JSON.parse(archivo)
    let borrador = productosExistentes.map(el => el.id)
    let productoEliminar = borrador.indexOf(id)
    console.log(productoEliminar)
    productosExistentes.splice(productoEliminar,1)
    console.log(productosExistentes)
    await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
}

deleteAll = async (desicion)=>{
    if(desicion==="si"){
        let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
        let productosExistentes =  JSON.parse(archivo)
         productosExistentes =[]
        await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
    }
}

}


const producto = new Producto("Productos.txt")


 metodos = async ()=>{
console.log(await producto.save({nombre:"Cono de Dulce de Leche",precio: 80,categoria:"postre"}))
console.log(await producto.save({nombre:"Coca Cola Zero (500ml)",precio: 120,categoria:"bebida"}))
console.log(await producto.save({nombre:"Cono Combinado",precio: 80,categoria:"postre"}))
console.log(await producto.getById(2))
console.log(await producto.getById(59))
console.log(await producto.getall())
await producto.deleteById(3)
await producto.deleteAll("si")
}

metodos()




const numerosAleatorios=[]
const cantidadNumeros ={
   
}
debugger
for (let index = 0; index < 100; index++) {
 const  numeros=Math.ceil(Math.random() * 20)
numerosAleatorios.push(numeros)
    if (cantidadNumeros[numeros]) {
        cantidadNumeros[numeros]++
        }
        else{
            cantidadNumeros[numeros] = 1
        }
    
}

console.log(numerosAleatorios)
console.log(cantidadNumeros)

const moment= require("moment")
const hoy = moment(new Date())
const nacimiento = moment(new Date("02/09/2002"))
console.log(hoy)
 https://node-qtrqoh--8080.local.webcontainer.io/visitas*/


 const fs = require('fs')
 const express = require("express");

class Producto {
 constructor(archivo)
    {
  this.archivo= archivo


   }

save =  async (producto) =>{
     try{

      if (fs.existsSync(this.archivo)) {

        let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
        let productosExistentes =  JSON.parse(archivo)

        if (productosExistentes.length>0) {
            let identificador = productosExistentes[productosExistentes.length-1].id +1
            let product ={
                id:identificador,
                ...producto
            }
            productosExistentes.push(product)
            await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
            return identificador
        }

        else{
            let identificador = 1 
            let product ={
                id:identificador,
                ...producto
            }
            productosExistentes.push(product)
            await fs.promises.writeFile(this.archivo,JSON.stringify(productosExistentes,null,2))
            return identificador
        }

      
      }

      else{
        let product ={
            id:1,
            ...producto
        }
        await fs.promises.writeFile(this.archivo,JSON.stringify([product],null,2))
        return 1;
      }  

     }
     catch{
        console.log("error")
     }

}

getById= async ()=>{
    let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
    let productosExistentes =  JSON.parse(archivo)
    let id = Math.ceil(Math.random() * 5)
    let MiProducto = productosExistentes.find((el)=> el.id ===id)
    return MiProducto
}

getall = async ()=>{
    let archivo =  await fs.promises.readFile(this.archivo,"utf-8")
    let productosExistentes =  JSON.parse(archivo)
    return productosExistentes
}


}


const producto = new Producto("Productos.txt")



metodos = async ()=>{
    const aplicacion = express();
    const PORT = 8080
    const productosTotal= await producto.getall()
    const productoRamdom= await  producto.getById()
    const server = aplicacion.listen(PORT, () => {
       console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))
debugger  

let product = ``
    productosTotal.forEach(element => {
         product += `<div style="display:inline-block; margin:10px;">
                          <h2>${element.nombre}</h2>
                          <p>${element.nombre}</p>
                                                   </div>` })
    aplicacion.get('/productos',(peticion,respuesta)=>{

            respuesta.send( `<h1 style=" text-align: center;">Mis Productos</h1>
                             <di>${product} </div>`)
         
        
    }) ;
    aplicacion.get('/productoRandom',(peticion,respuesta)=>{
       
        respuesta.send(
                       `<h1>Producto</h1>
                       <h2>${productoRamdom.nombre}</h2>
                        <p>Precio: ${productoRamdom.precio}</p>`)
    })
    
    console.log(await producto.getall())
    console.log(await producto.getById())
    
    }
    
    metodos()