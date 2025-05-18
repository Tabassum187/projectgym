import React, { useEffect, useState } from 'react';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function ShowUser() {
    const [user, setUser] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();

    // ✅ Admin Role Check
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user_information"));
        if (!userInfo || userInfo.role !== "admin") {
            navigate("/dashboard"); // or "/login"
        }
    }, [navigate]);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await axios.get("http://localhost:3001/gym/getuser");
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecord(userId) {
        try {
            if (window.confirm("Are you sure you want to delete this record?")) {
                await axios.delete(`http://localhost:3001/gym/getuser/${userId}`);
                toast.dark("Record Deleted Successfully");
                fetchUsers();
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error deleting record");
        }
    }

    function setEditData(nameVal, emailVal, ageVal, genderVal, userId) {
        setName(nameVal);
        setEmail(emailVal);
        setAge(ageVal);
        setGender(genderVal);
        setId(userId);
    }

    async function updateUser() {
        try {
            const response = await axios.put(`http://localhost:3001/gym/getuser/${id}`, {
                name,
                email,
                age,
                gender
            });
            fetchUsers();
            toast.success(response.data.msg);
            document.querySelector(".kuchbhi").click();
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error updating record");
        }
    }

    return (
        <div className="dark-theme">
            <div className="container-scroller">

                {/* Navbar */}
                <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex align-items-center justify-content-between" style={{ backgroundColor: "#121212" }}>
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        <Link className="navbar-brand brand-logo" to="/" style={{ color: "yellow", fontSize: "30px", fontWeight: "bold", textDecoration: "none" }}>
                            <span className="text-warning">🏋️‍♀️FitTrack</span>Pro💪
                        </Link>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-0">
                        <ul className="navbar-nav navbar-nav-right d-flex align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/notifications">
                                    <i className="mdi mdi-bell-outline text-white"></i>
                                    <span className="count-symbol bg-danger"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Sidebar */}
                <div className="container-fluid page-body-wrapper">
                    <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{ backgroundColor: "#121212" }}>
                        <ul className="nav">
                            <br />
                            <li className="nav-item"><Link className="nav-link text-gray" to="#"><span className="menu-title">MAIN MENU</span></Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">📊 Dashboard</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/work">🏋️ Workouts</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/food">🍎 Nutrition</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/pro">📈 Progress</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/goals">🎯 Goals</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/getuser">👤 Profile</Link></li>
                            <br />
                            <li className="nav-item"><Link className="nav-link text-gray" to="#"><span className="menu-title">OTHERS</span></Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/community">👥 Community</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/challenges">🏆 Challenges</Link></li>
                            <br/>
                            <li className="nav-item"><Link className="nav-link text-white" to="/settings">⚙️ Settings</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/support">❓ Support</Link></li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/logout" onClick={(e) => {
                                    e.preventDefault();
                                    if (window.confirm("Are you sure you want to logout?")) {
                                        localStorage.removeItem("user_information");
                                        navigate("/login");
                                    }
                                }}>🚪 Log Out</a>
                            </li>
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <div className="main-panel" style={{ padding: "20px" }}>
                        <ToastContainer />
                        <h1>User Records</h1>
                        <div className='row'>
                            {user.length === 0 ? (
                                <p>No Records Found</p>
                            ) : (
                                user.map((a) => (
                                    <div className='mt-3 col-md-4' key={a._id}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">{a.name}</h4>
                                                <p className="card-text">{a.email || "No Email Provided"}</p>

                                                <div className='d-flex gap-2'>
                                                    <button className='btn btn-danger' onClick={() => deleteRecord(a._id)}>
                                                        <i className="bi bi-trash"></i> Delete
                                                    </button>
                                                    <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setEditData(a.name, a.email, a.age, a.gender, a._id)}>
                                                        <i className="bi bi-pen"></i> Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Modal */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Update Record</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" className="form-control mt-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        <input type="text" className="form-control mt-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <input type="number" className="form-control mt-3" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                        <div className='mt-3'>
                                            <label className="me-2"><input type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} /> Male</label>
                                            <label className="me-2"><input type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} /> Female</label>
                                            <label><input type="radio" name="gender" value="other" checked={gender === "other"} onChange={(e) => setGender(e.target.value)} /> Other</label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary kuchbhi" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={updateUser}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
