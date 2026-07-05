export function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-btn bg-ink-obsidian px-4 py-2 text-sm text-white shadow-lg">
      {message}
    </div>
  );
}
