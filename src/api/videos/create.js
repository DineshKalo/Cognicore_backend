const { uploadFile } = require('../s3/upload');
const VideoLink = require('../../models/VideoLink');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const createVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { job_role, tech_stack, host_id, expires_at } = req.body;

    if (!host_id) {
      return res.status(400).json({ message: 'Host ID is required' });
    }

    const file = req.file;

    // Upload file to S3
    const { s3Url } = await uploadFile(file.buffer, file.originalname, file.mimetype);

    // Save video metadata in `VideoLink` table
    const newVideo = await VideoLink.create({
      job_role,
      tech_stack,
      link: s3Url,
      created_at: new Date(),
      expires_at: expires_at ? new Date(expires_at) : null,
      host_id,
    });

    res.status(201).json({ message: '✅ Video uploaded successfully!', video: newVideo });
  } catch (error) {
    console.error('❌ Video Upload Error:', error);
    res.status(500).json({ message: 'Error uploading video', error: error.message });
  }
};

// Apply Multer middleware correctly
module.exports = (router) => {
  router.post('/upload', upload.single('file'), createVideo);
};
