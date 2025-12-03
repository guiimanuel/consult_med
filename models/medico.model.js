const { DataTypes } = require("sequelize");
const sequelize = require("..config/database");
const Medico = sequelize.define("Medico", {
    id_medico: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
        },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    especializacao: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Medico;