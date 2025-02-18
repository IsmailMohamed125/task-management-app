import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { useCallback } from "react";

const TaskColumn = ({ id, title, tasks, onArchiveTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: id, // This should match the column name ('To Do', 'In Progress', etc.)
  });

  // Memoize the handleArchive function
  const handleArchive = useCallback(
    (taskId) => {
      onArchiveTask(taskId);
    },
    [onArchiveTask]
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-4">
        {title} ({tasks.length})
      </h3>
      <div ref={setNodeRef} className="space-y-2 min-h-[200px]">
        <SortableContext
          items={tasks.map((task) => task._id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onArchiveTask={handleArchive}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskColumn;
