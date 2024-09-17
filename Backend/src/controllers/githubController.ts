import axios from "axios";
import constants from "../../helpers/constants";

const getRepoList = async (req: any, res: any) => {
    try {
        await axios
            .get(
                `${process.env.GIT_URL
                }/users/${"akankshapatel315"}/repos?sort=updated&direction=desc&per_page=10`
            )
            .then((result) => {
                const list = result?.data?.filter((repo) => repo.private === false);
                res.status(constants.statusCodes.success).json({ data: list, message: constants.messages.getRepoListSuccess });
            })
            .catch((error) => {
                res.status(constants.statusCodes.serverError).json({
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

const getCommitList = async (req: Request, res: any) => {
    try {
        const list = await axios.get(
            `${process.env.GIT_URL}/repos/akankshapatel315/BlogApp-BE/commits?per_page=10`
        );
        res
            .status(constants.statusCodes.success)
            .json({
                data: list.data,
                message: constants.messages.getCommitListSuccess,
            });
    } catch (error) {
        res.status(constants.statusCodes.serverError).json({
            status: false,
            error: error,
        });
    }
};
module.exports = { getRepoList, getCommitList };
