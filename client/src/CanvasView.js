import React from "react";
import Immutable from "immutable";
import Drawing from "./Drawing";


class CanvasView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      isDrawing: false,
      lines: new Immutable.List()
    };
    this.relativeCoordinatesForEvent = this.relativeCoordinatesForEvent.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }

  handleMouseUp() {
    console.log(this.state.lines);
    this.setState({ isDrawing: false });
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
    console.log(this.state.lines);

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => {
      return {
        lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point)),
      };
    });
  }

  render() {
    return (
      <div
        id={this.state.id}
        ref="drawArea"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        <Drawing lines={this.state.lines} />
      </div>
    );
  }
}


export default CanvasView;