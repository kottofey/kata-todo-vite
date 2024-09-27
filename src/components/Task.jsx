import { formatDistance } from 'date-fns';
import { Component } from 'react';

export default class Task extends Component {
  state = {
    value: this.props.description,
  };

  onEditInput = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  onSubmit = (e) => {
    const { onEditComplete } = this.props;
    const { value } = this.state;

    onEditComplete(value);
    e.preventDefault();
  };

  render() {
    const {
      description, created,
      onDeleted, onToggleDone,
      onEditStart, isEditing,
      isDone,
    } = this.props;

    const { value } = this.state;

    const editField = (
      <form
        onSubmit={this.onSubmit}
      >
        <input
          onChange={this.onEditInput}
          className="edit"
          value={value}
          autoFocus
        />
      </form>
    );

    return (
      <>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={isDone}
            onClick={onToggleDone}
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
          <button
            type="button"
            className="icon icon-edit"
            onClick={onEditStart}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
          />
        </div>
        { isEditing ? editField : false }
      </>
    );
  }
}
