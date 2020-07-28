import React from 'react';
import Header from "./Header";
import Description from "./Description";
import Footer from "./Footer";
import './App.css';
import Immutable from 'immutable';
import Drawing from "./Drawing";
import axios from "axios";
import { processImmutableList } from "./utils";


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: false,
      lines: new Immutable.List()
    }
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.relativeCoordinatesForEvent = this.relativeCoordinatesForEvent.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.submitDrawing = this.submitDrawing.bind(this);
    this.drawArea = React.createRef();
  }


  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) { return; }
    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => {
      return {
        lines: prevState.lines.push(Immutable.List([point])),
        isDrawing: true,
      };
    });
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) { return; }
    // console.log(this.state.lines);

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => {
      return {
        lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point)),
      };
    });
  };

  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.drawArea.current.getBoundingClientRect();
    console.log(`Bounding Rect Width: ${boundingRect.width}`);
    console.log(`Bounding Rect Height: ${boundingRect.height}`);
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }

  submitDrawing() {
    axios.get("http://localhost:8080/").then(console.log);
    // console.log(`Data: ${this.state.lines}`);
    // console.log(this.state.lines.flatMap);
    // const point = this.state.lines;
    // console.log(point);
    processImmutableList(this.state.lines);
  }

  render() {
    return (
      <section>
        <Header id="header" />
        <Description
          id="description"
          handleSubmit={this.submitDrawing}
          lines={this.state.lines}
        />
        <div
          id="canvas-view"
          ref={this.drawArea}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          lines={this.state.lines}
        >
          <Drawing lines={this.state.lines} />
        </div>
        <Footer id="footer" />
      </section>
    )
  }

}

export default App;