const convertName = (name) => {
    let resultName = ''
    if (name) {
        if (name.match(/\d/)) {
            resultName = [...name].reverse().join('')
        } else {
            resultName = [...name].map((character) => {
                return character.match(character.toLowerCase()) ? character.toUpperCase() : character.toLowerCase()
            }).join('')
        }
    }
    return resultName
}

document.getElementById('name').innerHTML = convertName(prompt('Fill name into the field:', 'Siarhei Finkevich'))