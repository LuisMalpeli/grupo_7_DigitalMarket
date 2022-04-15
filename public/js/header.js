window.onload = function() { //evento onload (dónde? Cuándo? y función)...se usa para ejecutar una función de JavaScript tan pronto como una página haya cargado.(eventos que accede el usuario?)
    // queremos que ejecute el evento en toda la ventana(window) y cuando se cargue(onload), qué quiero que haga nuestro código = function(){}
//Menu header
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    const menu = document.querySelector('.user-adap');
    const menuJs = document.querySelector('.menu-js');

    //const darkMode = document.querySelector('.dark-mode')

    // menu adaptativo
    
    menu.addEventListener('click', (e) => {
        e.preventDefault()
        menuJs.classList.toggle('mostrar-menu') //toggle: cambia un estilo a otro???
    });
    menuJs.addEventListener('mouseleave', (e)=> {  //'mouseleave'???
        menuJs.classList.remove('mostrar-menu')
    });

    /*modo oscuro
    let dmCheck = document.querySelector('.dark-mode i')
    darkMode.addEventListener('click', ()=> {
        dmCheck.classList.toggle('fa-square')
        dmCheck.classList.toggle('fa-check-square')

        if (dmCheck.classList[1] == 'fa-check-square') {
            main.style.backgroundColor = '#222222'
            footer.style.backgroundColor = '#070717' 
        } else {
            main.style.backgroundColor = 'var(--color-gris)'
            footer.style.backgroundColor = 'var(--color-azul)' 
        }
    })*/
    
};

