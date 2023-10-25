const users =JSON.parse(localStorage.getItem("users")) || usersFirtsCharge

if( JSON.parse(localStorage.getItem("users")) === null){
    localStorage.setItem("users",JSON.stringify(usersFirtsCharge))
}


function cargarUsuarios(users) {
    const tableBody = document.getElementById('table-body-users');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = `
            <tr class="text-center | letter-spacing">
                <td class="text-start">${user.fullname}</td>
                <td class="text-start">${user.email}</td>
                <td class="text-start">${user.role}</td>
                <td>
                    <button type="button" class="btn btn-outline-danger" onclick="deleteUser('${user.id}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function deleteUser(id) {
    const indexToDelete = users.findIndex(item => item.id === id);

    if (indexToDelete !== -1) {
        Swal.fire({
            title: 'Estas seguro?',
            text: 'No podras recuperar este usuario',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'No, conservarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                users.splice(indexToDelete, 1);
                cargarUsuarios(users);
                Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'User is safe :)',
                    'error'
                );
            }
        });
    }
}

cargarUsuarios(users);