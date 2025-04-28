import React, { useEffect, useRef, useState } from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Avatar, Button, Typography } from "@bigbinary/neetoui";
import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

const UserProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  const name = getFromLocalStorage("authUserName");
  const email = getFromLocalStorage("authEmail");

  const toggleIsProfileOpen = () => setIsProfileOpen(prev => !prev);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Avatar user={{ name }} onClick={toggleIsProfileOpen} />
      {isProfileOpen && (
        <div className="absolute bottom-full left-full z-50 w-64 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="flex items-center gap-4 bg-gray-100 p-4">
            <Avatar size="large" user={{ name }} />
            <div>
              <Typography className="font-medium" style="body2">
                {name}
              </Typography>
              <Typography className="text-bb-gray-600" style="body3">
                {email}
              </Typography>
            </div>
          </div>
          <div className="p-4">
            <Button
              className="w-full justify-center"
              icon={LeftArrow}
              iconPosition="left"
              label="Logout"
              style="danger"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
