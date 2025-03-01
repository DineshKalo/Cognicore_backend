const { uploadQuestionsFile } = require('../s3/uploadQuestions');
const Interview = require('../../models/Interview');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const uploadQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No Questions JSON file uploaded' });
    }

    const { interview_id } = req.body;

    if (!interview_id) {
      return res.status(400).json({ message: 'Interview ID is required' });
    }

    const file = req.file;

    // Upload Questions JSON file to S3
    const { s3Url } = await uploadQuestionsFile(file.buffer, file.originalname);

    // Update the interview record with S3 URL
    const interview = await Interview.findByPk(interview_id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    interview.s3_questions_url = s3Url;
    await interview.save();

    res.status(200).json({ message: '✅ Questions JSON uploaded & linked to interview!', interview });
  } catch (error) {
    console.error('❌ Questions Upload Error:', error);
    res.status(500).json({ message: 'Error uploading Questions JSON file', error: error.message });
  }
};

// Apply Multer middleware correctly
module.exports = (router) => {
  router.post('/upload-questions', upload.single('file'), uploadQuestions);
};
