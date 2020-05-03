import React from 'react';
import './styles.scss';

import {Link} from 'react-router-dom';

import axios from 'axios';
import { todos_api } from '../../commons/api/endpoint';

class Todos extends React.Component {
  constructor() {
    super();

    this.state = {
      sample_data: []
    }
    this.deleteTest = this.deleteTest.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: token,
      }
    }

    axios.get(todos_api, config).then((response) => {
      this.setState({
        sample_data: response.data
      })
    })
  }

  deleteTest(item) {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: token,
      }
    }

    if(window.confirm(`Test - ${item.title} - will be delete forever and can not recover ? !`)) {
      axios.delete(`${todos_api}/${item.id}` , config).then(() => {
        window.location.reload();
      })
    }    
  }

  render() {
    const { sample_data } = this.state;
    if (sample_data.length === 0) {
      return <div> No data !</div>;
    } else {
      return (
        <div id="test-page" className="text-center">
          <div className="container">
            <div className="btn-action text-left">
              <Link to={'/new-test'}>
                <button className="cuzbtn btn-default">New Test</button>
              </Link>
            </div>
            <br />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Questions</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-left">
                {
                  sample_data.map((item, i) => {
                    return (
                      <tr key={i.toString()}>
                        <td><strong>#{item.id}</strong></td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td className="text-center">{item.total_questions}</td>
                        <td className="custom-td">
                          <Link to={'/edit-test/' + item.id + '/items'}><button className="btn-edit">Edit</button></Link>
                          <button className="btn-delete" onClick={() => this.deleteTest(item)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}


export default Todos;
