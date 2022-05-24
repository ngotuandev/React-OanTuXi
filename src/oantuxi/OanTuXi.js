import React, { Component } from "react";
import { connect } from "react-redux";
import "./buble.css";
import {
  endGame,
  randomComputer,
  selectedBet,
} from "./redux/actions/oanTuXiActions";

class OanTuXi extends Component {
  render() {
    let {
      goals,
      plays,
      dataGame,
      results,
      computer,
      selectedToPlay,
      randomComputerImg,
    } = this.props;

    let keyframe = `@keyframes random${Date.now()} {
      0 {top: -35px;}
      25% {top: 40px;}
      50% {top: -35px;}
      75% {top: 40px;}
      100% {top: 0;}
    }`;

    return (
      <div className="bg_game">
        <style>{keyframe}</style>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="speech-bubble">
                <img
                  className="mt-3"
                  style={{
                    transform: "rotate(-60deg)",
                  }}
                  width={100}
                  height={100}
                  src={dataGame.find((item) => item.selected === true).url}
                  alt={dataGame.find((item) => item.selected === true).url}
                />
              </div>
              <img
                width={180}
                src="./video_23_game_oan_tu_ti/player.png"
                alt=""
              />
              <div className="row">
                {dataGame.map((item) => {
                  let border = {};
                  if (item.selected) {
                    border = {
                      border: "3px solid orange",
                    };
                  }

                  return (
                    <div className="col-4" key={item.id}>
                      <button
                        onClick={() => {
                          selectedToPlay(item.id);
                        }}
                        className="btn-cus"
                        style={border}
                      >
                        <img
                          width={50}
                          height={50}
                          src={item.url}
                          alt={item.url}
                          className="bg-light"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-6" style={{ width: "450px" }}>
              {results === "" ? (
                <h1 className="text-warning mt-4">
                  Chào mừng bạn đến với game{" "}
                  <span className="text-danger">"Oẳn tù xì"</span>
                </h1>
              ) : (
                <h1 className="text-warning mt-4">{results}</h1>
              )}
              <h3 className="text-success-cus">
                Số bàn thắng: <span className="text-warning">{goals}</span>
              </h3>
              <h2 className="text-success-cus">
                Số bàn chơi: <span className="text-warning">{plays}</span>
              </h2>
              <button
                className="btn btn-success"
                onClick={() => {
                  randomComputerImg();
                }}
              >
                Play game
              </button>
            </div>
            <div className="col-3">
              <div className="speech-bubble">
                <img
                  width={100}
                  height={100}
                  className="mt-3"
                  style={{
                    position: "absolute",
                    left: "22%",
                    transform: "rotate(180deg)",
                    animation: `random${Date.now()} 0.1s`,
                  }}
                  src={computer.url}
                  alt={computer.url}
                />
              </div>
              <img
                width={180}
                src="./video_23_game_oan_tu_ti/playerComputer.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    dataGame: state.dataGame,
    goals: state.goals,
    plays: state.plays,
    computer: state.computer,
    results: state.results,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    selectedToPlay: (id) => {
      dispatch(selectedBet(id));
    },
    randomComputerImg: () => {
      let count = 1;
      let randomComputerItem = setInterval(() => {
        dispatch(randomComputer());
        count++;
        if (count > 10) {
          clearInterval(randomComputerItem);
          dispatch(endGame());
        }
      }, 100);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OanTuXi);
