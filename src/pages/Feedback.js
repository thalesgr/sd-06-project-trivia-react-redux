import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchGravatar } from '../services';

class Feedback extends React.Component {
  constructor() {
    super();
    this.fetchProfileImg = this.fetchProfileImg.bind(this);
  }

  async componentDidMount() {
    this.fetchProfileImg();
  }

  fetchProfileImg() {
    const { hashGravatar } = this.props;
    fetchGravatar(hashGravatar);
  }

  handleFeedback() {
    const { correct } = this.props;
    const limitCorrectAnswer = 3;
    if (correct < limitCorrectAnswer) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { hashGravatar, userName, score, correct } = this.props;
    const src = `https://www.gravatar.com/avatar/${hashGravatar}`;
    return (
      <div className="feedback-container game-container">
        <div className="square-feedback square">
          <header className="profile-header" data-testid="header-player-name">
            <div className="profile-div">
              <div className="profile-rightside">
                <img
                  data-testid="header-profile-picture"
                  alt="profile"
                  src={ src }
                  width="120"
                />
                <p data-testid="header-player-name">
                  Jogador:
                  <span>{ userName }</span>
                </p>
              </div>
            </div>
            <h1 className="score">
              <p>
                Placar
                <span data-testid="header-score">{score}</span>
              </p>
            </h1>
          </header>
          <section>
            <h1>{`Acertou: ${correct} pergunta(s)!`}</h1>
            <p data-testid="feedback-text">{this.handleFeedback()}</p>
            <p data-testid="feedback-total-score">{score}</p>
            <p data-testid="feedback-total-question">{correct}</p>
          </section>
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hashGravatar: state.user.hash,
  userName: state.user.player.name,
  score: state.user.player.score,
  correct: state.user.player.correct,
});

Feedback.propTypes = {
  hashGravatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
