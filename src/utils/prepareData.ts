import { Storage } from "@google-cloud/storage";
import * as xlsx from "xlsx";
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import { ObjectMap } from "csv-writer/src/lib/lang/object";

const storage = new Storage();
const bucketName = "test-cloud-function-matchem";
const excelFileName = "prono rugby world cup.xlsx";
const jsonlFileName = "betinSportEvents.jsonl";

async function prepareData(): Promise<void> {
  try {
    await Promise.all(
      [jsonlFileName, excelFileName].map((fileName) =>
        storage
          .bucket(bucketName)
          .file(fileName)
          .download({ destination: `./src/assets/${fileName}` })
      )
    );
    await convertExcelToCSV(`./src/assets/${excelFileName}`);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la préparation des données :",
      error
    );
  }
}

async function convertExcelToCSV(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames;

    sheetNames.forEach((sheetName, index) => {
      const worksheet = workbook.Sheets[sheetName];
      const csvFileName = `./src/assets/bookmakerBets${index + 1}.csv`;

      const data: string[] = xlsx.utils.sheet_to_json(worksheet, {
        header: 1
      });

      const csvWriter = createCsvWriter({
        path: csvFileName,
        header: Object.keys(data[0])
      });

      csvWriter
        .writeRecords(data as any as ObjectMap<any>[])
        .then(() => {
          console.log(
            `Le fichier CSV "${csvFileName}" a été créé avec succès.`
          );
        })
        .catch((error) => {
          console.error(
            `Erreur lors de la création du fichier CSV "${csvFileName}":`,
            error
          );
        });
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la conversion Excel en CSV :",
      error
    );
  }
}

export default prepareData;
