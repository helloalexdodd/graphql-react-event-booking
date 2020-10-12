import React from 'react';

function CreateEvent({
  titleRef,
  priceRef,
  dateRef,
  timeRef,
  descriptionRef,
  handleCreateEvent,
  handleShowModal,
}) {
  return (
    <form>
      <div className="field">
        <label className="label" htmlFor="title">
          Title
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Title"
            id="title"
            name="title"
            ref={titleRef}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="price">
          Price
        </label>
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="Price"
            id="price"
            name="price"
            ref={priceRef}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="date">
          Date
        </label>
        <div className="control">
          <input
            className="input"
            type="date"
            placeholder="Date"
            id="date"
            name="date"
            ref={dateRef}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="time">
          Time
        </label>
        <div className="control">
          <input
            className="input"
            type="time"
            placeholder="Time"
            id="time"
            name="time"
            ref={timeRef}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="description">
          Description
        </label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Description"
            id="description"
            name="description"
            ref={descriptionRef}
          />
        </div>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <p className="control">
          <button
            native-type="submit"
            className="button is-primary"
            onClick={handleCreateEvent}
          >
            Submit
          </button>
        </p>
        <p className="control">
          <button
            native-type="button"
            className="button is-light"
            onClick={handleShowModal}
          >
            Cancel
          </button>
        </p>
      </div>
    </form>
  );
}

export default CreateEvent;
