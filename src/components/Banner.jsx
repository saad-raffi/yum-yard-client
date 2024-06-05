import React from "react";
import bannerImg from "/images/home/banner.jpg";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-[#FFFAF0] to-[#FDE68A]">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">

        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="Delicious food" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="bg-white px-4 py-3 rounded-2xl flex items-center gap-4 shadow-md w-64">
              <img src="/images/home/b-food1.png" alt="Spicy noodles" className="rounded-2xl" />
              <div className="space-y-1">
                <h5 className="font-semibold text-gray-700">Spicy Noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                </div>
                <p className="text-red-600 font-semibold">$18.00</p>
              </div>
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl md:flex items-center gap-4 shadow-md w-64 hidden">
              <img src="/images/home/b-food1.png" alt="Spicy noodles" className="rounded-2xl" />
              <div className="space-y-1">
                <h5 className="font-semibold text-gray-700">Spicy Noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                </div>
                <p className="text-red-600 font-semibold">$18.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights of Delectable <span className="text-yellow-600">Food</span>
          </h2>
          <p className="text-gray-700 text-xl">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="bg-yellow-600 font-semibold btn text-white px-8 py-3 rounded-full hover:bg-yellow-700 transition duration-300">
            Order Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default Banner;
