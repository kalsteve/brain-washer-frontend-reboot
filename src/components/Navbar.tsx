export default function Navbar() {
  return (
    <nav className="bg-[#1e1e1e] shadow-lg w-[20%]">
      <div className="flex flex-col items-center justify-between max-w-6xl mx-auto px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Navbar</h1>
        </div>
        <div>
          <ul>
            <li className="text-white">채팅창 목록</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
