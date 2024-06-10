import React, { useEffect, useState } from 'react';
import './CRUD.scss';
import Modal from '../edit/Modal';
const API__URL = 'http://localhost:1234/users';

const CRUD = () => {
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetch(API__URL)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [reload]);

  const handleCreateUsers = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let AddUser = Object.fromEntries(formData.entries());

    fetch(API__URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(AddUser),
    }).then((res) => {
      setReload((p) => !p);
    });

    e.target.reset();
  };

  const handleDelete = (id) => {
    fetch(`${API__URL}/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      setReload((p) => !p);
    });
  };

  const handleEdit = (user) => {
    setEdit(user);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let updatedUser = Object.fromEntries(formData.entries());

    fetch(`${API__URL}/${edit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(updatedUser),
    }).then((res) => {
      setReload((p) => !p);
      setEdit(null);
    });
  };

  let users = data?.map((user) => (
    <div key={user.id} className="card">
      <img src={user.img} alt="" />
      <span>
        <h2>{user.fname}</h2>
        <h2>{user.lname}</h2>
      </span>
      <span>
        <button className="dbtn" onClick={() => handleDelete(user.id)}>Delete</button>
        <button className='editbtn' onClick={() => handleEdit(user)}>Edit</button>
      </span>
    </div>
  ));

  return (
    <div>
      <form onSubmit={handleCreateUsers} action="">
        <span>
          <label htmlFor="">Your Image Url</label>
          <input type="text" name="img" id="" />
        </span>
        <span>
          <label htmlFor="">name</label>
          <input required type="text" name="fname" />
        </span>
        <span>
          <label htmlFor="">LastName</label>
          <input required type="text" name="lname" />
        </span>
        <button>Create</button>
      </form>
      <div className="container">
        <div className="cards">{users}</div>
        {edit && (
          <Modal show={edit} onClose={() => setEdit(null)}>
            <div>
              <form onSubmit={handleUpdate}>
                <span>
                  <label htmlFor="">Your Image Url</label>
                  <input
                    type="text"
                    name="img"
                    defaultValue={edit.img}
                  />
                </span>
                <span>
                  <label htmlFor="">name</label>
                  <input
                    required
                    type="text"
                    name="fname"
                    defaultValue={edit.fname}
                  />
                </span>
                <span>
                  <label htmlFor="">LastName</label>
                  <input
                    required
                    type="text"
                    name="lname"
                    defaultValue={edit.lname}
                  />
                </span>
                <button>Save</button>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CRUD;
