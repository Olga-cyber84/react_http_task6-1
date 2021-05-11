import './App.css';
import React, { Component } from 'react';
import Watches from './components/Watches/Watches';
import {nanoid} from 'nanoid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      city: "",
      offset: "",
      data: [],
     };

  }
  
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
  });
  }
  
  handleAdd = (evt) => {
    evt.preventDefault();
    const {city, offset, data} = this.state;
    if (city && offset) {
      this.setState({
        data: [...data, {city: city, offset: offset, handleDelete: this.handleDelete, id: nanoid()} ],
        city: "",
        offset: ""
      });
    } 
  }

  handleDelete = (id) => {
    this.setState({ 
      data: this.state.data.filter(watch => watch.id !== id),
     });
  }

  render() { 
    const {city, offset, data} = this.state;
    return ( 
      <form onSubmit={this.handleAdd}>
        <div className="container">
          <div className="title-element">Название</div>
          <div className="title-element">Временная зона</div>
        </div>
        <div className="container">
          <div className="field-element">
            <input type="text" name="city" onChange={this.handleChange} value={city}/>
          </div>
          <div className="field-element">
            <input type="text" name="offset" onChange={this.handleChange} value={offset}/>
          </div>
          <div className="field-element"> 
            <button>Добавить</button>
          </div>
        </div>
        {data.map(watch => <Watches key={watch.id} data={watch}/>)}
      </form>
     );
  }
}
 
export default App;
