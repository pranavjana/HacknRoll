import {
  CheckCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  difficultyLevel,
}) {
  const level = difficultyLevel || { color: "bg-gray-200", label: "Unknown" };

  return (
    <div className="flex items-center gap-2 py-2 px-3 hover:bg-neutral-50 rounded-md transition-colors">
      <button
        onClick={() =>
          onToggle(task.id, !task.completed ? new Date().toISOString() : null)
        }
        className="flex-shrink-0"
      >
        <CheckCircleIcon
          className={`w-5 h-5 ${task.completed ? "text-green-500 fill-current" : "text-neutral-400"}`}
        />
      </button>

      <div className="flex-grow flex items-center gap-2">
        <span className={task.completed ? "line-through text-neutral-400" : ""}>
          {task.content}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${level.color}`}>
          {level.label}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit(task.id)}
          className="p-1 hover:bg-neutral-100 rounded"
        >
          <PencilIcon className="w-4 h-4 text-neutral-500" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 hover:bg-neutral-100 rounded"
        >
          <TrashIcon className="w-4 h-4 text-neutral-500" />
        </button>
      </div>
    </div>
  );
}
