import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setpasswordArray(JSON.parse(password));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("Icons/view.png")) {
      ref.current.src = "Icons/hide.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "Icons/view.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        localStorage.setItem(
            "password",
            JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
        );
        console.log([...passwordArray, form]);
        setform({ site: "", username: "", password: "" });
    
    };

  const deletePassword = (id) => {
    console.log("deleting item with id", id);
    let c = confirm("Do you really want to delete this information?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "password",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };
  const editPassword = (id) => {
    console.log("editing item with id", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="md:mycontainer p-2 md:p-0 min-h-[88.7vh]">
        <div className="container text-center  w-3/4 mx-auto">
          <h1 className="font-bold text-white text-xl">
            Pass<span className="text-purple-500">Man</span>
          </h1>
          <p className="text-xs text-white font-semibold">
            Your own password manager
          </p>
          <div className="flex flex-col my-1 w-3/4 mx-auto gap-3">
            <input
              value={form.site}
              onChange={handleChange}
              className="rounded-full text-sm px-3 py-1 my-1 border border-purple-600"
              placeholder="Enter website URL"
              type="text"
              name="site"
            />
            <div className="flex flex-col md:flex-row w-full justify-between gap-3">
              <input
                value={form.username}
                onChange={handleChange}
                className="rounded-full text-sm px-3 py-1 my-1 w-full md:w-[75%] border border-purple-600"
                placeholder="Enter Username"
                type="text"
                name="username"
              />
              <div className="relative">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  className="rounded-full text-sm px-3 py-1 my-1 w-full border border-purple-600"
                  placeholder="Enter password"
                  type="password"
                  name="password"
                />
                <span
                  onClick={showPassword}
                  className="absolute cursor-pointer right-2 top-2 text-sm"
                >
                  <img ref={ref} width={20} src="/Icons/view.png" alt="" />
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="bg-purple-700 border border-purple-950 hover:bg-purple-500 hover:scale-105 text-white text-sm font-bold w-fit rounded-full px-4 py-1"
          >
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-sm font-bold text-white py-3">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-white">No passwords to show!</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-purple-900 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-purple-300">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-purple-500 text-center w-[40%]">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        {/* <img width={20} src="/Icons/copy.png" alt="" /> */}
                      </td>
                      <td className="py-2 border border-purple-500 text-center">
                        {item.username}
                      </td>
                      <td className="py-2 border border-purple-500 text-center">
                        {item.password}
                      </td>
                      <td className="py-2 border cursor-pointer border-purple-500 text-center ">
                        <div className="flex justify-center items-center gap-3">
                          <span
                            className="flex justify-center"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <img width={20} src="/Icons/edit-text.png" alt="" />
                          </span>
                          <span
                            className="flex justify-center"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <img width={20} src="/Icons/bin.png" alt="" />
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

export default Main;
