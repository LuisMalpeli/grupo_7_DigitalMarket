window.onload = function() {
    

    const form = document.querySelector("#formulario")
    const ul = document.querySelector('#area-errores')
    const imagen = form.querySelector('.avatar')
    

    
    const errores = []   
    const camposConError = []

    const jpg_jpeg = new RegExp(/\.jpe?g/i)
    const png = new RegExp(/\.png/i)
    const gif = new RegExp(/\.gif/i)

    function validar (elemento){
 
        switch (elemento.getAttribute('name')) {
            
            case 'fullName':
                if (elemento.value == '') {
                    errores.push({fullName: 'El campo Nombre y apellido no puede estar vacio'})
                } else if (elemento.value.length < 2) {
                    errores.push({fullName: 'El campo Nombre y apellido debe tener mas de 2 caracteres'})
                }
                break
            case 'email':
                if (elemento.value == '') {
                    errores.push({email: 'El campo Email no puede estar vacio'})
                } else if (!elemento.value.includes('@')) { // false si no lo encontro
                    errores.push({email: 'El campo Email no es valido (falta @)'})
                }
                break
            case 'password':
                if (elemento.value == '') {
                    errores.push({password: 'El campo Contraseña no puede estar vacio'})
                } else if (elemento.value.length < 8) {
                    errores.push({password:'El campo Contraseña debe tener mas de 8 caracteres'})
                }
                break
            case 'avatar':
                if (elemento.value !== ''){
                    if ( !((jpg_jpeg.test(elemento.value)) || (gif.test(elemento.value)) || (png.test(elemento.value)))) {
                        errores.push({avatar:'La imagen debe ser de un formato valido (.jpg, .jpeg, .png, .gif)'})
                    }
                }
                break
        }
    }

     


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        errores.length = 0 //Resetea el array de errores
        form.querySelectorAll('input').forEach(elemento => {
            //La validación del input creará el array de errores
            validar(elemento)
        })

        if (errores.length > 0) {
            camposConError.length = 0; //inicia nuevamente los campos con error (camposConError almacena los nombres de los input que tienen error)
            //el forEach completa el array de campos con error según las keys de cada objeto en el array de errores
            errores.forEach(error => camposConError.push(Object.keys(error)[0])); //Cada posición del array contendrá solo 1 error
            //Object.keys(objeto) creará un array con las keys del objeto
            //esto arrojará un output del estilo [fullName, email, avatar, password]
            
            let inputFields = document.querySelectorAll('.user-input'); //toma el div donde se encuentran los inputs
            let campoConError = null
            
            inputFields.forEach(field =>{
                //Itera sobre los div con clase user-input para ver si en alguno de los inputs dentro hay errores
                nombreCampo = field.querySelector('input').name //Toma el nombre del input dentro del div evaluado
                
                //Busca si el input actual es parte del array con errores
                campoConError = camposConError.find(campo => campo == nombreCampo) 
                
                let parrafo = field.querySelector('p');
                if (campoConError) {
                    //si campoConError retorna con un valor distinto de undefined, quiere decir que el campo tiene errores
                    //msjError almacenará el mensaje del error que coincida con el campo que estamos mirando ahora
                    let msjError = errores.find(objetoError => Object.keys(objetoError)[0] == campoConError)[campoConError];
                    //Agrega un párrafo con error al final del div indicando el mensaje de error correspondiente
                    
                    if (parrafo !== null) {
                        parrafo.innerText = msjError
                    } else {
                        field.innerHTML += `<p class="errores">${msjError}</p>`
                    }
                } else {
                    if (parrafo !== null) {
                        parrafo.parentNode.removeChild(parrafo)
                    }
                }
            })


        } else {
            form.submit();
        }
        
    })
}