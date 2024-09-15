export const filterValidImageFiles = async (
  imageFiles: Array<File>
): Promise<Array<File>> => {
  const productsImagesData: Array<null | File> = await Promise.all(
    imageFiles.map((imageFile): Promise<null | File> => {
      return new Promise((resolve) => {
        const tmpImage = new Image();

        const imageLoadHandler = async () => {
          resolve(imageFile);
        };

        try {
          tmpImage.onload = () => {
            imageLoadHandler();
          };

          tmpImage.onerror = () => resolve(null);
          tmpImage.onabort = () => resolve(null);

          tmpImage.src = URL.createObjectURL(imageFile);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          resolve(null);
        }
      });
    })
  );

  const validImageFiles: Array<File> = [];

  for (const imageFile of productsImagesData) {
    if (imageFile) {
      validImageFiles.push(imageFile);
    }
  }

  return validImageFiles;
};
