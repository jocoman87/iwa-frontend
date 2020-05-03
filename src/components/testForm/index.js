import React from 'react';
import './style.scss';

import axios from 'axios';
import { todos_api, todo_items_api } from '../../commons/api/endpoint';

class ExampleForm extends React.Component {
  constructor() {
    super();

    this.state = {
      title: null,
      description: null,
      total_questions: 0,
      add_question: false,
      answers_list: [],
      questionCR: null,
      answerCR: [
        {
          answer01: null,
        },
        {
          answer02: null,
        },
        {
          answer03: null,
        }
      ],
      correctCR: null
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.createNewTodos = this.createNewTodos.bind(this);
    this.updateExample = this.updateExample.bind(this);

    this.createNewItemTodo = this.createNewItemTodo.bind(this);
    this.updateItemTodo = this.updateItemTodo.bind(this);
    this.moreQuestion = this.moreQuestion.bind(this);

    this.onChangeQuestionCR = this.onChangeQuestionCR.bind(this);
    this.onChangeAnswerCR_1 = this.onChangeAnswerCR_1.bind(this);
    this.onChangeAnswerCR_2 = this.onChangeAnswerCR_2.bind(this);
    this.onChangeAnswerCR_3 = this.onChangeAnswerCR_3.bind(this);
    this.onChangeCorrectCR = this.onChangeCorrectCR.bind(this);
  }

  onChangeName(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeQuestion(e) {
    this.setState({
      total_questions: e.target.value
    })
  }

  createNewTodos() {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      }
    }

    if (this.state.title === null || this.state.total_questions === 0 || this.description === null) {
      alert('Error: ....')
      return
    }

    axios.post(todos_api, this.state, config).then((response) => {
      alert('Create Example Successfully !');
      this.props.history.push(`/edit-test/${response.data.id}/items`)
      window.location.reload();
    })
  }

