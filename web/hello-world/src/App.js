import React, { Component } from 'react';
import './App.css';

const source = "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Routes:[
        {
           OriginId: '',
           DestinationId: '',
           QuoteIds: [],
           Price: '',
           QuoteDateTime: ''
        }
      ]
    }
  }


  fetchData(origin,destination,inbound,outbound){

    fetch(`${source}/${"GB"}/${"GBP"}/${"en-GB"}/${origin}/${destination}/${inbound}/${outbound}/${"?apiKey=ha348334469154725681039185711735"}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
    }}).then((res) => res.json() )
        .then((data)=>{
          console.log(data);
          this.setState({
            Routes : data.Routes
          })
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ');
        })
      }

  componentDidMount() {
    this.fetchData("US","anywhere","anytime","anytime");
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
         <label>Origin: </label>
         <input type="search" ref="origin"  />
         <label>Destination: </label>
         <input type="search" ref="destination"  />
         <label>Outbound Date: </label>
         <input type="date" ref="outbound"  />
         <label>Inbound Date: </label>
         <input type="date" ref="inbound"  />
         </form>
      </div>
    )
  }

  handleForm(e) {
   e.preventDefault();
    let origin = this.refs.origin.value;
    let destination = this.refs.origin.value;
    let outbound = this.refs.origin.value;
    let inbound = this.refs.origin.value;

    this.props.fetchData(origin,destination,inbound,outbound);
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
          <h1></h1>
]        </div>
      );
  }
}



export default App;
