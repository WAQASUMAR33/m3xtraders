import axios from 'axios';
import { Buffer } from 'buffer';

/**
 * Uploads a file to a GitHub repository.
 * 
 * @param {Buffer} fileContent - The content of the file to upload.
 * @param {string} filename - The name to save the file as in the GitHub repository.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
export async function uploadToGitHub(fileContent, filename) {
  const filePath = `uploads/${filename}`;
  const content = Buffer.from(fileContent).toString('base64');

  const url = `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/contents/${filePath}`;

  const response = await axios.put(
    url,
    {   message: `Add ${filename}`,
      content: content,},
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.content.download_url;
}
