import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GameBoard from './components/GameBoard'
import Row from './components/Row'
import { shallow, mount } from 'enzyme';
import sinon from 'sinon'
let exampleState = [
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}]
]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App component', () => {
  it('Able to choose player 1', () => {
    const wrapper = shallow(<GameBoard />);
    const choosePlayerOne = wrapper.find('#player1ID');
    choosePlayerOne.simulate('click');
    const text = wrapper.find('.chosenPlayerP').text();
    expect(text).toEqual('Chosen Player: player1');
  });
});

describe('App component', () => {
  it('Able to choose player 2', () => {
    const wrapper = shallow(<GameBoard />);
    const choosePlayerTwo = wrapper.find('#player2ID');
    choosePlayerTwo.simulate('click');
    const text = wrapper.find('.chosenPlayerP').text();
    expect(text).toEqual('Chosen Player: player2');
  });
});

describe('App component', () => {
  it('GameBoard is rendered', () => {
    const wrapper = shallow(<GameBoard />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('App component', () => {
  it('Win game if 4 in a row (vertically)', () => {
    let expectedState = [[{}, {}, {}, {}, {}, {}, {}],
    [{}, 'X', 'X', 'X', 'X', {}, {}],
    [{}, {}, {}, 'O', 'O', {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}]]
    let wrapper = shallow(<GameBoard />);
    wrapper.setState({ board: expectedState })
    wrapper.instance().checkHorizontal()
    expect(wrapper.state().isConnect4).toEqual(true)
    expect(wrapper.state().winningPlayer).toEqual('player1');
  });
});

describe('App component', () => {
  it('Win game if 4 in a row (vertically)', () => {
    let expectedState = [
      ["X", {}, "X", {}, {}, {}, {}],
      [{}, {}, "X", {}, 'O', 'O', {}],
      [{}, {}, "X", {}, 'O', {}, {}],
      [{}, {}, "X", {}, 'O', {}, {}],
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}]
    ]
    let wrapper = shallow(<GameBoard />);
    wrapper.setState({ board: expectedState })
    wrapper.instance().checkVertical()
    expect(wrapper.state().isConnect4).toEqual(true)
    expect(wrapper.state().winningPlayer).toEqual('player1');
  });
});


//Row Component Testing
describe('App component', () => {
  it('Board should update when square is clicked', () => {
    const mapped = exampleState.map(row => row)
    const parent = shallow(<GameBoard />)
    parent.setState({ currentPlayer: 'player1' })
    const parentInstance = parent.instance()
    const handleClickStub = sinon.spy(parentInstance, 'handleClick')

    const wrapper = mount(<Row row={mapped} play={handleClickStub} rowPosition={1} />)
    wrapper.find({ displayname: "Col" }).at(2).simulate('click')
    let expectedState = [[{}, {}, {}, {}, {}, {}, {}],
    [{}, 'X', {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}]]

    expect(parent.state().board).toEqual(expectedState);
  });
});

