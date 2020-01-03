import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import QuestionSet from '../questionset/questionset'
import './admin.css'

class Admin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          rows: []
        };
      }
    
      handleAddRow = () => {
        this.setState((prevState, props) => {
        const row = { content: <QuestionSet />};
          return { rows: [...prevState.rows, row] };
        });
      };
    
      handleRemoveRow = () => {
        this.setState((prevState, props) => {
          return { rows: prevState.rows.slice(1) };
        });
      };

    render(){
        
        console.log(this.state);
        return(
      <div>
          <Header />
          <div className="bodyAdmin">
        <table>
          <tbody>
            {this.state.rows.map(row => (
              <tr>
                <td>{row.content}</td>
              </tr>
            ))}
            <tr>
              <button className="" onClick={this.handleAddRow}>
                +
              </button>
              {Boolean(this.state.rows.length) && (
                <button onClick={this.handleRemoveRow}>-</button>
              )}
            </tr>
          </tbody>
        </table>
        </div>
        <Footer />
      </div>
    );
    }

}

export default Admin;