import { Form, Link } from "react-router-dom";

import { FormInput, SubmitButton } from "../components";

export default function LoginPage() {
  return (
    <section className="grid h-screen place-items-center">
      <Form
        method="POST"
        className="card flex w-96 flex-col gap-y-5 bg-base-100 p-8 shadow-md"
      >
        <h2 className="text-center text-2xl font-bold">
          Login to your account
        </h2>
        <FormInput
          label="Email"
          type="email"
          name="email"
          defaultValue="johndoe@email.com"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          defaultValue="123456"
        />
        <SubmitButton label="Login" />

        <p className="text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="link-hover link link-neutral text-center text-neutral"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
}
