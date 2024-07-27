import { useFormik } from "formik"
import AuthForm from "../components/forms/AuthForm"
import { LoginSchema } from "../schemas/auth.schema"
import MainTextInput from "../components/inputs/MainTextInput"
import MainButton from "../components/buttons/MainButton"
import { Link } from "react-router-dom"
import { registerApiRequest } from "../api/auth.requests"
import toast from "react-hot-toast"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../app/features/auth.slice"

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: '',
      password: '',
      phone: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      setLoading(true);
      console.log(values);
      const { data, error } = await registerApiRequest(values);
      if (error) {
        setLoading(false);
        toast.error(`Something went wrong: ${error}`);
        return;
      }
      setLoading(false);
      toast.success("Registration successful!");
      dispatch(login({ token: data?.access_token || "" }))
    },
  })

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <AuthForm 
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-center my-5">Register</h1>
        <div className="my-4">
        <MainTextInput 
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          label={{
            text: 'Name:',
            htmlFor: "name",
          }}
        />
        </div>
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
        <div className="my-4">
        <MainTextInput 
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          label={{
            text: 'Phone:',
            htmlFor: "phone",
          }}
        />
        </div>
        <p className="my-4">I already have an account <Link to="/loign" className="text-blue-500 font-bold" >Login</Link></p>
        <div className="w-full flex flex-row-reverse my-2">
          <MainButton loading={loading} type="submit" className="px-2">Submit</MainButton>
        </div>
      </AuthForm>
    </div>
  )
}

export default RegisterPage