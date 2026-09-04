import sequelize from '../config/db-config.js';
import { DataTypes } from 'sequelize';

const Lab = sequelize.define('labs', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  institution_id: {
    type: DataTypes.UUID,
    references: {
      model: 'institutions',
      key: 'id'
    },
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, { timestamps: true });

export default Lab;