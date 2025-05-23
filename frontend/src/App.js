import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Main from './Component/Main';
import Rigester from './Component/Register';
import ShowUser from './Component/ShowUser';
import Login from './Component/Login';
import ProgressForm from './Component/ProgressForm';
import WorkoutForm from './Component/WorkoutForm';
import FoodForm from './Component/FoodForm';
import FoodList from './Component/FoodList';
import FoodItem from './Component/FoodItem';
import Support from './Component/Support';
import Settings from './Component/Settings';
import ForgetPassword from './Component/ForgetPassword';
import ResetPassword from './Component/ResetPassword';
import Goals from './Component/Goals';
import ReminderForm from './Component/ReminderForm';
import Profile from './Component/Profile';
import Notifications from './Component/Notifications';
import ProgressList from './Component/ProgressList';



// ProtectedRoute component
function ProtectedRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("user_information"));
  if (!userInfo || userInfo.role !== "admin") {
    // If no user info or role not admin, redirect to login
    return <Navigate to="/login" replace />;
  }
  // If admin, render the children components (the protected page)
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/reg' element={<Rigester />} />

          {/* Protect ShowUser route */}
          <Route
            path='/getuser'
            element={
              <ProtectedRoute>
                <ShowUser />
              </ProtectedRoute>
            }
          />

          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Main />} />
          <Route path='/pro' element={<ProgressForm />} />
          <Route path='/progresslist' element={<ProgressList />} />
          <Route path='/work' element={<WorkoutForm />} />
          <Route path='/food' element={<FoodForm />} />
          <Route path='/foodlist' element={<FoodList />} />
          <Route path='/fooditem' element={<FoodItem />} />
          <Route path='/support' element={<Support />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/fp' element={<ForgetPassword />} />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/goals' element={<Goals />} />
           <Route path='/reminder' element={<ReminderForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
