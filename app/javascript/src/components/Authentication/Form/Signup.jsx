import React from "react";

import { Button, Input, Select, Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import { buildOrganizationOptions } from "./utils";

import routes from "~/routes";

const Signup = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  loading,
  setPasswordConfirmation,
  setSelectedOrganizationId,
  organizations,
}) => {
  const organizationOptions = buildOrganizationOptions(organizations);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50
    px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <Typography
          className="mt-6 text-center text-3xl font-extrabold
        leading-9 text-gray-700"
        >
          Sign Up
        </Typography>
        <div className="text-center">
          <Link
            to={routes.auth.login}
            className="mt-2 text-center text-sm font-medium
            text-bb-purple transition duration-150 ease-in-out
            focus:underline focus:outline-none"
          >
            Or Login Now
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Oliver"
            onChange={e => setName(e.target.value)}
          />
          <Input
            label="Email"
            placeholder="oliver@example.com"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Select
            label="Organization"
            options={organizationOptions}
            placeholder="Select organizations"
            onChange={e => setSelectedOrganizationId(e.value)}
          />
          <Input
            label="Password"
            placeholder="********"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            label="Password Confirmation"
            placeholder="********"
            type="password"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <Button
            className="flex items-center justify-center"
            label="Register"
            loading={loading}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
