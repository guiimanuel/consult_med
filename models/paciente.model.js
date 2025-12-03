const { DataTypes } = require("sequelize");
const sequelize = require("..config/database");

const Paciente = sequelize.define("Paciente", {
    id_paciente: {
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
    cpf: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Paciente;