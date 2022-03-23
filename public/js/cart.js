window.onload = function() {
    //Este script no está vinculado con la vista del carrito por ahora
    //Construye la lista de todos los items que hay en el carrito (a través de los iconos de menos)
    const cartIcon = document.querySelectorAll('.no-link');
    cartIcon.forEach(icon => {
        //Para cada item, escucha el click, y previene el href de ejecutarse
        icon.addEventListener('click' , (e) => {
            e.preventDefault()
            //El valor almacenado en el icono es el id de la línea del carrito que está en la BBDD
            let valor = icon.getAttribute('value')
            //Aquí se debería eliminar el producto de la BBDD en base a su id (y resumir el href en el then)
            console.log(valor)
            //Vuelve a cargar el href (que solo está puesto para refrescar la página)
            window.location.href = icon
        })
    })
};
