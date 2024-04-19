import { Link } from "react-router-dom";

export default function DashHeader() {
  const content = (
    <header className="sticky top-0 z-10 bg-dark p-4 border-b bg-gray-900">
      <div className="flex justify-between items-center">
        <Link to="/dash">
          <h1 className="text-xl md:text-2xl  font-semibold ">techNotes</h1>
        </Link>
        <nav className="flex justify-end gap-2">
          {/* add nav buttons later */}
        </nav>
      </div>
    </header>
  );

  return content;
}
