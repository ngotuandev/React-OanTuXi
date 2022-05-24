import {
  END_GAME,
  KEO_BUA_BAO,
  RANDOM_COMPUTER,
} from "../constants/oanTuXiConstants";

export let selectedBet = (id) => {
  return {
    type: KEO_BUA_BAO,
    payload: id,
  };
};
export let randomComputer = () => {
  return {
    type: RANDOM_COMPUTER,
  };
};

export let endGame = () => {
  return {
    type: END_GAME,
  };
};
