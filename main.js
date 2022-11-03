

const express = require("express");
const {Router} = express


const rutaProductos= Router()

const aplicacion = express();
const PORT = 8080



aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));
aplicacion.use('/static', express.static(__dirname + '/public'));
class Producto {
 constructor(productos)
    {
  this.productos= productos


   }

save = (productos) =>{
     

    let id = 1;
    this.productos.forEach(element => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    productos.id = id;
    this.productos.push(productos);
    return id;
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
    console.log(borrador)
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

 producto.save({nombre:"Cono de Dulce de Leche",precio: 80,categoria:"postre"})
 producto.save({nombre:"Coca Cola Zero (500ml)",precio: 120,categoria:"bebida"})
 producto.save({nombre:"Cono Combinado",precio: 80,categoria:"postre"})
 producto.save( {nombre: "Jamón-Bacon Sin Gluten", precio: 450,categoria: "pizza"})
 producto.save( {nombre: "Fanta (500ml)",precio: 115,categoria: "bebida"})



 



   rutaProductos.get('/',(peticion,respuesta)=>{
    const productosTotal=  producto.getall()
    respuesta.json( productosTotal)
              });
             

              rutaProductos.get('/:id', (peticion, respuesta) => {
                const id = parseInt(peticion.params.id);
                const productos = producto.getById(id);
                if (productos) {
                  respuesta.json(productos);
                } else {
                  respuesta.status(404);
                  respuesta.json({ error : 'producto no encontrado' });
                }
              
              });


              rutaProductos.post('/', (peticion, respuesta) => {
                const productoNuevo = peticion.body;
               console.log(productoNuevo)
               producto.save(productoNuevo)
                respuesta.json('ok');
              });

           rutaProductos.put('/:id', (peticion,respuesta)=>{
            const cambio = peticion.body.cambio;
            console.log(cambio)
            const indice = parseInt(peticion.params.id) - 1;
            const array = producto.getall()
            array[indice]= cambio
            producto.cambio(array)
            respuesta.json('ok');
           })

           rutaProductos.delete('/:id', (peticion, respuesta) => {
            const id = parseInt(peticion.params.id);
            producto.deleteById(id)
            respuesta.json({
              status: "ok"
            });
          })

              aplicacion.use('/api/productos', rutaProductos);
    
    
  const server = aplicacion.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
 server.on("error", error => console.log(`Error en servidor ${error}`))

