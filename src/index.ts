import prepareData from "./utils/prepareData";
import parseFiles from "./utils/parseFiles";
import generateResponse from "./utils/generateResponse";
import { Request, Response } from "express";

exports.helloHttp = async (req: Request, res: Response) => {
  try {
    // Préparation des données: fetch google storage (j'ai mis les fichiers de l exercice sur un bucket) + convert excel to csv
    await prepareData();

    // Parse les fichiers et retourne les données en objet js
    const data = await parseFiles();

    // Calculs des probabilités et génération de la réponse
    const response = generateResponse(...data);

    res.status(200).json(response);
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
    res.status(500).send("Une erreur s'est produite.");
  }
};
