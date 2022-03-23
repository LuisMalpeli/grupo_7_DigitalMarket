window.onload = function () {
    const form = document.querySelector('#formulario');

    const errores = [];
    const camposConError = [];

    function validar(elemento) {  
        const jpg_jpeg = new RegExp(/\.jpe?g/i)
        const png = new RegExp(/\.png/i)
        const gif = new RegExp(/\.gif/i)
        switch (elemento.getAttribute('name')) {
            case 'title':
                if (elemento.value == '') {
                    errores.push({title:'El campo Nombre no puede estar vacio'})
                } else if (elemento.value.length < 5) {
                    errores.push({title:'El campo Nombre debe tener mas de 5 caracteres'})
                } 
            break
            case 'description':
                if (elemento.value == '') {
                    errores.push({ description:'El campo Descripcion no puede estar vacio' })
                } else if (elemento.value.length < 20) {
                    errores.push({ description: 'El campo Descripcion debe tener mas de 20 caracteres' })
                }
            break
            case 'img':
                if (elemento.value !== ''){
                    if ( !((jpg_jpeg.test(elemento.value)) || (gif.test(elemento.value)) || (png.test(elemento.value)))) {
                        errores.push({ img:'La imagen debe ser de un formato valido (.jpg, .jpeg, .png, .gif)' })
                    }
                }
            break
            case 'price':
                if (elemento.value == '') {
                    errores.push({ price:'El campo Precio no puede estar vacio' })
                }
            break
        }
    }



    form.addEventListener('submit', (e) => {
        e.preventDefault()
        errores.length = 0 //Resetea el array de errores
        form.querySelectorAll('input').forEach(elemento => {
            validar(elemento)
        })
        //Valida el campo de textarea también
        if (form.querySelector('textarea') != null){
            validar(form.querySelector('textarea'))
        }

        if (errores.length > 0) {      
            camposConError.length = 0; //inicia nuevamente los campos con error (camposConError almacena los nombres de los input que tienen error)
            //el forEach completa el array de campos con error según las keys de cada objeto en el array de errores
            errores.forEach(error => camposConError.push(Object.keys(error)[0])); //Cada posición del array contendrá solo 1 error
            //Object.keys(objeto) creará un array con las keys del objeto
            
            let inputFields = document.querySelectorAll('.user-input'); //toma el div donde se encuentran los inputs
            let campoConError = null
            
            inputFields.forEach(field =>{
                //console.log(field.querySelector('input').name)
                //Itera sobre los div con clase user-input para ver si en alguno de los inputs dentro hay errores
                if (field.querySelector('input') == null) {
                    //Esto captura los elementos que NO SON INPUTS, por ejemplo el textarea
                    if (field.querySelector('textarea') !== null){
                        //Dentro de los NO INPUTs, esto capturará el textarea para poder validarlo también
                        nombreCampo = field.querySelector('textarea').name
                    } else {
                        //Si no es ni input ni textarea, se asigna null
                        nombreCampo = null
                    }

                } else {
                    nombreCampo = field.querySelector('input').name //Toma el nombre del input dentro del div evaluado
                }
                
                
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
};