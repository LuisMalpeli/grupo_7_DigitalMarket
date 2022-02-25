window.onload = function() {
    const form = document.querySelector("#formulario")
    const inputs = form.querySelectorAll('.datos')
    const imagen = form.querySelector('.avatar')
    const errores = []
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        inputs.forEach(elemento => {
            if (elemento.value == '') {
                switch (elemento.getAttribute('name')) {
                    case 'fullName':
                        errores.push(`El campo Nombre y apellido no puede estar vacio`)
                    break
                    case 'email':
                        errores.push(`El campo Email no puede estar vacio`)
                    break
                    case 'password':
                        errores.push(`El campo Contrasena no puede estar vacio`)
                    break
                }
                
            } else {
                if ((elemento.getAttribute('name') == 'fullName') && (elemento.value < 2)) {
                    errores.push('El campo Nombre y apellido debe tener mas de 2 caracteres')
                }
                if ((elemento.getAttribute('name') == 'password') && (elemento.value < 8)) {
                    errores.push('El campo Contrasena debe tener mas de 8 caracteres')
                }
            }
        })
        if ((imagen.value.includes('.jpg')) || (imagen.value.includes('.jpeg')) || (imagen.value.includes('.png')) || (imagen.value.includes('.gif'))) {
            errores.forEach(error => {
                document.querySelector('#area-errores').innerHTML += `<li>${error}</li>`
            })
        } else {
            errores.push('La imagen debe ser de un formato valido (JPG, JPEG, PNG, GIF)')
            errores.forEach(error => {
                document.querySelector('#area-errores').innerHTML += `<li>${error}</li>`
            })
        }
        
    })
}