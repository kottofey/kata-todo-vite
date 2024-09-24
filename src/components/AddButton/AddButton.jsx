import './AddButton.css';

export default function AddButton(props) {
  const { onAdded, description = 'Add some text to your task' } = props;
  return (
    <div className="add-button">
      <button
        type="button"
        onClick={() => onAdded(description)}
      >
        Add item
      </button>
    </div>

  );
}
