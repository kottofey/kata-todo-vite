import { formatDistance } from 'date-fns';

export default function Task({
  description, created,
  onDeleted, onEditing, onToggleDone,
  isEditing,
}) {
  const editField = <input type="text" className="edit" value={description} />;

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
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
          onClick={onEditing}
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
