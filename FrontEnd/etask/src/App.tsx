import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import RepoList from './componets/repoList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommitList from './componets/commitList';
function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/commitList/:owner/:repoName" element={<CommitList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
