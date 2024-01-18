import { Schema, model, models } from "mongoose";
import { ITask } from "./task.interface";

const TaskSchema: Schema = new Schema<ITask>({
  task: {
    type: String,
    required: [true, "Name is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const Task = models.Task || model<ITask>("Task", TaskSchema);

export default Task;
