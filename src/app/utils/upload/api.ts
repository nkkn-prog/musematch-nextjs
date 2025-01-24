// 画像アップロードAPI
export const handleUpload = async (image: File, mode: string) => {
  const reader = new FileReader();

  // この処理が終わる前にonDropが呼ばれ、reader.resultがundefinedになっていた。
  // new Promiseを使って、reader.onloadendが呼ばれたらresolveを呼ぶようにする
  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image, mode: mode }),
        });

        const data = await response.json();
        resolve(data.imagePath);
        
      } catch (error) {
        console.error(error);
        reject(error);
      }
    };
    reader.readAsDataURL(image);
    });
  };