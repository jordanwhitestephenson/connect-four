import React, { Component } from "react";

import { Row, Col } from "react-simple-flex-grid";
import Square from "./images/square.png";
import RedCircle from "./images/red.png";
import BlackCircle from "./images/black.png";
export class Rows extends Component {

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
				{this.props.row ? this.props.row.map((square, i) => (
					<Col
						displayname = "Col"
						id={i}
						key= {i}
						onClick={(e) => this.handleClick(rowPosition, i)}
						order={1}
						span={1}>
						{square === "X" ? <img src={RedCircle} alt = "square" className="img-responsive" /> :
						square === "O" ? <img src={BlackCircle} alt = "square" className="img-responsive" /> :
						<img src={Square} className="img-responsive" alt = "square" />}
					</Col>
				)): null}
			</Row>
		);
	}
}

export default Rows;
