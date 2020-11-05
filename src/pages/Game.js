import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getQuestions } from '../actions';
import Header from '../components/header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      first: {},
      second: {},
      third: {},
      fourth: {},
      fifth: {},
    };
  }

  componentDidMount() {
    const { info, isFetching, APIQuestions } = this.props;
    localStorage.setItem('token', info.token);
    // if (isFetching) {
    //   console.log('Lading');
    // } else {
    //   console.log(APIQuestions.results[0]);
    // }
  }

  render() {
    const { isFetching } = this.props;
    return (
      <section className="game-container">
        <section className="game-header">
          <Header />
        </section>
        <section className="game-question">
          <section className="game-category">categoria</section>
          <section className="game-text">texto da pergunta</section>
        </section>
        {/* { isFetching
          ? <p>Carregando...</p>
          : <section className="game-answers">{teste.incorrect_answers.map((i) => <p>{i}</p>)}</section>} */}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.token.response,
  APIQuestions: state.allQuestions.results,
  isFetching: state.allQuestions.isFetching,
});

// const mapDispatchToProps = (dispatch) => ({

// });

Game.propTypes = {
  info: PropTypes.shape().isRequired,
  // questions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
