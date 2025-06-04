/* eslint-disable @typescript-eslint/no-explicit-any */

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

interface FileObject {
  name: string;
  type: string;
  stream: () => AsyncIterable<Uint8Array>;
}

export const uploadFileToFilebase = async (
  name: string,
  file: FileObject
): Promise<string | { error: string }> => {
  console.log("Starting file upload to Filebase...");

  // Validate file
  if (!file || !file.name) {
    console.error("Error: Invalid file object, missing 'name' property.");
    return { error: "Invalid file object." };
  }

  console.log("Endpoint URL:", process.env.NEXT_PUBLIC_FILEBASE_ENDPOINT_URL);
  console.log(
    "Access Key ID:",
    process.env.NEXT_PUBLIC_FILEBASE_ACCESS_KEY_ID ? "Provided" : "Missing"
  );
  console.log(
    "Secret Access Key:",
    process.env.NEXT_PUBLIC_FILEBASE_SECRET_ACCESS_KEY ? "Provided" : "Missing"
  );
  console.log(
    "Bucket Name:",
    process.env.NEXT_PUBLIC_FILEBASE_BUCKET_NAME || "Not provided"
  );

  // Validate environment variables
  if (
    !process.env.NEXT_PUBLIC_FILEBASE_ENDPOINT_URL ||
    !process.env.NEXT_PUBLIC_FILEBASE_ACCESS_KEY_ID ||
    !process.env.NEXT_PUBLIC_FILEBASE_SECRET_ACCESS_KEY
  ) {
    console.error(
      "Error: Missing environment variables for Filebase configuration."
    );
    return {
      error:
        "Missing required environment variables for Filebase configuration.",
    };
  }

  // Initialize S3 Client
  let s3Client: S3Client;
  try {
    s3Client = new S3Client({
      endpoint: process.env.NEXT_PUBLIC_FILEBASE_ENDPOINT_URL,
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_FILEBASE_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_FILEBASE_SECRET_ACCESS_KEY,
      },
    });
    console.log("S3 Client initialized successfully.");
  } catch (initError) {
    console.error("Error initializing S3 Client:", initError);
    return { error: "Failed to initialize S3 Client." };
  }

  // Prepare file metadata
  const date = new Date().toISOString().split("T")[0];
  const ext = file.name.split(".").pop();
  const newFileName = `profile-avatar/${uniqid()}-${name.replace(
    /\s+/g,
    "_"
  )}-${date}.${ext}`;
  console.log(`Generated unique file name: ${newFileName}`);

  // Read file stream
  const chunks: Uint8Array[] = [];
  try {
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    console.log("File stream read successfully.");
  } catch (streamError) {
    console.error("Error reading file stream:", streamError);
    return { error: "Error reading file stream." };
  }

  const buffer = Buffer.concat(chunks);
  console.log("File buffer created.");

  // Set bucket
  const bucket = process.env.NEXT_PUBLIC_FILEBASE_BUCKET_NAME;
  console.log(`Using bucket: ${bucket}`);

  // Construct URL with CID
  let link = "";

  // Upload file
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: "public-read",
      ContentType: file.type,
      Body: buffer,
    });

    // Add middleware to extract CID from response headers
    command.middlewareStack.add(
      (next: any) => async (args: any) => {
        const response = await next(args);

        // Check if request is incoming as middle works both ways
        if (!response.response.statusCode) return response;

        // Get CID from response headers
        const cid = response.response.headers["x-amz-meta-cid"];

        // Resign url
        link = `https://ipfs.filebase.io/ipfs/${cid}`;

        console.log("Response : ", response);
        return response;
      },
      {
        step: "build",
        name: "addCidToOutput",
      }
    );

    console.log("Sending upload command to Filebase...");
    await s3Client.send(command);

    return link;
  } catch (uploadError: any) {
    if (uploadError.code === "ETIMEDOUT") {
      console.error("Connection timed out when uploading the file.");
      return { error: "Network timeout. Please try again later." };
    }
    console.error("Error during file upload:", uploadError);
    return { error: "Error uploading file to Filebase." };
  }
};
