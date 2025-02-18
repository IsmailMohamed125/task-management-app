import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useCallback } from "react";
import TaskCard from "./TaskCard";
import TaskColumn from "./TaskColumn";

const KanbanBoard = ({ tasks, onTaskUpdate, onArchiveTask, onDeleteTask }) => {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Memoize the handleArchive function
  const handleArchive = useCallback(
    (taskId) => {
      onArchiveTask(taskId);
    },
    [onArchiveTask]
  );

  const columns = {
    "To Do": tasks.filter(
      (task) => !task.isArchived && task.status === "To Do"
    ),
    "In Progress": tasks.filter(
      (task) => !task.isArchived && task.status === "In Progress"
    ),
    Completed: tasks.filter(
      (task) => !task.isArchived && task.status === "Completed"
    ),
    Archived: tasks.filter((task) => task.isArchived),
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    const overId = over.id;

    if (overId === "Archived") {
      handleArchive(activeTask._id);
    } else if (
      Object.keys(columns).includes(overId) &&
      !activeTask.isArchived
    ) {
      onTaskUpdate(activeTask._id, { status: overId });
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[800px] p-4">
          {Object.entries(columns).map(([columnId, columnTasks]) => (
            <TaskColumn
              key={columnId}
              id={columnId}
              title={columnId}
              tasks={columnTasks}
              onArchiveTask={onArchiveTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <TaskCard
            task={tasks.find((task) => task._id === activeId)}
            onArchiveTask={handleArchive}
            onDeleteTask={onDeleteTask}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
