import React from "react";
import PropTypes from "prop-types";
import blur_cyan from "./../assets/blur-cyan.svg";
import logo from "./../assets/icons/logo.png";

const AuthUI = ({ InputField, illustration_1, illustration_2 }) => {
    return (
        <div className="bg-[#FCFFFF] relative">
            <div className="md:px-6 mb-10 md:h-screen flex flex-col relative md:justify-center">
                <h1 className="hidden md:block absolute z-0 top-[3%] font-bold text-sky-500 text-3xl">EMCA School</h1>

                <img
                    src={blur_cyan}
                    alt=""
                    className="hidden md:block absolute z-0 top-[3%] left-[26%] w-[400px]"
                />

                <img src={illustration_2} className="md:hidden my-4" alt="Illustration 2" />

                <div className="md:grid md:grid-cols-2 flex items-center md:h-screen m-auto w-full">
                    {/* Login Component */}
                    <div className="md:grid w-screen justify-center items-center md:w-full">
                        <div className="md:my-10 z-10 md:backdrop-blur-xl md:bg-[#F0F9FF]/50 md:rounded-xl md:shadow-card-shadow space-y-4 p-6 w-full md:w-[22rem] lg:w-[25rem]">
                            <InputField />
                        </div>
                    </div>

                    {/* Illustration */}
                    <div className="z-10 hidden md:grid justify-center backdrop-blur-xl bg-[#F0F9FF]/50 rounded-xl shadow-card-shadow space-y-4 m-5 p-5 items-center">
                        <img
                            src={illustration_1}
                            alt="Illustration 1"
                            className="py-14 max-h-[720px]"
                        />
                    </div>
                </div>

                <footer className="md:hidden fixed bg-white w-screen bottom-0">
                    <hr className="my-2" />
                    <div className="flex flex-col justify-center items-center mb-2">
                        <img src={logo} className="w-[32px]" alt="Logo" />
                    </div>
                </footer>
            </div>
        </div>
    );
};

AuthUI.propTypes = {
    InputField: PropTypes.elementType.isRequired,
    illustration_1: PropTypes.string.isRequired,
    illustration_2: PropTypes.string.isRequired,
};

export default AuthUI;