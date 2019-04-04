import React, { Component } from 'react';
import { observable, computed } from "mobx";
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

class Todo {
  constructor(title) {
    this.title = title;
  }
  id = Math.random();

  @observable
  title = "";

  @observable
  finished = false;
}

class TodoList {
  @observable
  todos = [];

  @computed
  get unfinishedTodoCount() {
      return this.todos.filter(todo => !todo.finished).length;
  }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
);

@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const store = new TodoList();

store.todos.push(
  new Todo("Get Coffee"),
  new Todo("Write simpler code")
);

class App extends Component {
  render() {
    return (
      <>
        <div className="App">
          <TodoListView todoList={store} />
        </div>
        <DevTools />
      </>
    );
  }
}

export default App;
