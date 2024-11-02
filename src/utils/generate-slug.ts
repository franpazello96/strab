export function generateSlug (text: string): string {
  return text
      // Remove accents
      .normalize('NFD')
      // Remove special characters
      .replace(/[\u0300-\u036f]/g, "")
      // Replace spaces with hyphens and convert to lowercase
      .toLowerCase()
      // Remove spaces
      .replace(/[^\w\s-]/g, "")
      // Replace spaces with hyphens
      .replace(/\s+/g, "-");
  };