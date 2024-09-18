const authMiddleware = async (req, res, next) => {
    const token = process.env.GITHUB_TOKEN;
    const auth = `Bearer ${token}`;
    const headers = {
      Authorization: auth,
    };
    try {
      req.headers = headers;
      next();
    } catch (error) {
      res.status(401).json({
        status: false,
        error: 'Authentication failed',
      });
    }
  };

  export default authMiddleware