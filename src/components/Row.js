import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-simple-flex-grid";
import Square from "./images/square.png";
import RedCircle from "./images/red.png";
import BlackCircle from "./images/black.png";
export class Rows extends Component {
	static propTypes = {
		prop: PropTypes
	};
	handleClick(rowPosition, i) {
		const playersMove = {
			rowPosition: rowPosition,
			indexInRow: i
		}
		this.props.play(playersMove)
	}

	render() {


		const rowPosition = this.props.rowPosition;
		return (
			<Row gutter={10} style={{ display: "flex" }}>
				{this.props.row.map((square, i) => (
					<Col
						id={i}
						rowPosition={rowPosition[i]}
						onClick={(e) => this.handleClick(rowPosition, i)}
						order={1}
						span={1}>
						{square === "X" ? <img src={RedCircle} className="img-responsive" /> :
						square === "O" ? <img src={BlackCircle} className="img-responsive" /> :
						<img src={Square} className="img-responsive" />}
					</Col>
				))}
			</Row>
		);
	}
}

export default Rows;
