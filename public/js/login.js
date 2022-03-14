window.onload = function() {

    const form = document.querySelector('#formulario');

    const errores = [];
    const camposConError = []

    function validar(elemento) {   

       
        switch (elemento.getAttribute('name')) {
            case 'email':
                if (elemento.value == '') {
                    errores.push({email:'El campo Email no puede estar vacio'})
                } else if (!elemento.value.includes('@')) { // false si no lo encontro
                    errores.push({email: 'El campo Email no es valido (falta @)'})
                }
            break
            case 'password':
                if (elemento.value == '') {
                    errores.push({password: 'El campo Contraseña no puede estar vacio'})
                }
            break
        }  

    }


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        form.querySelectorAll('input').forEach(elemento => {
            validar(elemento)
        })
        if (errores.length > 1) {
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