export const useBase64 = () => {
  // encode Base64
  const encodeBase64 = (str: string) => {
    try {
      return btoa(unescape(encodeURIComponent(str))); // 处理可能的中文或特殊字符
    } catch (e) {
      console.error("Base64 encode error:", e);
      return "";
    }
  };

  // Base64 decode
  const decodeBase64 = (str: string) => {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (e) {
      console.error("Base64 decode error:", e);
      return "";
    }
  };

  return { encodeBase64, decodeBase64 };
};
