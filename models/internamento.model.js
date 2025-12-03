const { DataTypes } = require("sequelize");
const sequelize = require("..config/database");
const Internamento = sequelize.define("Internamento", {
    id_internamento: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nome_paciente: {
        type: DataTypes.STRING,
        allowNull: false
        },
    quarto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_entrada: {
        type: DataTypes.DATE,
        allowNull: false
    }
});
module.exports = Internamento;