import React from "react";


class Description extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    this.props.handleSubmit();
  }

  render() {
    return (
        <div id={this.props.id}>
            <p className="prettify">
                This is a very simple application to simulate what real-world machine learning applications look like
                in web applications. The frontend is built in React which then takes your drawing and trys to makes
                its best guess at what digit you've drawn.
                <br /><br />
                The request to the server is received from a NodeJS + ExpressJS
                backend which then responds with the job's ID. The NodeJS + ExpressJS backend then submits the request to
                a job queue which is then processed by some worker. The workers are setup to read from the job queue and
                utilize a serialized pre-trained model in order to perform inference.
                <br /><br />
                The result is then saved to a 
                relational database where the frontend makes periodice request to the database to see if the job has 
                been completed. Once the job is completed, the frontend is updated with what it believes to be the digit
                you have drawn.
            </p>
            <p className="prettify">My Best Guess: <span></span></p>
            <div className="buttons">
                <button onClick={this.handleSubmit}>Can I Guess Now?</button>
            </div>
        </div>
    );
  }
}


export default Description;