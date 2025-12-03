const { DataTypes } = require("sequelize");
const sequelize = require("..config/database");
const Cirurgia = sequelize.define("Cirurgia", {
    id_cirurgia: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nome_paciente: {
        type: DataTypes.STRING,
        allowNull: false
        },
    tipo_cirurgia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_cirurgia: {
        type: DataTypes.DATE,
        allowNull: false
    }
});
module.exports = Cirurgia;