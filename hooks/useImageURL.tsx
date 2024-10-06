export function useImageURL(
  file: File | null,
  type: 'image' | 'application/pdf' = 'image'
): string | null {
  const handleConverter = () => {
    if (file) {
      if (type === 'image') {
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
      } else if (type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (event) => {
          const pdfUrl = event.target?.result as string;
          return pdfUrl;
        };
        reader.readAsDataURL(file);
      }
      return null;
    } else {
      return null;
    }
  };

  return handleConverter();
}
