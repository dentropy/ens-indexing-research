import {
    Sequelize,
    Model,
    DataTypes,
    json
} from 'sequelize';

// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './test.db'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true


console.log(sequelize.models.User)
await User.sync({ force: true });
const jane = await User.create({
    firstName: 'jane',
    lastName: 'doe'
});
const john = await User.create({
    firstName: 'john',
    lastName: 'doe'
});
// console.log("Jane's auto-generated ID:", jane.id);
// await jane.save()