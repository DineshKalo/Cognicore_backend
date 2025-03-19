const { uploadQuestionsFile } = require('../s3/uploadQuestions');
const Host = require('../../models/Host'); // Corrected import
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const uploadQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No Questions JSON file uploaded' });
    }

    const { host_id } = req.body;

    if (!host_id) {
      return res.status(400).json({ message: 'Host ID is required' });
    }

    const file = req.file;

    // Upload Questions JSON file to S3
    const { s3Url } = await uploadQuestionsFile(file.buffer, file.originalname);

    // Update the host record with S3 URL
    const host = await Host.findByPk(host_id);
    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    await host.save(); // Corrected variable name

    res.status(200).json({ message: '✅ Questions JSON uploaded & linked to host!',s3_Url: s3Url });
  } catch (error) {
    console.error('❌ Questions Upload Error:', error);
    res.status(500).json({ message: 'Error uploading Questions JSON file', error: error.message });
  }
};

// Apply Multer middleware correctly
module.exports = (router) => {
  router.post('/upload-questions', upload.single('file'), uploadQuestions);
};