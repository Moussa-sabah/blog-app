import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import './PostDetails.css'
import AddComment from "../../components/comments/AddComment.jsx";
import CommentList from "../../components/comments/CommentList.jsx";
import swal from 'sweetalert'
import UpdatePostModel from "../../components/post/UpdatePostModel.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getOnePost, toggleLike, updatePostImage } from "../../redux/apiCalls/PostApiCalls.js";

const PostDetails = () => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const [file, setFile] = useState(null);

  const { post } = useSelector(state => state.post)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getOnePost(id))
    window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [id]);

  const uploadeNewImageHandler = (e) => {

    e.preventDefault()

    if (!file) {
      return toast.warning('Plesae select an image')
    }
    const formData = new FormData()
    formData.append('image', file)
    dispatch(updatePostImage(formData, id))
  }

  const navigate = useNavigate()
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isOk) => {
        if (isOk) {
          dispatch(deletePost(id))
          navigate(`/profile/${user?._id}`)
        } else {
          swal("Something went wrong!");
        }
      });
  }

  const [updatePostModel, setUpdatePostModel] = useState(false);

  return (
    <section className="post-details">
      <img className="post-image" src={file ? URL.createObjectURL(file) : post?.image.url} alt="" />
      {user?._id === post?.user._id &&
        <form onSubmit={uploadeNewImageHandler} className="post-details-form" action="">
          <label className="form-label" htmlFor="file"><i className="bi bi-card-image"></i> Select new image</label>
          <input onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} className="form-input" type="file" name="file" id="file" />
          <button className="form-btn">upload</button>
        </form>
      }
      <h1 className="post-title">{post?.title}</h1>
      <div className="user-profile">
        <img className="user-profile-image" src={post?.user.profilePhoto.url} alt="" />
        <div className="user-profile-name-and-createAt">
          <p className="user-profile-name">{post?.user.userName}</p>
          <p className="post-createAt">{new Date(post?.createdAt).toDateString()}</p>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Dolorem exercitationem placeat doloribus inventore molestiae modi vitae,
        autem vel temporibus dignissimos, dicta voluptate? Rem dolores autem dolorem inventore.
        Quas, quaerat repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Impedit exercitationem adipisci itaque, harum nihil eveniet ea culpa.
      </p>
      <div className="likes-edit-delete">
        <div className="likes">
          <i onClick={() => { dispatch(toggleLike(id)) }} className={post?.likes.includes(user?._id) ?
            "bi bi-hand-thumbs-up-fill" :
            "bi bi-hand-thumbs-up"}></i>{post?.likes.length} likes
        </div>

        {user?._id === post?.user._id &&
          <div className="edit-delete">
            <i onClick={() => { setUpdatePostModel(true) }} className="bi bi-pencil-square"></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        }
      </div>

      <AddComment postId={post?._id} />
      <CommentList comments={post?.comments} user={user} />
      {updatePostModel ? <UpdatePostModel setUpdatePostModel={setUpdatePostModel} post={post} id={id} /> : null}
    </section>
  );
}

export default PostDetails;