"use client";

import { useEffect, useState } from "react";

export default function Footer() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const istOffset = 5.5 * 60; // IST = UTC+5:30
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const istTime = new Date(utc + istOffset * 60000);
            const hours = String(istTime.getHours()).padStart(2, "0");
            const minutes = String(istTime.getMinutes()).padStart(2, "0");
            const seconds = String(istTime.getSeconds()).padStart(2, "0");
            setTime(`${hours}:${minutes}:${seconds} IST`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="h-screen relative flex flex-col justify-between p-5 md:p-20 overflow-hidden" style={{ background: "transparent" }}>
            
            {/* 3D Shape Images */}
            <img
                src="/shape1.png"
                alt="3D Shape 1"
                className="absolute transform scale-50 md:scale-100 rotate-6 md:rotate-0"
                style={{
                    left: "50%",
                    top: "-70px",
                    scale: "0.9",
                    zIndex: 10,
                    transition: "all 0.3s ease-in-out"
                }}
            />
            <img
                src="/shape2.png"
                alt="3D Shape 2"
                className="absolute transform scale-50 md:scale-100 -rotate-12 md:rotate-0"
                style={{
                    left: "-350px",
                    top: "30px",
                    scale: "0.5",
                    zIndex: 10,
                    transition: "all 0.3s ease-in-out"
                }}
            />

            {/* Links Section */}
            <div className="flex flex-col md:flex-row justify-start max-w-7xl mx-auto w-full gap-x-0 md:gap-x-20 gap-y-10 md:gap-y-0">
                
                {/* Navigation Links */}
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-white font-medium text-lg md:text-xl">Navigation</h2>
                    <a href="/" className="text-white/40 hover:underline font-normal tracking-wide">Home</a>
                    <a href="/about" className="text-white/40 hover:underline font-normal tracking-wide">About</a>
                    <a href="/works" className="text-white/40 hover:underline font-normal tracking-wide">Works</a>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-white font-medium text-lg md:text-xl">Social</h2>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:underline">LinkedIn</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:underline">Instagram</a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:underline">X</a>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-white font-medium text-lg md:text-xl">Contact</h2>
                    <span className="text-white/40">Phone: +91 8547 8380 91</span>
                    <span className="text-white/40">Email: hrishikeshvyshnavop@gmail.com</span>
                </div>

            </div>

            {/* Time & Name Section */}
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center max-w-7xl mx-auto w-full gap-y-5 md:gap-x-20 mt-auto">
                
                {/* Clock */}
                <span className="text-white font-medium text-2xl md:text-4xl">
                    {time}
                </span>

                {/* Name */}
                <span className="text-white font-light text-[120px] md:text-[232px] leading-none">
                    rishiyee
                </span>
            </div>
        </footer>
    );
}
