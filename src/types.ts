export type MatchObject = {
  __path__: string;
  actor1: string;
  actor1Name: string;
  actor2: string;
  actor2Name: string;
  category: string;
  contestId: string;
  contestName: string;
  contestType: string;
  date: string;
  id: string;
  modificationDateTime: string;
  name: string;
  operators: {
    operator: string;
    operatorContestId: string;
    operatorContestName: string;
    operatorEventId: string;
    operatorEventName: string;
    operatorSportId: string;
    operatorSportName: string;
  }[];
  slug: string;
  sport: string;
  startDate: {
    __time__: string;
  };
  startDateTime: string;
  tags: string[];
  transactionId: string;
  type: string;
  version: number;
};

export type PronoScoreObject = {
  Id: string;
  Match: string;
  "Score Equipe 1": string;
  "Score Equipe 2": string;
};

export type MatchProbabilities = {
  id: string;
  match: string;
  scoring: {
    WINNER: {
      away: {
        score: number;
      };
      home: {
        score: number;
      };
    };
  };
  teamAwayName: string;
  teamHomeName: string;
  winnerName: string;
};
