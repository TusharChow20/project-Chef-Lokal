import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import Lottie from "lottie-react";

const AuthLoading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/loading.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
    // .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-64 h-64">
        {animationData && <Lottie animationData={animationData} loop={true} />}
      </div>
    </div>
  );
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  //all info send
  const authInfo = { signUp, updateUserProfile, signIn, user, logOut, loading };

  if (loading) {
    return <AuthLoading />;
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