  updateExample() {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      }
    }

    axios.put(`${todos_api}/${this.props.match.params.id}`, this.state, config).then(() => {
      alert('Update Example Successfully !');
      this.props.history.push('/todos');
      window.location.reload();
    })
  }

  moreQuestion() {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      }
    }

    const data = {
      "question": null,
      "correct": null,
      "answers": null,
      "name": "Example",
      "done": false
    }
    axios.post(`${todos_api}/${this.props.match.params.id}/items`, data, config).then(() => {
      this.props.history.push(`/edit-test/${this.props.match.params.id}/items`)
      window.location.reload();
    })
  }

  createNewItemTodo() {
    let answers01 = localStorage.getItem('answers01')
    let answers02 = localStorage.getItem('answers02')
    let answers03 = localStorage.getItem('answers03')

    const dataAnserts = [answers01, answers02, answers03]

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      }
    }

    const data = {
      "question": this.state.questionCR,
      "correct": this.state.correctCR,
      "answers": dataAnserts,
      "name": "Example",
      "done": false
    }
    axios.post(`${todos_api}/${this.props.match.params.id}/items`, data, config).then(() => {
      alert('Successfully !');
      this.props.history.push(`/edit-test/${this.props.match.params.id}/items`)
      window.location.reload();
    })
  }

  updateItemTodo(item) {
    let answers01 = localStorage.getItem('answers01')
    let answers02 = localStorage.getItem('answers02')
    let answers03 = localStorage.getItem('answers03')

    const dataAnserts = [answers01, answers02, answers03]

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      }
    }

    const data = {
      "question": this.state.questionCR,
      "correct": this.state.correctCR,
      "answers": dataAnserts,
      "name": "Example",
      "done": false
    }
    axios.put(`${todos_api}/${this.props.match.params.id}/items/${item.id}`, data, config).then(() => {
      alert('Successfully !');
      this.props.history.push(`/edit-test/${this.props.match.params.id}/items`)
      window.location.reload();
    })
  }

  removeItemTodo(item) {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: token,
      }
    }

    if (window.confirm(`Are you sure to remove - ${item.name}  ? `)) {
      axios.delete(`${todos_api}/${this.props.match.params.id}/items/${item.id}`, config).then(() => {
        window.location.reload();
      })
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const userId = this.props.match.params.id;

    const config = {
      headers: {
        Authorization: token,
      }
    }

    if (userId) {
      const item_list = todo_items_api(userId);

      axios.get(item_list, config).then((response) => {
        this.setState({
          answers_list: response.data
        })
      })
    }

    if (userId) {
      axios.get(`${todos_api}/${userId}`, config).then((response) => {
        // window.location.reload();

        const test = response.data;

        this.setState({
          title: test.title,
          description: test.description,
          total_questions: test.total_questions,
          add_question: true
        })
      })
    }
  }

  onChangeQuestionCR(e) {
    this.setState({
      questionCR: e.target.value
    })
  }

  onChangeAnswerCR_1(e) {
    localStorage.setItem('answers01', e.target.value);
  }

  onChangeAnswerCR_2(e) {
    localStorage.setItem('answers02', e.target.value);
  }

  onChangeAnswerCR_3(e) {
    localStorage.setItem('answers03', e.target.value);
  }

  onChangeCorrectCR(e) {
    this.setState({
      correctCR: e.target.value
    })
  }

  render() {
    const dataList = this.state.answers_list.length;
    return (
      <div id="new-test-page" className="text-center">
        <div className="container">
          <div>
            {
              !this.props.match.params.id ? <h3><strong>CREATE NEW TEST</strong></h3> : <h3><strong>EDIT TEST</strong></h3>
            }
          </div>
          <hr />
          <br />
          <form className="text-left">
            <div className="form-group">
              <label htmlFor="exampleFormControlInput0"><strong>Title</strong></label>
              <input type="text" className="form-control" id="exampleFormControlInput0" value={this.state.title || 'Your Title'} placeholder="Title" onChange={this.onChangeName} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1"><strong>Description</strong></label>
              <textarea className="form-control" id="exampleFormControlInput1" placeholder="Description" value={this.state.description || 'Your Description'} onChange={this.onChangeDescription} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect3"><strong>Questions</strong></label>
              <select className="form-control" id="exampleFormControlSelect3" onChange={this.onChangeQuestion} value={this.state.total_questions}>
                <option value="0">Select</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
              </select>
            </div>
          </form>
          < br />
          < br />
          <div className="btn-action text-left">
            {
              !this.props.match.params.id ? <button className="cuzbtn btn-default" onClick={this.createNewTodos}>Create</button> : <button className="cuzbtn btn-warning" onClick={this.updateExample}>Update</button>
            }
            <button className="cuzbtn btn-secondary" onClick={() => this.props.history.push('/todos')}>Back</button>
          </div>
          <br />
          <br />
          <hr />
          <br />
          {
            this.state.add_question ?
              <div className="text-left">
                <h3><strong>You need to add total [ {this.state.total_questions} ] question(s) for this example:</strong></h3>
                <br />
                {
                  dataList > 0 ?
                    this.state.answers_list.map((item, i) => {
                      let newObject = JSON.parse(item.answers);

                      if(newObject === null) {
                        newObject =  [null, null, null]
                      }


                      console.log(newObject)

                      return (
                        <div key={i} >
                          <div className="ans-question">
                            <div className="form-group">
                              Question: [ {i + 1} ]
                              <br />
                              <br />
                              <h5><strong><input className="form-control" type="text" value={item.question} onChange={this.onChangeQuestionCR} /></strong></h5>
                            </div>
                            <div className="form-group">
                              <ol>
                              <ol>
                                <li><input className="form-control" type="text" value={newObject[0]} placeholder="answers ..." onChange={this.onChangeAnswerCR_1} /><br /></li>
                                <li><input className="form-control" type="text" value={newObject[1]} placeholder="answers ..." onChange={this.onChangeAnswerCR_2} /><br /></li>
                                <li><input className="form-control" type="text" value={newObject[2]} placeholder="answers ..." onChange={this.onChangeAnswerCR_3} /><br /></li>
                              </ol>
                              </ol>
                            </div>
                            <div>Correct answer: <strong> <input className="form-control" type="text" value={item.correct} onChange={this.onChangeCorrectCR} /></strong></div>
                            <hr />
                          </div>
                          <div className="btn-action text-left float-right">
                            {
                              !this.props.match.params.id ? <button className="cuzbtn btn-default" onClick={() => this.createNewItemTodo(item)}>Save</button> : <button className="cuzbtn btn-success" onClick={() => this.updateItemTodo(item)}>Save</button>
                            }
                            <button className="cuzbtn btn-danger" onClick={() => this.removeItemTodo(item)}>Remove</button>
                          </div>
                          <br />
                          <br />
                          <br />
                          <br />
                        </div>
                      )
                    })
                    : <div>
                      <div className="ans-question">
                        <div className="form-group">
                          Question: [ 1 ]
                          <br />
                          <br />
                          <h5><strong><input className="form-control" type="text" placeholder="Question" onChange={this.onChangeQuestionCR} /></strong></h5>
                        </div>
                        <div className="form-group">
                          <ol>
                            <li><input className="form-control" type="text" value={this.state.answerCR.answer01} placeholder="answers ..." onChange={this.onChangeAnswerCR_1} /><br /></li>
                            <li><input className="form-control" type="text" value={this.state.answerCR.answer02} placeholder="answers ..." onChange={this.onChangeAnswerCR_2} /><br /></li>
                            <li><input className="form-control" type="text" value={this.state.answerCR.answer03} placeholder="answers ..." onChange={this.onChangeAnswerCR_3} /><br /></li>
                          </ol>
                        </div>
                        <div>Correct answer: <strong> <input className="form-control" type="text" onChange={this.onChangeCorrectCR} placeholder="correct answer" /></strong></div>
                        <hr />
                      </div>
                      <div className="btn-action text-right float-right">
                        <button className="cuzbtn btn-default" onClick={() => this.createNewItemTodo()}>Create</button>
                      </div>
                      <br />
                      <br />
                    </div>
                }
                <div className="text-center">
                  {this.state.total_questions !== dataList ?
                    <button className="cuzbtn more btn-info" onClick={() => this.moreQuestion()}>More Question</button>
                    : <button className="cuzbtn btn-secondary" onClick={() => this.props.history.push('/todos')}>Back</button>
                  }

                </div>
              </div>
              :
              null
          }
        </div>
      </div>
    );
  }
}


export default ExampleForm;
