import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ id, handleCloseModal, reviews, getReviews }) => {
  const [allComments, setAllComments] = useState([])
  const [comment, setComment] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = async (id) => {
    const response = await axios.post('/api/comments/create', {
      user: user,
      text: comment,
      store_id: id,
    });
    setComment('');
    getReviews();
    // console.log(response.data);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(id);
      }}
      className="fixed inset-auto opacity-95 z-50 p-5 flex flex-col items-center justify-center gap-5 bg-primary-500 backdrop-blur-2xl rounded-xl"
    >
      <div
        onClick={handleCloseModal}
        className="self-end bg-secondary-500 text-primary-500 px-2 -mt-2 -mr-2 rounded-md cursor-pointer hover:bg-opacity-75"
      >
        x
      </div>
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="bg-secondary-500 rounded-lg text-primary-500 py-1 placeholder-primary-500"
        placeholder="Username..."
      />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-secondary-500 rounded-lg text-primary-500 py-1 placeholder-primary-500"
        placeholder="Comment..."
      />
      <button
        className="mb-2 bg-secondary-500 text-primary-500"
        // onClick={submitTask}
      >
        Add Comment
      </button>
      {reviews && (
        <div>
          {reviews?.map((review) => (
            <div className="flex ">
              <p className="text-secondary-500 mr-2 underline">{review.user}:</p>
              <p className="text-secondary-500">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default Modal;
