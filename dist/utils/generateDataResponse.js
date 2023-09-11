"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateScore = (bookmarker1Rating, bookmarker2Rating, team) => {
    const weightBookmarker1 = 1.5;
    const weightBookmarker2 = 1;
    const averageRating = (bookmarker1Rating * weightBookmarker1 +
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
const getBookmakerNote = (parsedData, match, team) => {
    var _a;
    const note = Number((_a = parsedData === null || parsedData === void 0 ? void 0 : parsedData.find((row) => row.Id === match.id)) === null || _a === void 0 ? void 0 : _a[`Score Equipe ${team === "home" ? 1 : 2}`]);
    return isNaN(note) ? null : note;
};
const generateDataResponse = (jsonlParsedData, csv1ParsedData, csv2ParsedData) => {
    const results = [];
    const filteredContests = jsonlParsedData.filter((match) => match.contestId === "3cbf5031-b192-4881-9650-4b48970fc7a9");
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
        if (!notes.bookmaker1.homeNote ||
            !notes.bookmaker2.homeNote ||
            !notes.bookmaker1.awayNote ||
            !notes.bookmaker2.awayNote) {
            return;
        }
        const resultObject = {
            id: match.id,
            match: match.name,
            scoring: {
                WINNER: {
                    away: {
                        score: calculateScore(notes.bookmaker1.awayNote, notes.bookmaker2.awayNote, match.actor2Name)
                    },
                    home: {
                        score: calculateScore(notes.bookmaker1.homeNote, notes.bookmaker2.homeNote, match.actor1Name)
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
exports.default = generateDataResponse;
