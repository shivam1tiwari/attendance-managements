import logo from './logo.svg';
import './App.css';
import Attendance from './components/Attendance.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Assignments from './components/assignments/Assignments.js';
import Post from './components/blog/Post.js';
import BlogSpot from './components/blog/BlogSpot.js';
import Blog from './components/blog/Blog.js';
/**
 * Main App component to handle routing in the application.
 * @returns {JSX.Element} The main App component with all routes defined.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Attendance />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/post" element={<Post />} />
        <Route path="/blogspot" element={<BlogSpot />} />
        <Route path="/blogspot/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
