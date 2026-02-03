export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    // Assuming images are served from static or just URLs. 
    // If backend serves images directly, adjust this.
    // For now, return path as is or handled by backend.
    return path;
};
