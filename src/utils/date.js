
const date_to_string = (date)=>{
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const get_day_start = (day_ago)=>{
  var datetime = new Date()
  datetime.setTime(datetime.getTime() - 3600 * 1000 * 24 * day_ago)
  return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), 0, 0, 0)
}


const get_day_end = (day_ago)=>{
  var datetime = new Date()
  datetime.setTime(datetime.getTime() - 3600 * 1000 * 24 * day_ago)
  return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), 23, 59, 59)
}


export default {
  date_to_string,
  get_day_start,
  get_day_end
}
