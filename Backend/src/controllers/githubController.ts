import constants from "../../helpers/constants";
import axiosGet from "../../helpers/commonApi";

export const getRepoList = async (req: any, res: any) => {
    try {
        axiosGet(`users/${req.params.username}/repos?sort=updated&direction=desc&per_page=10`)
            .then((result: any) => {
                const list = result.data.filter(repo => !repo.private);
                res.status(constants.statusCodes.success).json({
                    data: list,
                    message: constants.messages.getRepoListSuccess,
                });
            })
            .catch(error => {
                const statusCode = error.response ? error.response.status : constants.statusCodes.serverError;
                res.status(statusCode).json({
                    status: false,
                    error: error.response ? error.response.data : error.message,
                });
            });
    } catch (error) {
        res.status(constants.statusCodes.serverError).json({
            status: false,
            error: error,
        });
    }
};

export const getCommitList = async (req, res) => {
    try {
        const perPage = parseInt(req.params.per_page, 10) || 10; 
        const page = parseInt(req.query.page) || 1; 
        const skip = (page - 1) * perPage; 

        axiosGet(`repos/${req.params.owner}/${req.params.reponame}/commits`)
            .then((response: any) => {
                const totalCount = response.data.length; // Total number of commits
                const paginatedCommits = response.data.slice(skip, skip + perPage); 

                res.status(constants.statusCodes.success).json({
                    data: paginatedCommits,
                    totalCount: totalCount,
                    message: constants.messages.getRepoListSuccess,
                });
            })
            .catch(error => {
                const statusCode = error.response ? error.response.status : constants.statusCodes.serverError;
                res.status(statusCode).json({
                    status: false,
                    error: error.response ? error.response.data : error.message,
                });
            });
    } catch (error) {
        const statusCode = error.response
            ? error.response.status
            : constants.statusCodes.serverError;
        res.status(statusCode).json({
            status: false,
            error: error.response ? error.response.data : error.message,
        });
    }
};

module.exports = { getRepoList, getCommitList };

