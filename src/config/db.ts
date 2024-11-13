import { Sequelize } from "sequelize"

const db = new Sequelize('postgresql://rest_api_node_typescript_lzbg_user:IB7nenKvEhrcXBefEzKhAm4CJ0N4PXzn@dpg-csqcdt9u0jms73dkouu0-a.oregon-postgres.render.com/rest_api_node_typescript_lzbg?ssl=true')

export default db