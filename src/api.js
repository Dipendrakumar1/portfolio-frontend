export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "";

export const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    // Relative paths are resolved against VITE_IMAGE_BASE_URL (e.g. imageKit)
    // so seed data like "img/projects-hero.jpg" works in production.
    if (IMAGE_BASE_URL) return `${IMAGE_BASE_URL.replace(/\/$/, "")}/${path}`;
    return path;
};
