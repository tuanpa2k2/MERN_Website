export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const renderOpptions = (arr) => {
  let results = [];

  if (arr) {
    results = arr?.map((opp) => {
      return {
        value: opp,
        label: opp,
      };
    });
  }
  results.push({
    label: "Thêm loại sản phẩm của bạn...",
    value: "add_type",
  });

  return results;
};
