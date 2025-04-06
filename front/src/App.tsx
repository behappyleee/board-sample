import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import BoardList from './components/board/BoardList';
import BoardWrite from './components/board/BoardWrite';
import BoardDetail from './components/board/BoardDetail';
import BoardEdit from './components/board/BoardEdit';
import './App.css';

function Navigation() {
  const navigate = useNavigate();
  return (
    <div>
      <p>
        <button onClick={() => navigate('/board')}>게시판 이동</button>
      </p>
      <p>
        <button onClick={() => navigate('/board/write')}>게시판 글쓰기</button>
      </p>
      <p> 
        <button onClick={() => navigate('/board/1')}>게시판 조회</button>
      </p>
      <p>
        <button onClick={() => navigate('/board/edit/1')}>게시판 수정</button>
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route path="/board" element={<BoardList />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/board/edit/:id" element={<BoardEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
