const messages: any = {
    getRepoListSuccess: 'Repo list retrieved successfully',
    getCommitListSuccess: 'Commit list retrieved successfully',
    getRepoListFailed: "some error occure while fetching commit list",
    getCommitListFailed: "some error occure while fetching commit list",
    error:"error occurred: No data returned"
};


const statusCodes: any =
{
    success: 200,
    serverError: 500,
    notFound: 404
}

export default { messages, statusCodes };
