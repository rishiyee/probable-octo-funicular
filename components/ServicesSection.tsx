"use client";

import React from "react";
import ServicesRow from "@/components/ServicesRow";

export default function ServicesSection() {
  const titleWidthPercent = (700 / 1440) * 100; // 48.611111...

  return (
    <section
      className="w-full flex justify-center px-4 min-h-screen md:min-h-[100vh]"
      style={{ fontFamily: "SF Pro" }}
    >
      <div className="w-full max-w-[1440px] flex flex-col py-16">
        {/* Top: Title */}
        <div className="w-full md:mb-auto" style={{ width: `100%` }}>
          <div className="w-full md:w-[48.611111%]">
            <h1
              className="text-[40px] md:text-[64px] leading-[48px] md:leading-[76px] font-medium"
              style={{
                color: "#7D7D7D",
                fontFamily: "SF Pro",
                fontWeight: 500,
              }}
            >
              Delivering smart, fast, and aesthetic solutions that
              <span style={{ color: "#FFFFFF" }}> elevate </span>
              your brand.
            </h1>
          </div>
        </div>

        {/* Bottom: Services List */}
        <div className="mt-auto flex flex-col md:flex-row justify-between md:items-end gap-8 md:gap-16 pt-8 md:pt-0">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="flex flex-col gap-0">
              <ServicesRow primary="UI UX Design" secondary="01" href="#" />
              <ServicesRow primary="Branding" secondary="02" href="#" />
              <ServicesRow primary="Product Strategy" secondary="03" href="#" />
              <ServicesRow primary="Webflow Development" secondary="04" href="#" />
            </div>

            <div className="flex flex-col gap-0">
              <ServicesRow primary="Interaction Design" secondary="05" href="#" />
              <ServicesRow primary="Motion Design" secondary="06" href="#" />
              <ServicesRow primary="Design Systems" secondary="07" href="#" />
              <ServicesRow primary="Prototype Engineering" secondary="08" href="#" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
