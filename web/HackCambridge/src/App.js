import React, { Component } from 'react';
import './App.css';

const source = "https://jsonplaceholder.typicode.com/posts/";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      title:''
    }
  }


  fetchData(id){

    fetch(`${source}/${id}`)
      .then((res) => res.json() )
        .then((data)=>{
          this.setState({
            id:data.id,
            title:data.title
          })
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ');
        })
      }

  componentDidMount() {
    this.fetchData(3);
  }

  render(){
    return (
      <div>
        <Info data={this.state} />
      </div>
    )
  }

}


class Info extends React.Component {
  render() {
    let data = this.props.data;
    if (data.notFound === 'Not Found')
      return (
            <h2>Oops !!!</h2>
      );
    else
      return (
        <div>
          <h1>{data.id}</h1>
          <h1>{data.title}</h1>
        </div>
      );
  }
}



export default App;
