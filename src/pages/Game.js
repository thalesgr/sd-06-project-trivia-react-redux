import React, { Component } from 'react';
import { questionsAPI } from '../servicesAPI';
import Header from './Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const five = 5;
    const questions = (token !== '') ? await questionsAPI(five, token) : [];
    this.saveQuestions(questions);
  }

  saveQuestions(questions) {
    this.setState({ questions });
  }

  handleAnswers(questionObj) {
    const incorrectAnswers = questionObj.incorrect_answers
      .map((incorrect) => ({ ans: incorrect, type: 'incorrect' }));
    const correctAnswer = { ans: questionObj.correct_answer, type: 'correct' };
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const numberOfAnswers = allAnswers.length;
    const allAnswersRandom = [];
    for (let i = 0; i < numberOfAnswers; i += 1) {
      const indexRandom = Math.round(Math.random() * (allAnswers.length - 1));
      allAnswersRandom[i] = allAnswers[indexRandom];
      allAnswers.splice(indexRandom, 1);
    }

    let indexOfIncorrectAnswers;
    return allAnswersRandom.map((answer, index) => {
      const { ans, type } = answer;
      const testId = (type === 'correct') ? 'correct-answer' : `wrong-answer-${ii}`;
      indexOfIncorrectAnswers = (type === 'incorrect')
        ? indexOfIncorrectAnswers + 1 : indexOfIncorrectAnswers;
      return (<p key={ index } data-testid={ testId }>{ ans }</p>);
    });
  }

  handleQuestions(questions) {
    return questions.map((questionObj, index) => (
      <div key={ index }>
        <p data-testid="question-category">{ questionObj.category }</p>
        <p data-testid="question-text">{ questionObj.question }</p>
        { this.handleAnswers(questionObj) }
      </div>
    ));
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Header />
        { questions.length > 0 ? this.handleQuestions(questions) : 'Sem Questões'}
      </div>
    );
  }
}

export default Game;
