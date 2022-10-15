class Usuario {
    constructor(nombre, apellido, libro, mascotas)
    {
this.nombre= nombre
this.apellido= apellido
this.libro= libro 
this.mascotas= mascotas 
   }

   getFullName(){
    return `${this.nombre} ${this.apellido}`
   }
  
   addMascota(mascota){
    this.mascotas.push(mascota)
   }

   countMascotas(){
    return this.mascotas.length
   }

   addBook(nombre,autor){ 
    const libroCreado = {
        nombre: nombre,
        autor: autor
    }
    
    this.libro.push(libroCreado)
   }

   getBookNames(){
    const nombresLibros =  this.libro.map((el) => el.nombre)
    return nombresLibros
   
   }

}
let objeto={
    nombre:"Fundación",
    autor: "Isaac Asimov"
}
const usuario1 = new Usuario("Don","pepito", [], [])
usuario1.addMascota("perro")
usuario1.addMascota("gato")
usuario1.addMascota("pez")

usuario1.addBook("El señor de las moscas","William Golding")



console.log(usuario1.getFullName())
console.log(usuario1.countMascotas())
console.log(usuario1.getBookNames())
console.log(usuario1)
