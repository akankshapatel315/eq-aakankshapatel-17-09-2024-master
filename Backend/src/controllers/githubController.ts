import axios from 'axios';
import constants from '../../helpers/constants';

export const getRepoList = async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.GIT_URL}/users/${req.params.username}/repos`);
    const data = response.data;
    res.status(constants.statusCodes.success).json({ data, message: constants.messages.getRepoListSuccess });
  } catch (error) {
    next(error);
  }
};

export const getCommitList = async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.GIT_URL}/repos/${req.params.owner}/${req.params.reponame}/commits`);
    const data = response.data.slice(0, req.query.per_page);
    res.status(constants.statusCodes.success).json({ data, totalCount: response.data.length, message: constants.messages.getCommitListSuccess });
  } catch (error) {
    next(error);
  }
};