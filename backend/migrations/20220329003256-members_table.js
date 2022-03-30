module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('members', {
      member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primary: true,
        unique: true,
      },

      club_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: 'PENDING',
        values: ['PENDING', 'ACCEPTED'],
      },

      creator_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      first_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      last_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      role: {
        type: Sequelize.STRING,
        defaultValue: 'Member',
        allowNull: false,
      },

      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },

      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: true,
        allowNull: false,
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('members');
  },
};
