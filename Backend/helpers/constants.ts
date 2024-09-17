const messages: any = {
    getCommitListSuccess: "commit list get successfully",
    getRepoListSuccess: "commit list get successfully",
    getRepoListFailed: "some error occure while fetching commit list",
    getCommitListFailed: "some error occure while fetching commit list",
};


const statusCodes: any =
{
    success: 200,
    serverError: 500,
    notFound: 404
}

export default { messages, statusCodes };
