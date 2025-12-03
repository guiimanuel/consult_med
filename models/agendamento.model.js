const { DataTypes } = require("sequelize");
const sequelize = require("..config/database");
const Agendamento = sequelize.define("Agendamento", {
    id_agendamento: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nome_paciente: {
        type: DataTypes.STRING,
        allowNull: false
        },
    hora_inicio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    especializacao: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Agendamento;