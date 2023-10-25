let ropaPrimerInicio = [
    {
        id: "11282585-4499-4d37-8999-f78ac250ddc3",
        titulo: "Remera RB Green Petrol",
        imagen: "https://res.cloudinary.com/da1ts29rz/image/upload/v1698168921/Hookia%20card%20images/z66gh8k88lwmewiedi94.png",
        descripcion: "Remera de algodón con estampado en serigrafía",
        precio: 12899,
        fechaEntrada: "2023-09-01",
        categoria: "Remeras"
    },
    {
        id: "11282585-4499-4d37-8999-f78ac250ddc3",
        titulo: "Buzo RB Grink",
        imagen: "https://res.cloudinary.com/da1ts29rz/image/upload/v1698168921/Hookia%20card%20images/vvs3lurboikjzlmqcsrp.png",
        descripcion: "Buzo polar con estampado en serigrafía y bordado",
        precio: 19900,
        fechaEntrada: "2023-09-01",
        categoria: "Buzos"
    },
    {
        id: "11282585-4499-4d37-8999-f78ac250ddc3",
        titulo: "Remera RB RealPigeon",
        imagen: "https://res.cloudinary.com/da1ts29rz/image/upload/v1698168921/Hookia%20card%20images/bsweoqzrz4cbeyfkxjtz.png",
        descripcion: "Remera de tela con estampado en serigrafía DTF",
        precio: 12899,
        fechaEntrada: "2023-09-01",
        categoria: "Remeras"
    },
    {
        id: "11282585-4499-4d37-8999-f78ac250ddc3",
        titulo: "Hoodie SpideRB",
        imagen: "https://res.cloudinary.com/da1ts29rz/image/upload/v1698168921/Hookia%20card%20images/mg3xasfmmzjydnnn5muj.png",
        descripcion: "Hoodie de algodón con estampado en serigrafía",
        precio: 19900,
        fechaEntrada: "2023-09-01",
        categoria: "Buzos"
    },
];


let ropa = JSON.parse(localStorage.getItem("rop")) || ropaPrimerInicio
if (JSON.parse(localStorage.getItem("rop")) === null) {
    localStorage.setItem("rop", JSON.stringify(ropa))
}

let idEditar;
const btn = document.querySelector('button#btnn[type="submit"]')
const tableBodyHTML = document.querySelector("#table-body")




const inputFiltrarHTML = document.getElementById("filtrar")

const formularioProductoHTML = document.getElementById("formularioProducto")


// AÑADIR PRODUCTOS CON EL FORMULARIO de HTML 

formularioProductoHTML.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const titulo = document.getElementById("tituloProducto").value
    const imagen = document.getElementById("imagen").value
    const descripcion = document.getElementById("descripcionProducto").value
    const precio = document.getElementById("precioProducto").value
    const fechaEntrada = document.getElementById("fechaEntrada").value
    const categoria = document.getElementById("categoriaProducto").value

    const nuevoProducto = {
        titulo: titulo,
        imagen: imagen,
        descripcion: descripcion,
        precio: precio,
        fechaEntrada: fechaEntrada,
        categoria: categoria
    }

    if (idEditar) {
        const indiceEncontrado = ropa.findIndex((productoFindIndex) => {
            if (productoFindIndex.id === idEditar) {
                return true
            }
            return false
        })
        ropa[indiceEncontrado] = nuevoProducto
        idEditar = undefined
        btn.innerHTML = "Añadir producto"
    } else {
        ropa.push(nuevoProducto)
    }

    pintarProductos(ropa)

    localStorage.setItem("rop", JSON.stringify(ropa))


    btn.innerHTML = "Añadir producto"
    formularioProductoHTML.reset()
    formularioProductoHTML.classList.remove("was-validated")
    pintarProductos(ropa)
}) 






// - PINTAR PRODUCTOS

function pintarProductos(arrayAPintar) {

    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function (rop, index) {
        tableBodyHTML.innerHTML +=
            `<tr>
                <td class="table-image">
                        <img src="${rop.imagen}" alt="${rop.titulo}">
                </td>
                <td class="table-title">${rop.titulo}</td>
                <td class="table-description">${rop.descripcion}</td>
                <td class="table-price">${rop.precio}</td>
                <td class="table-category">${rop.categoria}</td>
                <td class="table-dateEntry">${rop.fechaEntrada}</td>
                <td >
                    <div class="d-flex gap-1">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${rop.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarProducto('${rop.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </td>
            </tr>`
    })
}

pintarProductos(ropa)

// FILTRAR PRODUCTOS
inputFiltrarHTML.addEventListener('keyup', (evt) => {

    const busqueda = evt.target.value.toLowerCase();

    const resultado = ropa.filter((producto) => {
        //Iterar cada producto
        const titulo = producto.titulo.toLowerCase()
        //Vamor a mirar si la busqueda coincide con el titulo
        if (titulo.includes(busqueda)) {
            return true
        }
        return false
    })
    pintarProductos(resultado)

})


// - BORRAR PRODUCTOS

const borrarProducto = (idABuscar) => {
    Swal.fire({
        title: 'Desea borrar producto',
        icon: 'error',
        text: 'Realmente desea elminar el producto?',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Borrar',
    }).then((result) => {

        if (result.isConfirmed) {
            const indiceEncontrado = ropa.findIndex((productoFindIndex) => {
                if (productoFindIndex.id === idABuscar) {
                    return true
                }
                return false
            })
            ropa.splice(indiceEncontrado, 1);

            pintarProductos(ropa)

            localStorage.setItem("rop", JSON.stringify(ropa))


            Swal.fire('Borrado!', 'Producto borrado correctamente', 'success')
        }
    })
}


// - EDITAR PRODUCTOS

