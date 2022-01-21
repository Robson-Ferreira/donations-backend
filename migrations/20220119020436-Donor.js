module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('donations', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            donor_id: Sequelize.STRING,
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            gender: Sequelize.STRING,
            address: Sequelize.STRING,
            amount: Sequelize.DOUBLE,
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },
    
    down: async (queryInterface) => {
        await queryInterface.dropTable('donations');
    },
}
