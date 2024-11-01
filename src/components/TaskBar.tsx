import "./TaskBar.css";

interface TaskBarProps {
  widgets: { id: string; icon: React.FC }[];
  open: (id: string) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({ widgets, open }) => {
  return (
    <div
      className="taskbar"
      style={{
        position: "fixed",
        bottom: 20,
        left: 50,
      }}
    >
      {/* theme icon */}
      <div className=" taskbar__task" style={{ cursor: "default" }}>
        <div className="theme-icon" style={{ width: 30, height: 30 }} />
      </div>

      {/* all closed widgets */}
      {widgets.map(({ id, icon }) => (
        <div className="taskbar__task" key={id} onClick={() => open(id)}>
          {icon({ size: 30 })}
        </div>
      ))}
    </div>
  );
};

export default TaskBar;
