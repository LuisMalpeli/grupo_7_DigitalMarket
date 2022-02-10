window.onload = function() {
//Menu header
    const body = document.querySelector('body')
    const header = document.querySelector('header')
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')

    const menu = document.querySelector('.user-adap')
    const menuJs = document.querySelector('.menu-js')

    const darkMode = document.querySelector('.dark-mode')

    menu.addEventListener('click', (e) => {
        e.preventDefault()
        menuJs.classList.toggle('mostrar-menu')
    })
    menuJs.addEventListener('mouseleave', (e)=> {
        menuJs.classList.remove('mostrar-menu')
    })

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
    })
}