const TaskStatistics = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.totalTasks,
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Completed Tasks",
      value: stats.completedTasks,
      percentage: stats.totalTasks
        ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
        : 0,
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "High Priority",
      value: stats.highPriorityTasks,
      percentage: stats.totalTasks
        ? Math.round((stats.highPriorityTasks / stats.totalTasks) * 100)
        : 0,
      icon: (
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      label: "Archived Tasks",
      value: stats.archivedTasks,
      percentage: stats.totalTasks
        ? Math.round((stats.archivedTasks / stats.totalTasks) * 100)
        : 0,
      icon: (
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
      color: "bg-gray-50",
      textColor: "text-gray-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.color} p-6 rounded-lg shadow-sm transition-transform duration-200 hover:scale-105`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">{stat.icon}</div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.label}
                </dt>
                <dd>
                  <div className="flex items-baseline">
                    <div className={`text-2xl font-semibold ${stat.textColor}`}>
                      {stat.value}
                    </div>
                    {stat.percentage !== undefined && (
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                        {stat.percentage}%
                      </div>
                    )}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          {stat.percentage !== undefined && (
            <div className="mt-4">
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className={`absolute h-2 rounded-full ${stat.textColor.replace(
                    "text",
                    "bg"
                  )}`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskStatistics;
