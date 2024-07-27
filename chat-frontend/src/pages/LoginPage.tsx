import { useFormik } from "formik"
import AuthForm from "../components/forms/AuthForm"
import { LoginSchema } from "../schemas/auth.schema"
import MainTextInput from "../components/inputs/MainTextInput"
import MainButton from "../components/buttons/MainButton"
import { Link } from "react-router-dom"
import { loginApiRequest } from "../api/auth.requests"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../app/features/auth.slice"
import toast from "react-hot-toast"

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      setLoading(true)
      const { error, data } = await loginApiRequest(values);
      if (error) {
        setLoading(false);
        toast.error(error);
        return;
      }
      setLoading(false);
      toast.success("Registration successful!");
      dispatch(login({ token: data?.access_token || "" }))
      window.location.reload();
    },
  })

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <AuthForm 
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-center my-5">Login</h1>
        <div className="my-4">
        <MainTextInput 
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          label={{
            text: 'Email:',
            htmlFor: "email",
          }}
        />
        </div>
        <div className="my-4">
        <MainTextInput 
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          label={{
            text: 'Password:',
            htmlFor: "password",
          }}
        />
        </div>
        <p className="my-4">I don't have an account <Link to="/register" className="text-blue-500 font-bold" >Register</Link></p>
        <div className="w-full flex flex-row-reverse my-2">
          <MainButton loading={loading} type="submit">Submit</MainButton>
        </div>
      </AuthForm>
    </div>
  )
}

export default LoginPage