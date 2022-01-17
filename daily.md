
Resumen de tareas completadas:

Retrospectiva => realizado.
Daily => realizado.
tablero Trello actualizado => realizado.
Motor templates con sus respectivos archivos .ejs => realizado.
Separacion de vistas "products y users" con sus respectivos archivos extensión .ejs (opcional) => realizado.
Separación de componentes repetitivos head, header, footer => realizado.
Formulario de registro y login => ...
Página formulario de creación y edición de productos en formato .ejs con estilos e imágenes => ...

Daily 6/12 :
    CRUD de productos
    Merge de css repetidos
    arreglo de estilos en paginas ya hechas

Daily 13/12
    Revision de la entrega del sprint 4

27/12 - RETRO DEL SPRINT 5
    Vistas:
        •    Creada la vista de success ante la registración
        •    Creada la vista de perfil de usuario  Dummie
        •    Modificado el header para mostrar as opciones de login/register solo si el usuario no está logueado.
        o    Si está logueado muestra la información del usuario junto con las opciones:
            "Mi Cuenta"
            "Logout"
        •    login.ejs: Cambiado el checkbox a "Recordar usuario"
        o    renombrado a "recordarme"
        •    register.ejs:
        o    Agregada la función de recordar los campos completados en caso de no tener error
        o    Cambiado el formato de las cajas para que se muestren en rojo si hay errores (más llamativo)
        o    Cambio en los párrafos para que aparezcan de forma variable. Si no hay errores ni siquiera ocupan   espacio en la pantalla (habría que ajustar el css que los tenía invisibles)
        o    El formulario deja almacenada la información anterior en caso de error en los formularios
            No pude hacer que guarde la selección del género

    Controller de Usuarios:
        •    Agregada la creación de una cookie que guarda el mail del usuario (si el mismo indicó que quiere ser recordado)
        •    Agregado el almacenamiento en session del usuario recién logueado
        •    Agregada funcionalidad de logout:
        o    Limpia la cookie de “recordarme”
        o    Limpia la session

    Middlewares:
        •    Creado Middlware de Guest para evitar que un usuario logueado acceda a los formularios de login y register
        •    Creado middleware que valida si hay cookie de login creada
        •    Multer:
        •    Agregada variabilidad en el path. Las imagenes se estaban routeando todas a productos, armé un if que si la imagen es un avatar, la guarde en usuarios

7/12
    problemas con productDetail - no se veia bien en movil
    correccion a los precios y descuentos en index y productDetail

8/12 - 9/12
    vistas adaptativas
    hecho el middleware validator-product
    finaliza precios y descuentos en 'todos los productos' e 'index'

10/12
    revisado barra de busqueda con @media menor a 450px
    terminado 'perfil'

falta
    revisar icono de descuento en index y en todos los productos
    revisar error* -> sacar validator del editSend
    validator product edit 

    *REVISAR PRODUCT EDIT -> sacar validator del editSend 

        ReferenceError: C:\Users\malpe\Desktop\Proyectos\DigitalHouse\integrador2\src\views\products\productEdit.ejs:14
            12|             </h3>

            13|             <div class="info-register">

        >> 14|                 <form action="/products/<%= productos.id %>?_method=PUT" method="POST" enctype="multipart/form-data">

            15|                     <span>Nombre del producto:</span> 

            16|                     <br>

            17|                     <input type="text" name= "titulo" class="nombre-producto" value="<%= productos.titulo %>">

    productos is not defined

    -> no le llega el objeto producto cuando el validator encuentra un error en el if del controller

falta 
    revisar error create no crea
    revisar header y poner a user en vez de menu en el index @media (width < px)
    nav bar

cosas para hablar
    busqueda por categorias
    