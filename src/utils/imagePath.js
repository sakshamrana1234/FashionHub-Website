const assetBase = import.meta.env.BASE_URL || "/";

export const getImagePath = (imagePath) => {
  if (!imagePath) return "";
  if (/^(https?:)?\/\//.test(imagePath) || imagePath.startsWith("data:") || imagePath.startsWith("blob:")) {
    return imagePath;
  }

  return `${assetBase}${imagePath.replace(/^\/+/, "")}`;
};
