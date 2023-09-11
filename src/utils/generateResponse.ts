import { MatchObject, MatchProbabilities, PronoScoreObject } from "../types";

const calculateScore = (
  bookmarker1Rating: number,
  bookmarker2Rating: number,
  team: string
): number => {
  const weightBookmarker1 = 1.5;
  const weightBookmarker2 = 1;
  const averageRating =
    (bookmarker1Rating * weightBookmarker1 +
      bookmarker2Rating * weightBookmarker2) /
    (weightBookmarker1 + weightBookmarker2);

  let score = averageRating;

  if (team === "France") {
    score += 5;
  }

  const favorites = [
    "Nouvelle-Zélande",
    "France",
    "Afrique du Sud",
    "Australie"
  ];

  if (favorites.includes(team)) {
    score += 10;
  }

  return score;
};

const getBookmakerNote = (
  parsedData: PronoScoreObject[],
  match: MatchObject,
  team: "home" | "away"
): number | null => {
  const note = Number(
    parsedData?.find((row: PronoScoreObject) => row.Id === match.id)?.[
      `Score Equipe ${team === "home" ? 1 : 2}`
    ]
  );
  return isNaN(note) ? null : note;
};

const generateResponse = (
  jsonlParsedData: MatchObject[],
  csv1ParsedData: PronoScoreObject[],
  csv2ParsedData: PronoScoreObject[]
): MatchProbabilities[] => {
  const results: MatchProbabilities[] = [];

  const filteredContests = jsonlParsedData.filter(
    (match) => match.contestId === "3cbf5031-b192-4881-9650-4b48970fc7a9"
  );

  filteredContests.forEach((match) => {
    const notes = {
      bookmaker1: {
        homeNote: getBookmakerNote(csv1ParsedData, match, "home"),
        awayNote: getBookmakerNote(csv1ParsedData, match, "away"),
        weightNote: 1.5
      },
      bookmaker2: {
        homeNote: getBookmakerNote(csv2ParsedData, match, "home"),
        awayNote: getBookmakerNote(csv2ParsedData, match, "away"),
        weightNote: 1
      }
    };

    if (
      !notes.bookmaker1.homeNote ||
      !notes.bookmaker2.homeNote ||
      !notes.bookmaker1.awayNote ||
      !notes.bookmaker2.awayNote
    ) {
      return;
    }

    const resultObject: MatchProbabilities = {
      id: match.id,
      match: match.name,
      scoring: {
        WINNER: {
          away: {
            score: calculateScore(
              notes.bookmaker1.awayNote,
              notes.bookmaker2.awayNote,
              match.actor2Name
            )
          },
          home: {
            score: calculateScore(
              notes.bookmaker1.homeNote,
              notes.bookmaker2.homeNote,
              match.actor1Name
            )
          }
        }
      },
      teamAwayName: match.actor2Name,
      teamHomeName: match.actor1Name,
      winnerName: ""
    };
    results.push(resultObject);
  });

  return results;
};

export default generateResponse;
