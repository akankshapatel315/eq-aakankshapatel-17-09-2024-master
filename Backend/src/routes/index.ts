import authMiddleware from "../middlewares/auth";

const expressServer = require("express");
const gitHubController = require("../controllers/githubController");
const router = expressServer.Router();

router.get("/repo-list/:username",authMiddleware, gitHubController.getRepoList);
router.get("/commit-list/:owner/:reponame", authMiddleware,gitHubController.getCommitList);

export default router;
