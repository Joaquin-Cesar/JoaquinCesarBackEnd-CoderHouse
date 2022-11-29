
/*class Producto {
 constructor(productos)
    {
  this.productos= productos


   }

   save = (productoImgresado) =>{
     

    let id = 1;
  
    this.productos.forEach(element => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
   const productoNuevo ={
    ...productoImgresado,
    id: id
   }
    console.log("producto",productoImgresado)
    this.productos.push(productoNuevo);
    console.log("productoNuevo",productoNuevo)
 
  }  
     
    


getById=(id)=>{
  
    let MiProducto =  this.productos.find((el)=> el.id ===id)
    return MiProducto

}

getall =  ()=>{

    return this.productos

}

deleteById=(id)=>{
if(id >=0 && id<=6){ let borrador =  this.productos.map(el => el.id)
    console.log("borrador:",borrador)
    let productoEliminar = borrador.indexOf(id)

    console.log(productoEliminar)
    this.productos.splice(productoEliminar,1)}
   else{
    console.log("error")
   }
    

}

cambio = (array)=>{
   this.productos =[]
   this.productos =array
}

deleteAll = (desicion)=>{
    if(desicion==="si"){
        this.productos =[]

    }
}
}




const producto = new Producto([])

 producto.save({nombre:"Cono de Dulce de Leche",precio: 80,imagen: "https:cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_playstore_google-64.png"})
 producto.save({nombre:"Coca Cola Zero (500ml)",precio: 120,imagen: "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-64.png"})
 producto.save( {nombre: "Jamón-Bacon Sin Gluten", precio: 450,imagen: "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_gmail-64.png"})
 producto.save( {nombre: "Fanta (500ml)",precio: 115,imagen: "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_sketch_app-64.png"})
*/


 const express = require("express");
 const aplicacion = express();
 const moment = require('moment');
 const PORT = 8080
 const carpetaPublica ="./public"
 const Producto = require("./manejoDeArchivos/archivos.js")
 const options = require('./connection/options.js');
 const producto = new Producto(options.mysql, 'productos')
 const mensajes = new Producto(options.sqlite3, 'mensajes')
 const {Server: HttpServer} = require("http")
 const {Server: IOServer} = require("socket.io")

 const httpServer = new HttpServer(aplicacion)
 const io = new IOServer(httpServer)
 
const bodyParser = require("body-parser");
aplicacion.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}));
aplicacion.use(bodyParser.json({ limit: "50mb"}));
 
aplicacion.use(express.static(carpetaPublica))


aplicacion.get('/', (peticion, respuesta) => {
  respuesta.send("index.html", {root:carpetaPublica
  });
})
 aplicacion.use(express.json());
 aplicacion.use(express.urlencoded({ extended: true }));

 
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
 server.on("error", error => console.log(`Error en servidor ${error}`))

io.on("connection", async (socket)=>{
  console.log(" Nuevo cliente conectado")

  const listadoProductos=  await producto.getall()
 socket.emit("new-coneccion", listadoProductos)

 socket.on("nuevo-producto",(data)=>{
  producto.save(data)


  io.sockets.emit("producto", data)
 })



 const listaMensajes = await mensajes.getall();
 socket.emit('messages', listaMensajes);

 //Evento para recibir nuevos mensajes
 socket.on('new-message', async data => {
  console.log("data",data)
   data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
   await mensajes.save(data);
   const listaMensajes = await mensajes.getall();
   io.sockets.emit('messages', listaMensajes);
 });
})

