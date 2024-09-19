import { useState } from 'react';
import _ from 'lodash';
import axiosGet from '../helpers/commonApis';
import { getRepoListAPI } from '../helpers/apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';
import { GET_GITHUB_REPO_DATA } from '../actions/githublistAction';
import { useDispatch } from 'react-redux'
const RepoList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [repoList, setRepoList] = useState([]);

  async function getRepoList(searchedValue: any) {
    setLoading(true);
    axiosGet(`${getRepoListAPI}/${searchedValue}`)
      .then((response: any) => {
        if (response.status === 200 && response.data.data.length > 0) {
          setRepoList(response.data.data);
          dispatch({ type: GET_GITHUB_REPO_DATA, payload: response?.data?.data });
        } else {
          setRepoList([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.status === 403) {
          toast.error('API rate limit exceeded');
        }
        else {
          toast.error(error.response.statusText);
        }
        setRepoList([]);
        setLoading(false);
      });
  }

  const debouncedSearch = _.debounce((term) => {
    getRepoList(term);
  }, 500);

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    debouncedSearch(value);
  };

  const navigateCommitPage = (repo: any) => {
    navigate(`commitList/${repo.owner.login}/${repo.name}`, { replace: true });
  };

  const handleBackButton = () => {
    navigate("/"); 
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Repository Search</h1>
        <button
          onClick={handleBackButton}
          className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition duration-200"
        >
          Back
        </button>
      </header>

      <div className="container mx-auto p-4">
        <div className="relative mb-6">
          <input
            value={search}
            onChange={handleInputChange}
            type="text"
            className="block p-3 text-sm text-gray-900 border border-blue-300 rounded-lg w-full bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for repositories..."
          />
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-blue-500 text-white uppercase">
              <tr>
                <th className="px-6 py-3">Repository Name</th>
              </tr>
            </thead>
            <tbody>
              {repoList.length > 0 &&
                repoList.map((repo: any, index) => (
                  <tr
                    onClick={(e) => {
                      navigateCommitPage(repo);
                      e.preventDefault();
                    }}
                    key={index}
                    className="bg-white border-b hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {repo.name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {loading && <Loader />}
      </div>

      <footer className="bg-blue-600 text-white p-4 text-center mt-4">
        <p>&copy; 2024 Repository Search. All rights reserved.</p>
      </footer>
    </>
  );
};

export default RepoList;
