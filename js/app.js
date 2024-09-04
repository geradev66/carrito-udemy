// los numeros que comenté arriba de cada función es el orden de creación

// variables 
const carrito = document.querySelector('#carrito') // el padre de las etiquetas
const contenedorCarrito = document.querySelector('#lista-carrito tbody') // se va a agregar los elementos del carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito') // se vacian los elementos del carrito
const listaCursos = document.querySelector('#lista-cursos') // las cards con el curso
let articulosCarrito =[]



// 1

//cargas los listeners 
cargarEvnetListeners()
// Cuando agregas un curso presionando "Agregar al curso"
function cargarEvnetListeners(){
    listaCursos.addEventListener('click', agregarCurso) // se ejecuta la función agregar curso

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = [] //Reseteamos el arreglo

        limpiarHTML() //Eliminamos todo el html
    })

}


// 2
//funciones 
function agregarCurso(e){
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement // se hizo trasversing al padre 2 veces para seleccionar card
     leerDatosCurso(cursoSeleccionado)
    }
}


// 6
// Elimina el curso del carrito 

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del arreglo de articulosCariito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML() // iterar sobre carrito y mostrar su html
    }
    
}


// 3

//Lee el contenido del html al que le dimos click y extrae la información del curso

function leerDatosCurso(curso){
    console.log(curso)

    //Crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    
    //Revisa sin un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id) 
    if(existe) {
    
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso //returna el objeto acutliazado
    
            }else{
                return curso //retorna los objetos que no son duplicados
            }
        })
    
        articulosCarrito=[...cursos] //creamos copia de los cursos
        
    }else{
        //agrega elementos al arreglo del carrito 
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    console.log(articulosCarrito)

    carritoHTML() //invocamos funcion 



}



//4

//Muestra el carrito de comprar en el html 
function carritoHTML(){

    //Limpiar el html
    limpiarHTML()

    //Recorre el carrito y genera el html
    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso //desctructuring
        const row = document.createElement('tr')
        row.innerHTML = `

        <td><img src= "${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `
        //data-id hace referencia al atributo data-id que está en html

        //agrega el html del carrito al tbody
        contenedorCarrito.appendChild(row)
    })

}



//5
//Eliminar los curso del tbody repetidos

function limpiarHTML(){
    //forma lenta de limpiar html
    // contenedorCarrito.innerHTML = ''


    //Mientras haya un hijo esta codición se cumple
    while(contenedorCarrito.firstChild) {
        //la etiqueta padre va eliminar el hijo 
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)


    }
}




