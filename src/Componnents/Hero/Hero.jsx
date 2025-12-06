import React from "react";
import HeroSlider from "./HeroSlider";

const Hero = () => {
  // const axiosSecure = useAxiosSecurity();
  // const { data: meals = [] } = useQuery({
  //   queryKey: ["meals"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/meals");
  //     return res.data;
  //   },
  // });

  return (
    <div>
      <HeroSlider></HeroSlider>
    </div>
  );
};

export default Hero;
