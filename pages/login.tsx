// import Head from "next/head";
// import Image from "next/legacy/image";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import useAuth from "@/hooks/useAuth";

// interface Inputs {
//   email: string;
//   password: string;
// }

// function Login() {
//   const [login, setLogin] = useState(false);
//   const { signIn, signUp } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();

//   const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
//     if (login) {
//       await signIn(email, password);
//     } else {
//       await signUp(email, password);
//     }
//   };

//   return (
//     <div
//       className="
//     relative 
//     flex h-screen 
//     w-screen flex-col
//      bg-black md:items-center 
//      md:justify-center 
//      md:bg-transparent"
//     >
//       <Head>
//         <title>Netflix</title>
//         <link rel="icon" href="/nxIconGreen.ico" />
//       </Head>
//       <Image
//         src="https://rb.gy/p2hphi"
//         layout="fill"
//         className="-z-10 !hidden opacity-60 sm:!inline"
//         alt="annoying a## error caused me to write this bs here"
//       />

//       <img
//         src="https://rb.gy/ulxxee"
//         className="absolute left-4 
//         top-4 cursor-pointer
//          object-contain 
//          md:left-10 md:top-6"
//         width={150}
//         height={150}
//       />

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="relative 
//       mt-24 space-y-8 rounded
//        bg-black/75 py-10 
//        px-6 md:mt-0 
//        md:max-w-md 
//        md:px-14"
//       >
//         <h1 className="text-4xl font-semibold">Sign in (email:test123@web.de pw:test123)</h1>
//         <div className="space-y-4">
//           <label className="inline-block w-full">
//             <input
//               type="email"
//               placeholder="Email (type:test123@web.de"
//               className="input"
//               {...register("email", { required: true })}
//             />
//             {errors.email && (
//               <p className="p-1 text-[13px] font-light  text-orange-500">
//                 Please enter a valid email.
//               </p>
//             )}
//           </label>
//           <label className="inline-block w-full">
//             <input
//               type="password"
//               placeholder="Password test123"
//               className="input"
//               {...register("password", { required: true })}
//             />
//             {errors.password && (
//               <p className="p-1 text-[13px] font-light  text-orange-500">
//                 Your password must contain between 4 and 60 characters.
//               </p>
//             )}
//           </label>
//         </div>
//         <button
//           className="w-full rounded bg-[#e50914] py-3 font-semibold"
//           onClick={() => setLogin(true)}
//         >
//           Sign In
//         </button>

//         <div className="text-[gray]">
//           New to Netflix?{" "}
//           <button
//             type="submit"
//             className="text-white hover:underline"
//             onClick={() => setLogin(false)}
//           >
//             Sign up now
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;


import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/nxIconGreen.ico" />
      </Head>
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="https://rb.gy/p2hphi"
          layout="fill"
          className="object-cover opacity-50"
          alt="background"
        />
      </div>

      

      <div className="absolute top-0 left-0 p-4 cursor-pointer sm:p-8">
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 
        top-4 cursor-pointer
         object-contain 
         md:left-10 md:top-6"
        width={150}
        height={150}
      />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md px-8 py-10 bg-black/75 rounded-lg"
      >
        <h1 className="text-4xl font-semibold text-white">Sign in</h1>
        <div className="space-y-4 mt-6">
          <input
            type="email"
            placeholder="Email"
            className="input"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-xs text-red-400">Please enter a valid email.</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="input"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-xs text-red-400">
              Your password must contain between 4 and 60 characters.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition duration-300"
        >
          Sign In
        </button>

        <div className="text-gray-400 mt-4">
          New to Netflix?{" "}
          <button
            type="button"
            className="text-white underline focus:outline-none hover:text-red-600 transition duration-300"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
