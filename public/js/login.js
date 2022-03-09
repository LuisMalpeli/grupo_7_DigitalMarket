window.onload = function() {

    const form = document.querySelector('#formulario')
    const ul = document.querySelector('#area-errores')

    /* function validar(elemento) {   

        let li = ul.querySelector(`#${elemento.getAttribute('name')}`)
       
        switch (elemento.getAttribute('name')) {
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
                } else {
                    li.innerText = ''
                }
            break
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
    }) */
}