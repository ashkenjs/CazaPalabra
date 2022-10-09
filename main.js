let resultElement = document.querySelector('.result')
let mainContainer = document.querySelector('.main-container')
let rowId = 1
let word = 'texto'
let wordArray = word.toUpperCase().split('')
let actualRow = document.querySelector('.row')


drawSquares(actualRow)
listenInput(actualRow)

addFocus(actualRow)






//FUNCIONES

function listenInput(actualRow) {
    let squares = actualRow.querySelectorAll('.square')
    squares = [...squares]

    let userInput = []

    squares.forEach(element =>{
        element.addEventListener('input', event => {
        //Recoger el ingreso del usuario
            userInput.push(event.target.value.toUpperCase())
            console.log(userInput)
            if (event.target.nextElementSibling){
            event.target.nextElementSibling.focus()
            }else {
            //Comparar arreglos para cambiar estilos a la letra correcta
            let letraCorrecta = compareArrays(wordArray, userInput)
            console.log(letraCorrecta)
            letraCorrecta.forEach(element => {
                squares[element].classList.add('green')
            })
            // Si los arreglos son iguales todos
            if (letraCorrecta.length == wordArray.length){
                showResult('Ganaste!!')

                return
            }
            //Cambiar estilos si existe la letra en otra ubicación
            let existIndexArray = existLetter(wordArray, userInput)
            existIndexArray.forEach(element => {
                squares[element].classList.add('gold')
            })
            //creando una nueva fila
            let actualRow = createRow()
            drawSquares(actualRow)
            listenInput(actualRow)
            addFocus(actualRow)


            //let btnReset = document.querySelector('.button')
            //btnReset.addEventListener('click', () => {
            //location.reload()
            //})

            //Nueva fila de letras

        }
        
    })
})
}


function compareArrays(array1, array2){
    let iqualsIndex = []
    array1.forEach((element, index) =>{
        if (element == array2[index]) {
            console.log(`En la posición ${index} si son iguales`)
            iqualsIndex.push(index)
        }else {
            console.log(`En la posición ${index} No son iguales`)
        }
    })
    return iqualsIndex
}

function existLetter(array1, array2) {
    let existIndexArray = []
    array2.forEach((element, index) => {
        
        if (array1.includes(element)) {
            existIndexArray.push(index)
        }
    })
    return existIndexArray
}

function drawSquares(actualRow){
    wordArray.forEach((item, index) => {
        if (index === 0){
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`
        }else {
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`
        }
        
    })
}

function createRow(){
    rowId++
    if (rowId<= 5 ){
        let newRow = document.createElement('div')
        newRow.classList.add('row')
        newRow.setAttribute('id', rowId)
        mainContainer.appendChild(newRow)
        return newRow
    }else{
        showResult('Perdiste!! Inicia una nueva partida.')
    }

}

function addFocus(actualRow) {
    let focusElement = actualRow.querySelector('.focus')
    focusElement.focus()
}

function showResult(textMsg) {
    resultElement.innerHTML = 
        `<p>${textMsg}</p>
        <button class="button">Reiniciar</button>`
    
    let btnReset = document.querySelector('.button')
    btnReset.addEventListener('click', () => {
    location.reload()
})
} 