import { supabase } from "../lib/supabaseClient";

export const fetchAboutEmsImages = async () => {
  const { data, error } = await supabase.storage
    .from("about-ems")
    .list("", { limit: 100 });
  if (error) {
    console.error("List error:", error.message);
    return [];
  }

  const files = await Promise.all(
    data.map(async (file) => {
      const { data: fileData, error: downloadError } = await supabase.storage
        .from("about-ems")
        .download(file.name);

      if (downloadError) {
        console.error(
          `Download error for ${file.name}:`,
          downloadError.message
        );
        return null;
      }

      return {
        name: file.name,
        url: URL.createObjectURL(fileData),
      };
    })
  );

  return files.filter(Boolean);
};
