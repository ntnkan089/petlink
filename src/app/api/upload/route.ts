import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Initialize AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return new NextResponse(JSON.stringify({ error: 'No file uploaded or incorrect file type' }), { status: 400 });
    }

    // Convert the Blob to a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Define S3 upload parameters
    const uploadParams = {
      Bucket: 'jwt-postgre-tes',
      Key: `uploads/${uuidv4()}_${file.name}`,
      Body: fileBuffer,
      // Remove ACL to comply with bucket policy
    };

    // Upload the file to S3
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Generate the URL of the uploaded image
    const imageUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
    console.log(imageUrl);
    // Respond with the image URL
    return new NextResponse(JSON.stringify({ imageUrl }), { status: 200 });
  } catch (error) {
    console.error('Upload Error:', (error as Error).message);
    return new NextResponse(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
