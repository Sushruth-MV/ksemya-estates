import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Cloudflare R2 is S3-compatible, so we use the AWS SDK pointed at the R2 endpoint.
// These four env vars get added tomorrow once the R2 bucket is created:
//   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
// Until then, calls to this client will simply fail — that's expected today.

function getClient() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

export async function uploadToR2(key, buffer, contentType) {
  const client = getClient();
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );
  // Public URL format once the bucket's public access is enabled.
  // Update R2_PUBLIC_URL_BASE tomorrow to match your bucket's actual public URL.
  const base = process.env.R2_PUBLIC_URL_BASE || "https://placeholder.r2.dev";
  return `${base}/${key}`;
}

export async function deleteFromR2(key) {
  const client = getClient();
  await client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    })
  );
}
