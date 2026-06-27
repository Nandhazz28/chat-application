import api from "./axios";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const isImage = file.type.startsWith("image/");
  const isAudio = file.type.startsWith("audio/");
  const endpoint = isImage ? "/api/uploads/image" : isAudio ? "/api/uploads/audio" : "/api/uploads/file";

  const response = await api.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      // progress available: e.loaded / e.total
    },
  });
  return response.data;
};