export function truncate(str?: string, maxlength?: number) {
  if (maxlength) {
    if (str && str.length > maxlength) {
      return str.slice(0, maxlength - 1) + "…";
    }
    return str;
  }
}
