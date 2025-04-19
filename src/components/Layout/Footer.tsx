import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-purple-600 font-bold text-lg">Paisa hi Paisa</span>
          <p className="text-sm text-gray-500">Share more, own less.</p>
        </div>
        <div className="flex space-x-6">
          <Link to="/help" className="text-sm text-gray-500 hover:text-gray-700">Help</Link>
          <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</Link>
          <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;