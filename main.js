

const fs = require('fs')


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

