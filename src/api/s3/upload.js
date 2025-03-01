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

const uploadFile = async (fileBuffer, fileName, mimeType) => {
  try {
    if (!fileBuffer || !fileName || !mimeType) {
      throw new Error('Invalid file data');
    }
    
    // Generate a unique filename to prevent overwriting
    const uniqueFileName = `uploads/${uuidv4()}-${fileName}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: mimeType,
    };

    console.log('🚀 Uploading file to S3...', params);

    // Corrected AWS SDK v3 method
    await s3.send(new PutObjectCommand(params));

    // Construct S3 file URL
    const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    console.log('✅ Upload Successful:', s3Url);
    return { s3Url, s3Key: uniqueFileName };
  } catch (error) {
    console.error('❌ S3 Upload Error:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

module.exports = { uploadFile };
