/**
 * title: HOME_TITLE
 */
import styles from './index.less'
import React, { Component } from 'react';

class Child extends Component {
  constructor(props) {
    super(props);
    this.delList = this.delList.bind(this);
  }

  delList(e) {
    let index = e.target.getAttribute("data-id");
    this.props.onChange(index);
  }

  render() {
    const { status } = this.props
    const { dataActive, dataAll, dataComplete } = this.props
    if (status == 'active') {
      return dataActive.map((item, index) => {
        return <p key={index}><input onClick={this.delList} data-id={index} className={styles.checkbox} type="checkbox" />{item}</p>
      })
    }
    else if (status == 'all') {
      return dataAll.map((item, index) => {
        return <p key={index}>
          {item}</p>
      })
    }
    else if (status == 'completed') {
      return (
        dataComplete.map((item, index) => {
          return <p key={index}>
            <strong className={styles.line}>{item}</strong></p>
        })

      )
    }

  }

}

//父组件
class Home extends Component {
  constructor(props) {
    super(props);
    this.listChange = this.listChange.bind(this);
  }
  state = {
    list: [],
    allList: [],
    comList: [],
    targetValue: '',
    num: 0,
    status: 'active'
  }

  listChange(index) {

    let oldList = this.state.list
    let comList = this.state.comList
    comList.push(oldList[index])
    oldList.splice(index, 1)

    this.setState({
      comList,
      list: oldList,
      num: this.state.num - 1
    })
  }

  // 增加一条
  addOne() {
    let newlist = this.state.list
    let newAll = this.state.allList

    newlist.push(this.state.targetValue)
    newAll.push(this.state.targetValue)

    this.setState({
      status: 'active',
      list: newlist,
      allList: newAll,
      targetValue: '',
      num: this.state.num + 1
    })

  }
  //获取input数据
  getValue(e) {
    this.setState({ targetValue: e.target.value })
  }
  //显示all
  showAll() {
    this.setState({
      status: 'all'
    })
  }

  //显示active
  showActive() {

    this.setState({
      status: 'active'
    })
  }
  //显示completed
  showComplete() {
    this.setState({
      status: 'completed'
    })
    console.log(this.state.status)
  }
  //清除completed
  clearComplete() {
    this.setState({
      comList: []
    })

  }
  render() {
    return (
      <div className={styles.border}>
        {/* 顶部 */}
        <div className={styles.top}>
          <input value={this.state.targetValue}
           onChange={this.getValue.bind(this)}
           className={styles.input}
           placeholder='What need to be done' />
          <button onClick={this.addOne.bind(this)}>添加</button>
        </div>

        {/* 内容 */}
        <div className={styles.middle}>
          <Child
            status={this.state.status}
            onChange={this.listChange}
            dataActive={this.state.list}
            dataAll={this.state.allList}
            dataComplete={this.state.comList}
          />
        </div>

        {/* 底部 */}
        <div className={styles.bottom}>
          <span>{this.state.num} items left</span>
          <a onClick={this.showAll.bind(this)}>all</a>
          <a onClick={this.showActive.bind(this)}>active</a>
          <a onClick={this.showComplete.bind(this)}>completed</a>
          <a onClick={this.clearComplete.bind(this)}>clear completed</a>
        </div>
      </div>
    )
  }
}


export default Home