import { getRepoList, getCommitList } from '../controllers/githubController';
import axiosGet from '../../helpers/commonApi';

jest.mock('../../helpers/commonApi');

describe('getRepoList', () => {
  it('should return a list of public repositories', async () => {
    const req = { params: { username: 'username' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    (axiosGet as jest.Mock).mockResolvedValue({
      data: [
        { id: 1, name: 'repo1', private: false },
        { id: 2, name: 'repo2', private: true },
        { id: 3, name: 'repo3', private: false },
      ],
    });

    await getRepoList(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      data: [
        { id: 1, name: 'repo1', private: false },
        { id: 3, name: 'repo3', private: false },
      ],
      message: 'Repo list retrieved successfully',
    });
  });

  it('should return an error if axiosGet rejects', async () => {
    const req = { params: { username: 'username' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    (axiosGet as jest.Mock).mockRejectedValue(new Error('Error'));

    try {
      await getRepoList(req, res);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe('getCommitList', () => {
  it('should return a list of commits', async () => {
    const req = { params: { owner: 'owner', reponame: 'reponame' }, query: { page: 1, per_page: 10 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    (axiosGet as jest.Mock).mockResolvedValue({
      data: [
        { id: 1, commit: 'commit1' },
        { id: 2, commit: 'commit2' },
        { id: 3, commit: 'commit3' },
        { id: 4, commit: 'commit4' },
        { id: 5, commit: 'commit5' },
      ],
    });

    await getCommitList(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      data: [
        { id: 1, commit: 'commit1' },
        { id: 2, commit: 'commit2' },
        { id: 3, commit: 'commit3' },
        { id: 4, commit: 'commit4' },
        { id: 5, commit: 'commit5' },
      ],
      totalCount: 5,
      message: 'Commit list retrieved successfully',
    });
  });

  it('should return an error if axiosGet rejects', async () => {
    const req = { params: { owner: 'owner', reponame: 'reponame' }, query: { page: 1, per_page: 10 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    (axiosGet as jest.Mock).mockRejectedValue(new Error('Error'));

    try {
      await getCommitList(req, res);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});