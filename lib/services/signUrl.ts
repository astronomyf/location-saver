import * as crypto from "crypto";

export const signURL = (inputURL: string, token: string): string => {
  const [key, encodedSecret] = token.split("_");

  // Add key to the URL to be signed
  const keyedURL = inputURL + "&key=" + key;

  // Decode the secret into its binary format
  // We need to decode the URL-encoded private key
  const decodedSecret = Buffer.from(encodedSecret, "hex");

  // Create a signature using the private key and the URL-encoded
  // string using HMAC SHA256. This signature will be binary.
  const signature = crypto
    .createHmac("sha256", decodedSecret)
    .update(keyedURL)
    .digest();

  // Encode the binary signature into base64 for use within a URL
  const encodedSignature = Buffer.from(signature).toString("base64");

  // Return signed URL
  return keyedURL + "&signature=" + encodedSignature;
};
