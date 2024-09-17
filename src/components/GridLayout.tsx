// @ts-nocheck
import "react-grid-layout/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridLayout({ children }) {
  return (
    <div className="px-4">
      <div className="flex justify-around items-center">
        <div>To Do</div>
        <div>In Progress</div>
        <div>Completed</div>
      </div>
      <ResponsiveGridLayout
        width={1200}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
        isResizable={false}
        draggableCancel=".nonDraggableAreaClassName"
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  );
}
