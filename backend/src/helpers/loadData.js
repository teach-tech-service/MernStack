import path from "path";
import fs from "fs";

export async function importDataFromFiles(arrayOfFilesName) {
  const imported = [];

  const getFileData = fileName =>
    new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, `../data/${fileName}`), (err, data) => {
        if (err) {
          console.log(`Cannot load data from file: ${fileName}`);
        }
        resolve(JSON.parse(data));
      });
    });

  for (let i = 0; i < arrayOfFilesName.length; i++) {
      imported.push(getFileData(arrayOfFilesName[i]))
  }

  const result = await Promise.all(imported)
  return result
}
