import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import GuestLayout from "../../layouts/GuestLayout";

function Register() {
    const { user, handleRegister } = useAuth();
    const [img, setImg] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            name: e.target.name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            age: e.target.age.value,
            img_url: img,
            password: e.target.password.value,
        };

        if (
            data.name != null &&
            data.username != null &&
            data.email != null &&
            data.phone != null &&
            data.age != null &&
            data.img_url != null &&
            data.password != null
        ) {
            handleRegister(data);
        }
    };

    return (
        <GuestLayout>
            <div className="flex w-full h-screen items-center justify-center bg-slate-900">
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="w-96 p-6 bg-slate-800 rounded-xl shadow-xl">
                        <p className="pb-4 font-bold text-2xl text-white text-center">
                            Register
                        </p>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            className="w-full p-3 border rounded-lg mb-1"
                        />
                        <input
                            required
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            className="w-full p-3 border rounded-lg mb-1"
                        />
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            className="w-full p-3 border rounded-lg mb-1"
                        />
                        <input
                            required
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            className="w-full p-3 border rounded-lg mb-1"
                        />
                        <input
                            required
                            type="number"
                            name="age"
                            placeholder="Enter age"
                            className="w-full p-3 border rounded-lg mb-1"
                        />
                        <div className="w-full border rounded-lg mb-1 flex text-white">
                            <label
                                htmlFor="selectImage"
                                className="w-full p-3 flex items-center justify-between"
                            >
                                {img ? `${img.name}` : "SELECTE IMAGE"}
                                {img && (
                                    <img
                                        className="w-12 h-12 object-contain rounded-full border border-slate-600"
                                        src={URL.createObjectURL(img)}
                                    />
                                )}
                            </label>
                        </div>
                        <input
                            required
                            id="selectImage"
                            type="file"
                            // name="img_url"
                            onChange={(e) => setImg(e.target.files[0])}
                            placeholder="Enter img url"
                            className="sr-only"
                        />
                        <input
                            required
                            type="text"
                            name="password"
                            placeholder="Enter password"
                            className="w-full p-3 border rounded-lg mb-1"
                        />
                        <button className="w-full p-3 border rounded-lg mt-5 text-white ">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

export default Register;
