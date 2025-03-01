const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadQuestionsFile = async (fileBuffer, fileName) => {
  try {
    if (!fileBuffer || !fileName) {
      throw new Error('Invalid Questions file data');
    }
    
    // Generate a unique filename
    const uniqueFileName = `questions_uploads/${uuidv4()}-${fileName}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: "application/json",
    };

    console.log('🚀 Uploading Questions JSON to S3...', params);

    // Upload to S3
    await s3.send(new PutObjectCommand(params));

    // Generate S3 file URL
    const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    console.log('✅ Questions JSON Upload Successful:', s3Url);
    return { s3Url, s3Key: uniqueFileName };
  } catch (error) {
    console.error('❌ S3 Questions Upload Error:', error);
    throw new Error(`Questions file upload failed: ${error.message}`);
  }
};

module.exports = { uploadQuestionsFile };
