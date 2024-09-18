import { formatDistance } from 'date-fns';

function Task({ props }) {
  const {
    taskState, description, created,
  } = props;

  const editField = <input type="text" className="edit" value={description} />;

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={taskState === 'done'} />
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
        <button type="button" className="icon icon-destroy" />
      </div>
      { taskState === 'editing' ? editField : false }
    </>
  );
}

export default Task;
