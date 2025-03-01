const VideoLink = require('../../models/VideoLink');

const fetchVideos = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Extract query params for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Fetch videos belonging to the user with pagination
    const videos = await VideoLink.findAndCountAll({
      where: { host_id: userId },
      limit,
      offset,
      order: [['created_at', 'DESC']], 
    });    

    res.status(200).json({
      totalVideos: videos.count,
      totalPages: Math.ceil(videos.count / limit),
      currentPage: page,
      videos: videos.rows,
    });
  } catch (error) {
    console.error('❌ Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

module.exports = (router) => {
  router.get('/fetch', fetchVideos);
};
