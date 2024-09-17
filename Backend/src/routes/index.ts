const expressServer = require("express");
const gitHubController = require("../controllers/githubController");
const router = expressServer.Router();

router.get("/", gitHubController.getRepoList);
router.get("/commit", gitHubController.getCommitList);

export default router;
