import { useState } from 'react'
import _ from 'lodash';
import axiosGet from '../helpers/commonApis';
import { getRepoListAPI } from '../helpers/apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';
const RepoList = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [repoList, setRepoList] = useState([]);

  async function getRepoList(searchedValue: any) {
    setLoading(true)
    axiosGet(`${getRepoListAPI}/${searchedValue}`)
      .then((response: any) => {
        if (response.status === 200 && response.data.data.length > 0) {
          setRepoList(response.data.data)
          setLoading(false)

        }
        else {
          setRepoList([]);
          setLoading(false)

        }
      }).catch((error) => {
        toast.error(error.response.statusText);
        setRepoList([]);
        setLoading(false)

      })
  }


  const debouncedSearch = _.debounce((term) => {
    getRepoList(term)
  }, 500);


  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    debouncedSearch(value);
  };

  const navigateCommitPage = (repo: any) => {
    console.log('repo.name :>> ', repo.name);
    navigate(`commitList/${repo.owner.login}/${repo.name}`, { replace: true })
  }


  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input
              value={search}
              onChange={handleInputChange}
              type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Reposatory Name
              </th>
            </tr>
          </thead>
          {
            repoList.length > 0 && repoList.map((repo: any, index: number) => {
              return (<>
                <tbody>
                  <tr onClick={(e) => { navigateCommitPage(repo); e.preventDefault() }} key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {repo.name}
                    </th>

                  </tr>
                </tbody>
              </>
              )
            })
          }

        </table>
      </div>
      {loading && <Loader/>}
    </>
  )
}

export default RepoList
