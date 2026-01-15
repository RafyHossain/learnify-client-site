import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/courses/${id}`).then(res => {
      setCourse(res.data);
    });

    axios
      .get(`http://localhost:3000/enroll/${user.email}`)
      .then(res => {
        const enrolled = res.data.find(e => e.courseId === id);
        if (enrolled) setIsEnrolled(true);
      });
  }, [id, user.email]);

  const handleEnroll = async () => {
    await axios.post("http://localhost:3000/enroll", {
      courseId: course._id,
      studentEmail: user.email,
    });

    toast.success("Enrolled successfully 🎉");
    setIsEnrolled(true);
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={course.thumbnail}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-3">
        {course.title}
      </h1>

      <p className="opacity-80 mb-6">
        {course.description}
      </p>

      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">
          ${course.price}
        </p>

        <button
          disabled={isEnrolled}
          onClick={handleEnroll}
          className={`btn btn-primary ${
            isEnrolled && "btn-disabled"
          }`}
        >
          {isEnrolled ? "Already Enrolled" : "Enroll Now"}
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
