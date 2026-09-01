import sequelize from "./db-config.js";

const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log(`Database connected successfully`);
        await sequelize.sync({alter: true});
        console.log('Models synchronized successfully');
    } catch (error) {
        console.error(`Error with tesing the connection to the Database ${error}`);
        return null;
    }
};

export default connectDB;