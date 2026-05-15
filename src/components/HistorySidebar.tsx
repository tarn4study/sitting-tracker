import { Session } from '../types';

interface HistorySidebarProps {
  history: Session[];
}

export const HistorySidebar = ({ history }: HistorySidebarProps) => {
  return (
    <aside className="flex-1 bg-white/60 rounded-[48px] p-8 border-4 border-white flex flex-col min-h-[400px]">
      <h3 className="text-2xl font-black mb-6 text-[#FF6B8B] flex items-center gap-2 uppercase italic">
        <span>📖</span> History
      </h3>
      <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 mb-6">
        {history.length === 0 ? (
          <div className="bg-white p-5 rounded-3xl border-2 border-pink-50 text-center italic text-pink-300 font-bold">
            No logs yet buddies! (｡•́︿•̀｡)
          </div>
        ) : (
          history.map((session) => (
            <div key={session.id} className="bg-white p-5 rounded-3xl border-2 border-pink-50 flex justify-between items-center shadow-sm">
              <div>
                <p className="font-black text-[10px] opacity-40 uppercase tracking-wider mb-1">
                  {new Date(session.timestamp).toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className={`font-black text-lg italic uppercase tracking-tight ${
                  session.task === 'work' ? 'text-blue-400' : 
                  session.task === 'read' ? 'text-purple-400' : 
                  session.task === 'game' ? 'text-[#FF8DA1]' : 'text-green-400'
                }`}>
                  {session.task === 'work' ? '💻 Work' : 
                   session.task === 'read' ? '📚 Read' : 
                   session.task === 'game' ? '🎮 Game' : '🍵 Relax'}
                </p>
              </div>
              <div className="text-xl font-black text-[#5D4E56]">
                {Math.floor(session.duration / 60)}m
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
