

import dev from "./dev"
import pro from "./pro"

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)

const export_config = Object.assign({}, dev,process.env.NODE_ENV === "production" ? pro : {})

export default export_config
