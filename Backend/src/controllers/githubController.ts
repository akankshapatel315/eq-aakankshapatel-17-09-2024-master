import axios from "axios";
import constants from "../../helpers/constants";

const getRepoList = async (req: any, res: any) => {
    try {
        await axios.get(`${process.env.GIT_URL}/users/${req.params.username}/repos?sort=updated&direction=desc&per_page=10`, { headers: req.headers })
            .then((result) => {
                if (!result) {
                    throw {
                        status: false,
                        message: 'error occured',
                    }
                }
                const list = result?.data?.filter((repo) => repo.private === false);
                res.status(constants.statusCodes.success).json({ data: list, message: constants.messages.getRepoListSuccess });
            })
            .catch((error) => {
                res.status(error.status).json({
                    status: false,
                    error: error,
                });
            });

    } catch (error) {
        res.status(constants.statusCodes.serverError).json({
            status: false,
            error: error,
        });
    }
};

const getCommitList = async (req: any, res: any) => {
    try {
        await axios.get(`${process.env.GIT_URL}/repos/${req.params.owner}/${req.params.reponame}/commits?per_page=10`)
            .then((response) => {
                if (!response.data) {
                    throw {

                    }
                }
                res.status(constants.statusCodes.success).json({ data: response.data, message: constants.messages.getRepoListSuccess });
            }).catch((error) => {
                res.status(error.status).json({
                    status: false,
                    error: error,
                });
            })
    } catch (error) {
        res.status(constants.statusCodes.serverError).json({
            status: false,
            error: error,
        });
    }
};
module.exports = { getRepoList, getCommitList };
