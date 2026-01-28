
export function convertedminInHours(min: number) {
    const hour = min / 60
    const hoursreal = hour.toFixed(2)
    
  

    function sepateHoursInMin(hoursreal: number){
      const hours = Math.floor(hoursreal)
      const min = (hoursreal - hours) * 60
      if (min === 0) {
        return `${hours} hora`
      }
      if (hours === 0) {
        return `${min} minutos`
      }

      return `${hours}h ${min.toFixed(0)}min`
      
    }
    
   
    

    return sepateHoursInMin(hour)

  
}