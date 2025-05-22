import React from "react";
import { useRef, useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async (params) => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords)

  }
  

  useEffect(() => {
    getPasswords();
    
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
    });

    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    // alert("Show the Password");
    // passwordRef.current.type = "text";
    if (ref.current.src.includes("hide.png")) {
      ref.current.src = "eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "hide.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    console.log(form);
    if(form.site.length>3 && form.username.length>3 && form.password.length>3 ){

      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:form.id})})

       setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
       await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({...form,id:uuidv4()})})
    // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    // console.log([...passwordArray, form]);
    setForm({ site: "", username: "", password: "" });
    toast("Password Saved Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
    else{
      toast("Password Not Saved ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
   
  };

  const deletePassword = async (id) => {
    console.log("Deleting passowrd with id",id);
    let c =  confirm("Do u really want to delete the password")
    // console.log(form);
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})})
      // console.log([...passwordArray, form]);
      toast("Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
  };

   const editPassword = (id) => {
    console.log("Editing passowrd with id",id);

setForm({...passwordArray.filter(item=>item.id===id)[0],id:id});
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    // console.log(form);
    // setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    // localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
         
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-green-100 via-white to-green-200"></div>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-green-100 via-white to-green-200"></div> */}


      <div className="p-3 md:mycontainer min-h-[85vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Password</span>
          <span className="text-green-500">Manager/&gt;</span>
        </h1>
        <p className="text-green-000 text-lg text-center">
          Your own Pass Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-6 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full  px-4 py-1 "
            type="text" id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-9">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full  px-4 py-1 "
              type="text" id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full  px-4 py-1 "
                type="password" id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer "
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full px-5 py-2 w-fit gap-2 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save Details
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords To Show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center  ">
                        <div className=" flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy cursor-pointer size-7 "
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                "paddingTop": "3px",
                                "paddingLeft": "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                "paddingTop": "3px",
                                "paddingLeft": "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center ">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                "paddingTop": "3px",
                                "paddingLeft": "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center ">
                        <div className="flex items-center justify-center">
                          <span className="cursor-pointer mx-1" onClick={()=>editPassword(item.id)}>
                            <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{width:"20px",height:"20px"}}></lord-icon>
                          </span>
                          <span className="cursor-pointer mx-1"  onClick={()=>deletePassword(item.id)}>
                            <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{width:"20px",height:"20px"}}></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
