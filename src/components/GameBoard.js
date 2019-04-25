import React, { Component } from "react";
import Rows from "./Row";
import Player1 from './images/Player1.png'
import Player2 from './images/Player2.png'




export class GameBoard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			player1: 1,
			player2: 2,
			currentPlayer: null,
			board: [
				[{}, {}, {}, {}, {}, {}, {}],
				[{}, {}, {}, {}, {}, {}, {}],
				[{}, {}, {}, {}, {}, {}, {}],
				[{}, {}, {}, {}, {}, {}, {}],
				[{}, {}, {}, {}, {}, {}, {}],
				[{}, {}, {}, {}, {}, {}, {}]
			],
			isConnect4: false,
			winningPlayer: ""

		};

		this.handleClick = this.handleClick.bind(this)
		this.checkHorizontal = this.checkHorizontal.bind(this)
		this.checkVertical = this.checkVertical.bind(this)
		this.checkDiagonalRight = this.checkDiagonalRight.bind(this)
		this.checkDiagonalLeft = this.checkDiagonalLeft.bind(this)
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.currentPlayer && prevState !== this.state) {
			this.checkHorizontal()
			this.checkVertical()
			this.checkDiagonalRight()
			this.checkDiagonalLeft()
		}

	}
	handleClick(playersMove) {
		const updatedBoard = this.state.board;
		if (this.state.currentPlayer === "player1") {
			updatedBoard[playersMove.rowPosition].splice(
				playersMove.indexInRow,
				1,
				"X"
			);
		}
		if (this.state.currentPlayer === "player2") {
			updatedBoard[playersMove.rowPosition].splice(
				playersMove.indexInRow,
				1,
				"O"
			);
		}
		this.setState({
			board: updatedBoard
		});

	}

	choosePlayer(player) {
		this.setState({
			currentPlayer: player,
		})
	}

	checkHorizontal() {
		const currentBoard = this.state.board
		let isConnect4 = false
		let winningPlayer = ""
		currentBoard.map(row => findFourInRow(row))

		function findFourInRow(row) {
			for (let i = 0; i < row.length; i++) {
				let count = 0
				for (let z = 0; z < row.length; z++) {
					if (row[i] === row[z]) {
						count++
					}
				}
				if (count === 4 && row[i] === "X") {
					isConnect4 = true;
					winningPlayer = "player1"	
				}
				if (count === 4 && row[i] === "O") {
					isConnect4 = true;
					winningPlayer = "player2"
				}
			}
		}
		if (isConnect4 && !this.state.isConnect4) {
			return this.setState({
				isConnect4: true,
				winningPlayer: winningPlayer
			})
		}
	}


	checkVertical() {
		const currentBoard = this.state.board
		let isConnect4 = false
		let winningPlayer = ""

		for (var i = 0; i < currentBoard.length; i++) {
			let count = 0
			for (var x = 0; x < currentBoard.length; x++) {
				if (currentBoard[x][i] === "X") {
					count++
				}
				if (currentBoard[x][i] === "O") {
					count++
				}
				if (count === 4 && currentBoard[x][i] === "O") {
					isConnect4 = true
					winningPlayer = "player2"
				}
				if (count === 4 && currentBoard[x][i] === "X") {
					isConnect4 = true
					winningPlayer = "player1"
				}
			}
			
		}
		if (isConnect4 && !this.state.isConnect4) {
			return this.setState({
				isConnect4: true,
				winningPlayer: winningPlayer
			})
		}
	}


	checkDiagonalRight() {
		console.log('checkDiagonalRight()')
		const currentBoard = this.state.board
		let isConnect4 = false
		let winningPlayer = ""
	
		// Check only if row is 3 or greater AND column is 3 or less
		for (let r = 3; r < 6; r++) {
			for (let c = 0; c < 4; c++) {
				if (currentBoard[r][c] === "X") {
					if (currentBoard[r][c] === currentBoard[r - 1][c + 1] &&
						currentBoard[r][c] === currentBoard[r - 2][c + 2] &&
						currentBoard[r][c] === currentBoard[r - 3][c + 3]) {
						isConnect4 = true
						winningPlayer = "player1"
					}
				}
				if (currentBoard[r][c] === "O") {
					if (currentBoard[r][c] === currentBoard[r - 1][c + 1] &&
						currentBoard[r][c] === currentBoard[r - 2][c + 2] &&
						currentBoard[r][c] === currentBoard[r - 3][c + 3]) {
						isConnect4 = true
						winningPlayer = "player2"
					}
				}
			}
		}

		if (isConnect4 && !this.state.isConnect4) {
			return this.setState({
				isConnect4: true,
				winningPlayer: winningPlayer
			})
		}
	}
	
	checkDiagonalLeft() {
		const currentBoard = this.state.board
		let isConnect4 = false
		let winningPlayer = ""

	// Check only if row is 3 or greater AND column is 3 or greater
		for (let r = 3; r < 6; r++) {
			for (let c = 3; c < 7; c++) {
				if (currentBoard[r][c] === "X") {
					if (currentBoard[r][c] === currentBoard[r - 1][c - 1] &&
						currentBoard[r][c] === currentBoard[r - 2][c - 2] &&
						currentBoard[r][c] === currentBoard[r - 3][c - 3]) {
						isConnect4 = true
						winningPlayer = "player1"
					}
				}
				if (currentBoard[r][c] === "O") {
					if (currentBoard[r][c] === currentBoard[r - 1][c - 1] &&
						currentBoard[r][c] === currentBoard[r - 2][c - 2] &&
						currentBoard[r][c] === currentBoard[r - 3][c - 3]) {
						isConnect4 = true
						winningPlayer = "player2"
					}
				}
			}
		}

		if (isConnect4 && !this.state.isConnect4) {
			return this.setState({
				isConnect4: true,
				winningPlayer: winningPlayer
			})
		}
	}

	checkDraw() {
		const currentBoard = this.state.board
		let isDraw = false
		for (let r = 0; r < 6; r++) {
			for (let c = 0; c < 7; c++) {
				if (currentBoard[r][c] === null) {
					isDraw = true;
				}
			}
		}
		if (!isDraw && !this.state.isConnect4) {
			return this.setState({
				isDraw: true,
				isConnect4: false,
			})
		}
	}

	render() {
		let chosenPlayer = this.state.currentPlayer


		return (
			<div>
				<div className="choose_player_div">
					{!chosenPlayer ? <h2>Choose Player</h2> :  !this.state.isConnect4  ? <h2>Game on....</h2>  : null}
					<div className="flex_box_default">
						<div id = "player1ID" className={chosenPlayer === 'player1' ? "selected" : "not_selected"} onClick={(e) => this.choosePlayer("player1")}>
							<img src={Player1} alt="player1" className="img-responsive" />
						</div>
						<div  id = "player2ID" className={chosenPlayer === 'player2' ? "selected" : "not_selected"} onClick={(e) => this.choosePlayer("player2")}>
							<img src={Player2} alt="player2" className = "img-responsive"/>
						</div>
					</div>
					{chosenPlayer ? <p className ="chosenPlayerP">Chosen Player: {chosenPlayer}</p> : null}
					
				</div>
				{this.state.isConnect4 ? <h1>Game Over...congrats {this.state.winningPlayer}!</h1> : this.state.isDraw ? <h1>We have a draw!</h1> : chosenPlayer ?
					<tbody>
						
							{this.state.board.map((row, i) => (<Rows chosenPlayer={chosenPlayer} key={i} rowPosition={i} row={row} play={this.handleClick} />))}
						
					</tbody>
				: null}
			</div>

		);
	}
}

export default GameBoard;
