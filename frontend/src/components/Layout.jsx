import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="font-bold text-xl">
                Training Tracker
              </Link>
              <Link to="/" className="hover:text-blue-200">
                Dashboard
              </Link>
              <Link to="/employees" className="hover:text-blue-200">
                Employees
              </Link>
              <Link to="/trainings" className="hover:text-blue-200">
                Trainings
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
