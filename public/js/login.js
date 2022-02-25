window.onload = function() {

    const form = document.querySelector('#formulario')
    const email = form.querySelector('#email')
    const password = form.querySelector('#password')
    const boton = form.querySelector('.button-user')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (email.value == '') {
            // campo vacios
            let labelEmail = form.querySelector('#label-email p')
            labelEmail.innerText = ' * Campo Obligatorio' 
            labelEmail.style.display = 'flex'
            email.style.border = '1px solid red'
        } else if (email.value.indexOf('@') < 0) {
            // email valido
            let labelEmail = form.querySelector('#label-email p')
            labelEmail.innerText = ' * El email no es valido' 
            labelEmail.style.display = 'flex'
            email.style.border = '1px solid red'
        }

        if (password.value == '') {
            // campo vacios
            let labelPassword = form.querySelector('#label-password p')
            labelPassword.innerText = ' * Campo Obligatorio' 
            labelPassword.style.display = 'flex'
            password.style.border = '1px solid red'
        }
        //else {
            // password con a-z A-Z 0-9
        //}


    })
    
}