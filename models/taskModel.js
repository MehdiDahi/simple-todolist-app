// Défini le schema
const { Schema, model } = require('mongoose');

const TasksSchema = new Schema(
    {
        titre: { type: String, required: [true, "Le champ Titre est requis et doit être une chaîne de caractères"], },
        terminee: { type: Boolean, default: false},
    },
    {
        timestamps: true
     }
);

const Task = new model("task", TasksSchema);

module.exports = Task ;
