export const sliderSettings = {
   centerMode: true,
   infinite: false,
   centerPadding: "4%",
   slidesToShow: 1,
   speed: 400,
   dots: false,
   responsive: [
      {
         breakpoint: 1000,
         settings: {
            centerPadding: "40px",
         },
      },
      {
         breakpoint: 600,
         settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1,
            centerPadding: "30px",
         },
      },
      {
         breakpoint: 400,
         settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1,
            centerPadding: "20px",
         },
      },
      {
         breakpoint: 320,
         settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1,
            centerPadding: "10px",
         },
      },
   ],
};
