import {
  END_GAME,
  KEO_BUA_BAO,
  RANDOM_COMPUTER,
} from "../constants/oanTuXiConstants";

let initialState = {
  dataGame: [
    {
      id: 1,
      url: "./video_23_game_oan_tu_ti/keo.png",
      selected: true,
    },
    {
      id: 2,
      url: "./video_23_game_oan_tu_ti/bao.png",
      selected: false,
    },
    {
      id: 3,
      url: "./video_23_game_oan_tu_ti/bua.png",
      selected: false,
    },
  ],
  results: "",
  goals: 0,
  plays: 0,
  computer: { id: 1, url: "./video_23_game_oan_tu_ti/keo.png" },
};

export const OanTuXiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case KEO_BUA_BAO: {
      let dataGameNew = [...state.dataGame];
      dataGameNew = dataGameNew.map((item) => {
        return { ...item, selected: false };
      });
      let index = dataGameNew.findIndex((data) => data.id === payload);
      if (index !== -1) {
        dataGameNew[index].selected = true;
      }
      state.dataGame = dataGameNew;
      return { ...state };
    }

    case RANDOM_COMPUTER: {
      let random = Math.floor(Math.random() * state.dataGame.length);
      let arrRandom = state.dataGame[random];

      state.computer = arrRandom;
      return { ...state };
    }

    case END_GAME: {
      let idComputer = state.computer.id;
      let idPlayer = state.dataGame.find((item) => item.selected === true).id;

      if (
        (idPlayer == 1 && idComputer == 2) ||
        (idPlayer == 2 && idComputer == 3) ||
        (idPlayer == 3 && idComputer == 1)
      ) {
        state.goals += 1;
        state.results = "Bạn là người chiến thắng!";
      } else if (idPlayer === idComputer) {
        state.goals += 0;
        state.results = "Hòa rồi! Tiếp tục nào";
      } else {
        state.goals += 0;
        state.results = "Bạn đã thua, cố gắng lần sau nhé!";
      }

      state.plays++;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
