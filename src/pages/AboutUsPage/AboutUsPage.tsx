import React from 'react'
import topImage from '../../assets/images/real-estate-property-contract1.jpg'
import mordenHouse from '../../assets/images/modern-house.jpg'
import value from '../../assets/images/mission.jpg'

function AboutUsPage() {
  return (
    // <div className="mt-[96px]">
    //   <div className="relative">
    //     <img src={topImage} alt="" className="w-full object-cover h-[370px]" />
    //     <div className="absolute z-[1] text-black top-[30%] right-0 pr-[36px] text-[46px] font-bold font-alice">
    //       <h2 className="text-center">
    //         Defined by Service <br /> & Expertise
    //       </h2>
    //     </div>
    //   </div>
    //   <h1 className="text-center text-4xl my-8 font-alice font-semibold">
    //     One Team. One Goal.
    //   </h1>
    //   <section className="px-[180px] flex flex-col gap-y-[80px] mb-20">
    //     <div className="flex bg-blur h-[400px] items-center rounded-[16px] ">
    //       <div className="w-1/2 text-center">
    //         <img
    //           src={mordenHouse}
    //           alt=""
    //           className="rounded-[16px] max-h-[320px] mx-auto"
    //         />
    //       </div>
    //       <div className="w-1/2 flex flex-col items-center">
    //         <h1 className="font-semibold font-alice text-3xl">MODERN HOUSE</h1>
    //         <p className="text-xl font-alice mt-4 max-w-[580px]">
    //           Welcome to MODERN HOUSE - Your Trusted Partner in Real Estate! At
    //           MODERN HOUSE, we understand the importance of finding the perfect
    //           home or property to suit your needs. Whether you&apos;re in search
    //           of your dream home, an investment property, or a rental space, we
    //           are here to guide you every step of the way.
    //         </p>
    //       </div>
    //     </div>
    //     <div className="flex bg-blur h-[400px] items-center rounded-[16px] ">
    //       <div className="w-1/2 flex flex-col items-center">
    //         <h1 className="font-semibold font-alice text-3xl">MISSIONs</h1>
    //         <p className="text-xl font-alice mt-4 max-w-[580px]">
    //           Our mission at MODERN HOUSE is to simplify the process of buying,
    //           selling, or renting real estate properties. We strive to provide
    //           our clients with the highest level of professionalism, integrity,
    //           and personalized service, ensuring that each transaction is smooth
    //           and successful.
    //         </p>
    //       </div>
    //       <div className="w-1/2 text-center">
    //         <img
    //           src={value}
    //           alt=""
    //           className="max-h-[320px] mx-auto rounded-[16px]"
    //         />
    //       </div>
    //     </div>
    //     {/* <div className="flex bg-blur h-[400px] items-center rounded-[16px] ">
    //       <div className="w-1/2 text-center">
    //         <img
    //           src={service}
    //           alt=""
    //           className="rounded-[16px] max-h-[320px] mx-auto"
    //         />
    //       </div>
    //       <div className="w-1/2 flex flex-col items-center">
    //         <h1 className="font-semibold font-alice text-3xl">SERVICEs</h1>
    //         <p className="text-xl font-alice mt-4 max-w-[580px]">
    //           <ul>
    //             <li>
    //               Buying: Whether you&apos;re a first-time homebuyer or a
    //               seasoned investor, we can help you find the perfect property.
    //               From conducting property searches to negotiating offers and
    //               handling paperwork, we&apos;ll be with you every step of the
    //               way.
    //             </li>
    //             <li>
    //               Selling: Looking to sell your home or property? Our team will
    //               create a customized marketing strategy to showcase your
    //               property to potential buyers and maximize its exposure in the
    //               market. We&apos;ll handle all aspects of the selling process,
    //               from staging and photography to negotiations and closing.
    //             </li>
    //             <li>
    //               Renting: Need assistance with finding a rental property? We
    //               can help you locate rental listings that meet your criteria,
    //               schedule viewings, and navigate the rental application
    //               process.
    //             </li>
    //           </ul>
    //         </p>
    //       </div>
    //     </div> */}
    //   </section>
    // </div>

    // <div className="mt-[96px]">
    //   <div className="relative">
    //     <img
    //       src={topImage}
    //       alt=""
    //       className="w-full object-cover h-[300px] sm:h-[370px]"
    //     />
    //     <div className="absolute z-[1] text-black top-[30%] sm:top-[40%] right-0 pr-[24px] sm:pr-[36px] text-[30px] sm:text-[46px] font-bold font-alice">
    //       <h2 className="text-center">
    //         Defined by Service <br /> & Expertise
    //       </h2>
    //     </div>
    //   </div>
    //   <h1 className="text-center text-2xl sm:text-4xl my-4 sm:my-8 font-alice font-semibold">
    //     One Team. One Goal.
    //   </h1>
    //   <section className="px-4 sm:px-[120px] flex flex-col gap-y-4 sm:gap-y-[80px] mb-10 sm:mb-20">
    //     <div className="flex bg-blur h-[250px] sm:h-[400px] items-center rounded-[16px] ">
    //       <div className="w-full sm:w-1/2 text-center">
    //         <img
    //           src={mordenHouse}
    //           alt=""
    //           className="rounded-[16px] w-full max-h-[250px] sm:max-h-[320px] mx-auto"
    //         />
    //       </div>
    //       <div className="w-full sm:w-1/2 flex flex-col items-center">
    //         <h1 className="font-semibold font-alice text-xl sm:text-3xl">
    //           MODERN HOUSE
    //         </h1>
    //         <p className="text-sm sm:text-base font-alice mt-2 sm:mt-4 max-w-[320px] sm:max-w-[580px]">
    //           Welcome to MODERN HOUSE - Your Trusted Partner in Real Estate! At
    //           MODERN HOUSE, we understand the importance of finding the perfect
    //           home or property to suit your needs. Whether you are in search of
    //           your dream home, an investment property, or a rental space, we are
    //           here to guide you every step of the way.
    //         </p>
    //       </div>
    //     </div>
    //     <div className="flex bg-blur h-[250px] sm:h-[400px] items-center rounded-[16px]">
    //       <div className="w-full sm:w-1/2 flex flex-col items-center">
    //         <h1 className="font-semibold font-alice text-xl sm:text-3xl">
    //           MISSIONs
    //         </h1>
    //         <p className="text-sm sm:text-base font-alice mt-2 sm:mt-4 max-w-[320px] sm:max-w-[580px]">
    //           Our mission at MODERN HOUSE is to simplify the process of buying,
    //           selling, or renting real estate properties. We strive to provide
    //           our clients with the highest level of professionalism, integrity,
    //           and personalized service, ensuring that each transaction is smooth
    //           and successful.
    //         </p>
    //       </div>
    //       <div className="w-full sm:w-1/2 text-center">
    //         <img
    //           src={value}
    //           alt=""
    //           className="w-full max-h-[250px] sm:max-h-[320px] mx-auto rounded-[16px]"
    //         />
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <div className="md:mt-[96px] mobile:mt-20">
      <div className="relative   ">
        <img
          src={topImage}
          alt=""
          className="w-full object-cover h-[300px] sm:h-[400px] brightness-50 "
        />
        <div
          className="absolute top-0 left-0 right-0
    bottom-0 flex flex-col justify-center items-center text-[24px] sm:text-[46px] font-bold font-alice"
        >
          <h2 className="text-center leading-[1.1] text-white">
            Defined by Service <br /> & Expertise
          </h2>
        </div>
      </div>
      <h1 className="text-center text-xl sm:text-4xl my-4 sm:my-8 font-alice font-semibold">
        One Team. One Goal.
      </h1>
      <section className="px-4 sm:px-[120px] flex flex-col gap-y-4 sm:gap-y-[80px] mb-10 sm:mb-20">
        <div className="flex md:flex-row mobile:flex-col bg-blur mobile:min-h-[330px] items-center rounded-[16px] p-3 gap-x-2 ">
          <div className="w-full sm:w-1/2 text-center">
            <img
              src={mordenHouse}
              alt=""
              className="rounded-[16px] w-full mx-auto"
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col items-center">
            <h1 className="font-semibold font-alice text-lg sm:text-3xl m-0">
              MODERN HOUSE
            </h1>
            <p className="text-sm sm:text-base font-alice ">
              Welcome to MODERN HOUSE - Your Trusted Partner in Real Estate! At
              MODERN HOUSE, we understand the importance of finding the perfect
              home or property to suit your needs. Whether you are in search of
              your dream home, an investment property, or a rental space, we are
              here to guide you every step of the way.
            </p>
          </div>
        </div>
        <div className="flex md:flex-row mobile:flex-col bg-blur mobile:min-h-[330px] items-center rounded-[16px] p-3 gap-x-2">
          <div className="w-full sm:w-1/2 flex flex-col items-center">
            <h1 className="font-semibold font-alice text-lg sm:text-3xl m-0">
              MISSIONs
            </h1>
            <p className="text-sm sm:text-base font-alice">
              Our mission at MODERN HOUSE is to simplify the process of buying,
              selling, or renting real estate properties. We strive to provide
              our clients with the highest level of professionalism, integrity,
              and personalized service, ensuring that each transaction is smooth
              and successful.
            </p>
          </div>
          <div className="w-full sm:w-1/2 text-center">
            <img src={value} alt="" className="rounded-[16px] w-full mx-auto" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage
