
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



 const express = require("express");
 const aplicacion = express();
 const  handlebars = require("express-handlebars")
 const PORT = 8080
 

 
 const bodyParser = require("body-parser");

 aplicacion.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}));
 
 aplicacion.use(bodyParser.json({ limit: "50mb"}));
 
//Motor de plantilla handlebars

aplicacion.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout:"index.hbs",
layoutsDir:__dirname +"/views"
}))
 

aplicacion.set('view engine', 'hbs'); 
aplicacion.set('views', './views'); 

aplicacion.post('/productos', (peticion,respuesta) => {
    const productoNuevo = peticion.body;
               console.log("productoNuevo",productoNuevo)
               producto.save(productoNuevo)
                respuesta.render("formulario",{});
})

aplicacion.get("/productos", (peticion,respuesta)=>{
  const  productos = producto.getall()
    respuesta.render("main",{
        productos: productos,
        productosCargados: productos.length                     
    })
})
 
aplicacion.get('/', (peticion, respuesta) => {
  respuesta.render("formulario", {
  });
})
 aplicacion.use(express.json());
 aplicacion.use(express.urlencoded({ extended: true }));

 



    
    
  const server = aplicacion.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
 server.on("error", error => console.log(`Error en servidor ${error}`))

