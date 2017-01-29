import React, { Component } from 'react';
import './App.css';

const source = "https://jsonplaceholder.typicode.com/posts/";

class App extends Component {

  searchId = 1;

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
    this.fetchData(this.searchId);
  }

  render(){
    return (
      <div>
        <Search fetchData={this.fetchData.bind(this)}/>
        <Info data={this.state} />
      </div>
    )
  }

}

class Search extends React.Component {
 

  render() {
    return (
      <div className="search--box">
         <form onSubmit={this.handleForm.bind(this)}>
           <label><input type="search" ref="id"  /></label>
         </form>
      </div>
    )
  }

  handleForm(e) {
   e.preventDefault();
    let id = this.refs.id.value;
    this.props.fetchData(id);
    this.refs.id.value = '';
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
