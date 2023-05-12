import React from 'react'

export const Generator = () => {
    var pass:string  = '',
    str = 'ABCDEFGHIJKMNOPQRSTUVWXYZ' + 
    'Abcdefghijkmnopqrstuvwxyz1234567819@#$'

    for (let index =1; index < 8; index++) {
      var char = Math.floor(Math.random() * str.length +1 )
      pass +=str.charAt(char)
    }
    return pass
}
