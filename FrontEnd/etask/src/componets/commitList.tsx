import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosGet from '../helpers/commonApis'; // Adjust this path according to your project structure
import { toast } from 'react-toastify';
import { getCommitListAPI } from '../helpers/apis'; // Adjust this path as well
import Loader from './loader';
import { useSelector } from 'react-redux';

const CommitList = () => {
    const repoList = useSelector((state: any) =>  state.git.repoData)
    const { owner, repoName } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [commitList, setCommitList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCommits, setTotalCommits] = useState(0);
    const commitsPerPage = 10;

    
    async function getCommitList(owner: any, repoName: any, page: number) {
        try {
            setLoading(true);
            const response: any = await axiosGet(`${getCommitListAPI}/${owner}/${repoName}?per_page=${commitsPerPage}&page=${page}`);
            if (response.status === 200) {
                setCommitList(response.data.data);
                setTotalCommits(Number(response.data.totalCount));
            }
        } catch (error: any) {
            toast.error(error.response?.statusText || 'An error occurred');
            setCommitList([]);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCommitList(owner, repoName, currentPage);
    }, [owner, repoName, currentPage]);

    const totalPages = Math.ceil(totalCommits / commitsPerPage);

    return (
        <>
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition duration-200"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V4a1 1 0 011-1z" />
                    </svg>
                    <span>Back</span>
                </button>
                <h1 className="text-2xl font-bold">Commit List for {repoName}</h1>
            </header>

            <div className="container mx-auto p-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">Commit Message</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commitList.length > 0 ? (
                                commitList.map((commit: any) => (
                                    <tr key={commit.sha} className="bg-white border-b hover:bg-blue-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {commit.commit.message}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(commit.commit.author.date).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="text-center py-4">No commits found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {loading && <Loader />}
                    <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * commitsPerPage + 1}-{Math.min(currentPage * commitsPerPage, totalCommits)}</span> of <span className="font-semibold text-gray-900">{totalCommits}</span>
                        </span>
                        <ul className="inline-flex -space-x-px text-sm h-8">
                            <li>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100"
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1 ? 'bg-gray-300 text-gray-900' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100"
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 text-center mt-4">
                <p>&copy; 2024 Commit List. All rights reserved.</p>
            </footer>
        </>
    );
};

export default CommitList;
