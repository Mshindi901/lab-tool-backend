import { Sequelize } from "sequelize";

const sequelize = new Sequelize('tool', 'postgres', 'yugah2005@', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;