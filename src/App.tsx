import { useState } from "react";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col bg-gray-100 min-h-screen">
      <header className="h-32 flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <div>My Projects</div>
          <div>New Project</div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col">
            <span>Priority</span>
            <span>Due date</span>
            <span>Tags</span>
          </div>

          <div className="flex flex-col">
            <span>Low / Medium / High</span>
            <span>dd/mm/yy</span>
            <span>ui / design / assignment / work</span>
          </div>
        </div>
      </header>

      <div className="flex flex-grow justify-around border border-red-100">
        <div className="w-full p-8">
          <div className="h-full px-4 border rounded bg-slate-300">
            <div className="flex justify-between items-center">
              <div>Todo</div>
              <span>New task</span>
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded border h-20"></div>
            ))}
          </div>
        </div>
        <div className="w-full p-8">
          <div className="h-full px-4 border rounded bg-slate-300">
            <div className="flex justify-between items-center">
              <div>In Progress</div>
              <span>New task</span>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded border h-20"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full p-8">
          <div className="h-full px-4 border rounded bg-slate-300">
            <div className="flex justify-between items-center">
              <div>Completed</div>
              <span>New task</span>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded border h-20"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
