import { formatDistance } from 'date-fns';
import { Component } from 'react';

export default class Task extends Component {
  state = {
    isDone: false,
  };

  constructor(props) {
    super(props);
    this.doneClicked = () => {
      this.setState(({ isDone }) => ({ isDone: !isDone }));
    };
  }

  render() {
    const {
      taskState = 'active', description, created, onDeleted,
    } = this.props;
    const { isDone } = this.state;

    const editField = <input type="text" className="edit" value={description} />;

    return (
      <>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={isDone}
            onClick={this.doneClicked}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">
              {
                formatDistance(
                  new Date(created),
                  Date.now(),
                  {
                    includeSeconds: true,
                    addSuffix: true,
                  },
                )
              }
            </span>
          </label>
          <button type="button" className="icon icon-edit" />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
          />
        </div>
        { taskState === 'editing' ? editField : false }
      </>
    );
  }
}
