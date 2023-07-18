const emptyValidation = ([nombre,propietario,email,fecha,sintomas]) => {
  return [nombre,propietario,email,fecha,sintomas].includes('')

}

export {emptyValidation} 