const mongoose = require("mongoose");

const subtast = mongoose.Schema({
    isComplete: { type: Boolean, default: false },
    title: { type: String, required: true } // Fix the typo here: 'require' should be 'required'
});

const taskSchema = mongoose.Schema({
  tasks: [{
    isComplete: { type: Boolean, default: false },
    name: { type: String, required: true }
}]
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
    TaskModel
};
