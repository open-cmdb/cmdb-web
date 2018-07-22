
const page_size = (line_height, other_height, mini=8) => {
  var page_size = Math.floor((window.innerHeight - other_height) / line_height)
  return page_size > mini ? page_size:mini
}


export default {
  page_size
}
