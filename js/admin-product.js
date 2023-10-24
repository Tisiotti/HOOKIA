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

let idEdit;
let modalTitle = document.getElementById("coffeModalLabel");
let isEditing = false;
const btnSubmit = document.querySelector('button.btn[type="submit"]')
const tableBodyHTML = document.querySelector("table-body")
const inputFilterProduct = document.getElementById("search-product")
const formNewProduct = document.getElementById("formProduct")
const selectCategory = document.getElementById("CategoryProducts");


pintarProductos(ropa);

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

const editarProducto = function (idRecibido) {

    console.log(`Editar elemento ${idRecibido}`)

    const productoEditar = ropa.find((prod) => {
        if (prod.id === idRecibido) {
            return true
        }
    })

    // Resguardo si find no encontro nada = undefined
    if (!productoEditar) return;

    idEditar = productoEditar.id

    // Deberíamos rellenar nuestro formulario con los datos del elemento a editar
    const elements = formularioProductoHTML.elements;

    elements.tituloName.value = productoEditar.titulo;
    elements.precio.value = productoEditar.precio;
    elements.descripcion.value = productoEditar.descripcion;
    elements.imagen.value = productoEditar.imagen;
    elements.categoria.value = productoEditar.categoria;
    // Modificar el botón de agregar con uno de editar
    // Luego reemplazar el producto anterior con los datos nuevos


    btn.innerText = "Editar Producto"
    btn.classList.add("btn-success")

}