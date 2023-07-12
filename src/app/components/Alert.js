import React from 'react';

const Alert = ({ type, message }) => {
  const { background, border, text } = ALERT_COLORS[type];

  return (
    <div
      className="container-auto rounded-md px-6 py-4 my-6 border border-solid"
      style={{
        backgroundColor: background,
        borderColor: border,
        color: text,
      }}
    >
      {message instanceof Array ? (
        message.map((e, i) => <p key={i}>{e}</p>)
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

const ALERT_COLORS = {
  primary: {
    background: '#cfe2ff',
    text: '#084298',
    border: '#b6d4fe',
  },
  secondary: {
    background: '#353535',
    text: 'white',
    border: 'gray',
  },
  success: {
    background: '#d1e7dd',
    text: '#0f5132',
    border: '#badbcc',
  },
  danger: {
    background: '#f8d7da',
    text: '#842029',
    border: '#f5c2c7',
  },
  warning: {
    background: '#fff3cd',
    text: '#664d03',
    border: '#ffecb5',
  },
  info: {
    background: '#cff4fc',
    text: '#055160',
    border: '#b6effb',
  },
};

export default Alert;
