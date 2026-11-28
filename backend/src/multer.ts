import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // using ram storage instead of disk storage
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

export default upload;
