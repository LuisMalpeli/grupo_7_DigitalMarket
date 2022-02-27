window.onload = function () {
    const form = document.querySelector('#formulario')
    const ul = document.querySelector('#area-errores')

    function validar(elemento) {   

        let li = ul.querySelector(`#${elemento.getAttribute('name')}`)
        const jpg_jpeg = new RegExp(/\.jpe?g/i)
        const png = new RegExp(/\.png/i)
        const gif = new RegExp(/\.gif/i)
       
        switch (elemento.getAttribute('name')) {
            case 'title':
                if (elemento.value == '') {
                    li.innerText = 'El campo Titulo no puede estar vacio'
                } else if (elemento.value.length < 5) {
                    li.innerText = 'El campo Titulo debe tener mas de 5 caracteres'
                } else {
                    li.innerText = ''
                }
            break
            case 'description':
                if (elemento.value == '') {
                    li.innerText = 'El campo Descripcion no puede estar vacio'
                } else if (elemento.value.length < 20) {
                    li.innerText = 'El campo Descripcion debe tener mas de 20 caracteres'
                } else {
                    li.innerText = ''
                }
            break
            case 'img':
                if ( !((jpg_jpeg.test(elemento.value)) || (gif.test(elemento.value)) || (png.test(elemento.value)))) {
                    li.innerText = 'La imagen debe ser de un formato valido (.jpg, .jpeg, .png, .gif)'
                } else {
                    li.innerText = ''
                }
            break
        }  6
    }

    form.addEventListener('change', () => {
        form.querySelectorAll('input').forEach(elemento => {
            validar(elemento)
        })
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        form.querySelectorAll('input').forEach(elemento => {
            validar(elemento)
        })
    })
}