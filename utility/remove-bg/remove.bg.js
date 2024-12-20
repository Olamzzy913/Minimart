import axios from "axios";

export async function removeBackground(imageFile) {
  const apiKey = "ME2GNYmWtrWFXihkApK8P7m2"; // Use environment variable for API key

  const formData = new FormData();
  formData.append("image_file", imageFile);
  formData.append("size", "auto");

  try {
    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer", // Required to get the binary image data
      }
    );

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.log(error);
    console.error(
      "Error removing background:",
      error.response?.data || error.message
    );
    throw error;
  }
}
