import { MatchObject, PronoScoreObject } from "../types";
import * as fs from "fs";
import csv from "csv-parser";
import { createInterface } from "readline";

const readAndParseFiles = async (): Promise<
  [MatchObject[], PronoScoreObject[], PronoScoreObject[]]
> => {
  const jsonlFileName = "betinSportEvents.jsonl";
  const cv1FileName = "bookmakerBets1.csv";
  const cv2FileName = "bookmakerBets2.csv";

  const parsedJsonl: MatchObject[] = await parseJSONL(
    `./src/assets/${jsonlFileName}`
  );
  const parsedCsv1: PronoScoreObject[] = await parseCSV(
    `./src/assets/${cv1FileName}`
  );
  const parsedCsv2: PronoScoreObject[] = await parseCSV(
    `./src/assets/${cv2FileName}`
  );

  return [parsedJsonl, parsedCsv1, parsedCsv2];
};

const parseJSONL = async (jsonlFilePath: string): Promise<MatchObject[]> => {
  const stream = fs.createReadStream(jsonlFilePath, "utf-8");
  const rl = createInterface({
    input: stream,
    crlfDelay: Infinity
  });
  const parsedObjects: MatchObject[] = [];

  for await (const line of rl) {
    try {
      const object: MatchObject = JSON.parse(line);
      parsedObjects.push(object);
    } catch (error) {
      console.error("Erreur de parsing JSONL:", error);
      throw new Error("Erreur de parsing JSONL");
    }
  }

  return parsedObjects;
};

const parseCSV = async (filePath: string): Promise<PronoScoreObject[]> => {
  return new Promise<PronoScoreObject[]>((resolve, reject) => {
    const dataCSV: PronoScoreObject[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: PronoScoreObject) => {
        dataCSV.push(row);
      })
      .on("end", () => {
        resolve(dataCSV);
      })
      .on("error", (error) => {
        console.error("Erreur lors de la lecture du fichier CSV:", error);
        reject(error);
      });
  });
};

export default readAndParseFiles;
