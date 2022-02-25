window.onload = function () {
    const form = document.querySelector('#formulario')
    const title = form.querySelector('input[name="title"]')
    const description = form.querySelector('textarea[name="description"]')
    const imagen = form.querySelector('.img')
    const errores = []
    var boolean = true

    form.addEventListener('submit', (e) => {
        
        if (title.value == '') {
            errores.push('El campo Titulo no puede estar vacios')
        } else {
            if (title.value < 5) {
                errores.push('El campo titulo debe tener mas de 5 caracteres')
            }
        }
        if (description.value < 20) {
            errores.push('El campo descripcion debe tener mas de 20 caracteres')
        }
        if ((imagen.value.includes('.jpg')) || (imagen.value.includes('.jpeg')) || (imagen.value.includes('.png')) || (imagen.value.includes('.gif'))) {
            errores.forEach(error => {
                document.querySelector('#area-errores').innerHTML += `<li style="color:red;">${error}</li>`
            })
        } else if (boolean) {
            boolean = false
            errores.push('La imagen debe ser de un formato valido (JPG, JPEG, PNG, GIF)')
            errores.forEach(error => {
                document.querySelector('#area-errores').innerHTML += `<li style="color:red;">${error}</li>`
            })
        }
        e.preventDefault()
    })
}