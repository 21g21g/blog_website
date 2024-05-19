import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { getdataSliceAction } from "../redux/getdata/getdataSlice";
const DashboardComponent = () => {
  const [showmore, setShowmore] = useState(true);
  const [page, setPage] = useState(1);

  const currentUser = useSelector((state) => state.register.currentUser);
  const getdata=JSON.parse(localStorage.getItem("get"))
  console.log(getdata)

  console.log(currentUser._id);
  const dispatch = useDispatch();
  const fetchPostData = async (page) => {

    try {
      const response = await axios.get(
        `http://localhost:5000/api/post/paginate?page=${page}`
      );
   
           

      if (response.status === 200) {
        dispatch(getdataSliceAction.getdataSuccess(response.data))
      }
    } catch (error) {
     dispatch(getdataSliceAction.getdataFailure(error))
    }
  };

  useEffect(() => {
    fetchPostData(page);
  }, [ dispatch, page]);
  const handleshowMore = async () => {
    const paa = getdata.page;

    const pagenumber = paa + 1;
    setPage(pagenumber);
    fetchPostData(pagenumber);
  };
  const handleshowLess = async () => {
    const paa = getdata.page;

    const pagenumber = paa - 1;
    if (pagenumber < 1) {
      return null;
    } else {
      setPage(pagenumber);
      fetchPostData(pagenumber);
    }
  };
  const handleDelete = async (id) => {
try {
        const token=localStorage.get( "access-token")
      const response = await axios.delete(
        `http://localhost:5000/api/post/delete/${id}`,{
          headers:{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        console.log("delete succesfully")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll scrollbar md:mx-auto scrollbar-track-slate-300 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && getdata.blogs.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>date updated</Table.HeadCell>
              <Table.HeadCell>post image</Table.HeadCell>
              <Table.HeadCell>post title </Table.HeadCell>
              <Table.HeadCell>post category</Table.HeadCell>
              <Table.HeadCell>delete</Table.HeadCell>
              <Table.HeadCell>
                <span>edit</span>
              </Table.HeadCell>
            </Table.Head>
            {getdata.blogs.map((post) => (
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={`http://localhost:5000/${post.image}`}
                      alt="ther"
                    />
                  </Table.Cell>
                  <Link to={`/post/${post._id}`}>
                    <Table.Cell>{post.title}</Table.Cell>
                  </Link>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <button
                      className=" text-red-600 cursor-pointer hover:underline"
                      onClick={() => handleDelete(post._id)}
                    >
                      delete
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-stone-600">
                      <Link to={`/update/${post._id}`}>edit</Link>
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>there is no posts</p>
      )}
      {showmore && (
        <div className="flex flex-row">
          <button
            onClick={handleshowLess}
            className="text-green-300 self-center w-full"
          >
            show preves
          </button>
          <button
            onClick={handleshowMore}
            className="text-green-300 self-center w-full"
          >
            show next
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;
