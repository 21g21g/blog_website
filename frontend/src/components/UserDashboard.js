import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { FiCornerRightUp } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  // const loading = useSelector((state) => state.getpost.loading);
  const currentUser = useSelector((state) => state.register.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access-token");
        console.log(token);
        const response = await axios.get(
          "http://localhost:5000/api/user/getusers",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.isAdmin) {
      fetchUser();
    }
  }, [currentUser._id]);
  console.log(users);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access-token");

    const response = await axios.delete(
      `http://localhost:5000/api/user/delete/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
//after succesfullt delete the user i filter it out and render.
    setUsers((prev) => prev.filter((user) => user._id !== id));
  };

  return (
    <div className="table-auto overflow-x-scroll scrollbar md:mx-auto scrollbar-track-slate-300 scrollbar-thumb-slate-300">
      <>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>date created</Table.HeadCell>
            <Table.HeadCell>user image </Table.HeadCell>

            <Table.HeadCell>user name</Table.HeadCell>
            <Table.HeadCell>email </Table.HeadCell>
            <Table.HeadCell>admin</Table.HeadCell>
            <Table.HeadCell>delete</Table.HeadCell>
          </Table.Head>
          {users.map((user) => (
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <img src={`http://localhost:5000/${user.image}`} alt="ther" />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {user.isAdmin ? <FiCornerRightUp /> : <RxCross2 />}
                </Table.Cell>

                <Table.Cell>
                  <button
                    className=" text-red-600 cursor-pointer hover:underline"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </>
    </div>
  );
};

export default UserDashboard;
