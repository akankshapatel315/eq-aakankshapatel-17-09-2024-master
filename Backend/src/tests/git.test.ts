import axios from "axios";
import { getCommitList, getRepoList } from "../controllers/githubController";

describe('getRepoList', () => {
  it('should return a list of public repositories', async () => {
    const req = { params: { username: 'testuser' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    const next = jest.fn();
    await getRepoList(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.any(Array),
      message: expect.any(String),
    }));
  });

  it('should return an error if axios.get rejects', async () => {
    const req = { params: { username: 'testuser' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    const next = jest.fn();
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('API error'));

    await getRepoList(req, res);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('getCommitList', () => {
  it('should return a list of commits', async () => {
    const req = { params: { owner: 'testowner', reponame: 'testrepo' }, query: { per_page: 10 } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    const next = jest.fn();
    await getCommitList(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.any(Array),
      totalCount: expect.any(Number),
      message: expect.any(String),
    }));
  });

  it('should return an error if axios.get rejects', async () => {
    const req = { params: { owner: 'testowner', reponame: 'testrepo' }, query: { per_page: 10 } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    const next = jest.fn();
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('API error'));

    await getCommitList(req, res);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});