import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, onArchiveTask, onDeleteTask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 border-red-200";
      case "Medium":
        return "bg-yellow-100 border-yellow-200";
      case "Low":
        return "bg-green-100 border-green-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;

    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: "Overdue", color: "text-red-600" };
    } else if (diffDays === 0) {
      return { text: "Due today", color: "text-orange-600" };
    } else if (diffDays <= 2) {
      return { text: "Due soon", color: "text-yellow-600" };
    }
    return { text: "Due", color: "text-gray-600" };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const dueDateStatus = getDueDateStatus();

  const handleArchiveClick = (event) => {
    // Completely stop event propagation
    event.preventDefault();
    event.stopPropagation();

    // Call archive function
    onArchiveTask(task._id);
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(task._id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`p-3 rounded border-2 ${getPriorityColor(task.priority)} ${
        isDragging ? "shadow-lg" : ""
      } relative min-h-[120px]`}
    >
      {/* Action buttons - Moved to top right with responsive layout */}
      <div className="absolute top-2 right-2 flex flex-col lg:flex-row gap-1 lg:gap-2 z-10">
        <button
          type="button"
          onClick={handleArchiveClick}
          className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 text-xs lg:text-sm whitespace-nowrap bg-white/80 backdrop-blur-sm"
        >
          {task.isArchived ? "Unarchive" : "Archive"}
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-100 text-xs lg:text-sm whitespace-nowrap bg-white/80 backdrop-blur-sm"
        >
          Delete
        </button>
      </div>

      {/* Draggable content */}
      <div {...attributes} {...listeners} className="pr-20">
        <h4 className="font-medium mb-1">{task.title}</h4>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {task.description}
        </p>
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
          <span className="text-gray-500">{task.status}</span>
          {task.dueDate && (
            <span className={`flex items-center gap-1 ${dueDateStatus?.color}`}>
              <span>{dueDateStatus?.text}:</span>
              <span>{formatDate(task.dueDate)}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
