window.onload = function() {
    const form = document.querySelector("#formulario")
    const ul = document.querySelector('#area-errores')
    const imagen = form.querySelector('.avatar')
    

    function validar(elemento) {   
 
        const jpg_jpeg = new RegExp(/\.jpe?g/i)
        const png = new RegExp(/\.png/i)
        const gif = new RegExp(/\.gif/i)
    }
        let li = ul.querySelector(`#${elemento.getAttribute('name')}`)
       
        switch (elemento.getAttribute('name')) {
            case 'fullName':
                if (elemento.value == '') {
                    li.innerText = 'El campo Nombre y apellido no puede estar vacio'
                } else if (elemento.value.length < 2) {
                    li.innerText = 'El campo Nombre y apellido debe tener mas de 2 caracteres'
                } else {
                    li.innerText = ''
                }
            break
            case 'email':
                if (elemento.value == '') {
                    li.innerText = 'El campo Email no puede estar vacio'
                } else if (!elemento.value.includes('@')) { // false si no lo encontro
                    li.innerText = 'El campo Email no es valido (falta @)'
                } else {
                    li.innerText = ''
                }
            break
            case 'password':
                if (elemento.value == '') {
                    li.innerText = 'El campo Contrasena no puede estar vacio'
                } else if (elemento.value.length < 8) {
                    li.innerText = 'El campo Contrasena debe tener mas de 8 caracteres'
                } else {
                    li.innerText = ''
                }
            break
        }  

        if (elemento.getAttribute('name') == 'avatar') {
            if ( !((jpg_jpeg.test(elemento.value)) || (gif.test(elemento.value)) || (png.test(elemento.value)))) {
                li.innerText = 'La imagen debe ser de un formato valido (.jpg, .jpeg, .png, .gif)'
            } else {
                li.innerText = ''
            }
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