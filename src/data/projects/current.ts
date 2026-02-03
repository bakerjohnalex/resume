export const currentData = {
  metadata: {
    title: "Current - Selected Work",
    description: "Landing page for the Current selected work.",
  },
  title: "Current",
  summary:
    "We have had an ongoing project at BD for nearly 20 years, and I am currently working at the leading edge of its development. Below is a high-level overview of the project and my specific contributions.",
  images: [
    {
      src: "/current1.jpeg",
      alt: "Current preview image one",
    },
    {
      src: "/current2.jpeg",
      alt: "Current preview image two",
    },
    {
      src: "/current3.jpeg",
      alt: "Current preview image three",
    },
    {
      src: "/me.jpg",
      alt: "Current preview image four",
    },
  ],
  about: [
    
    "RF Communication",
    "The core requirement was reliable, low-power wireless communication between two devices in outdoor environments. Key constraints included extremely low power consumption, very low data rates, and high reliability. Operating distances were short (under 100 m). Latency was important, though delays on the order of a few milliseconds were acceptable.",
    "Standard Bluetooth performed adequately in controlled environments such as my garage, where much of the early engineering work took place, but proved unreliable in electrically noisy environments like climbing gyms. After evaluating several options, I ultimately selected a Bluetooth 5–based solution using a specific chipset. While this approach was close to the edge of acceptable performance, it proved sufficiently reliable to support a robust prototype and allow continued development.",
    "Bluetooth 6 was not available at the time, but its new ranging and sounding capabilities appear promising and may enable a more reliable future platform. I also evaluated several LoRa-based solutions, which performed very well from a communication standpoint; however, their power consumption and packaging constraints significantly complicated the prototype and would have posed challenges for a viable product. All Bluetooth firmware ran on small embedded devices and was written by me with assistance from GPT-4.",
    "Microcontroller",
    "An Arduino Nano was sufficient for most of the project, though I also used an ESP32 in cases where additional processing capability was needed on the client side. This was my first experience programming an Arduino with the assistance of a large language model, and it proved remarkably effective. I performed most prototyping and simulation work in Python, then used ChatGPT to help port the code to C for deployment on the microcontroller. What would traditionally have taken roughly a week was completed in a single afternoon, significantly accelerating iteration.",
    "Hardware",
    "Hardware design is my primary area of expertise. I leveraged over 14 years of experience to iterate rapidly through cycles of CAD, fabrication, and assembly. This included designing components for CNC machining, 3D printing, laser cutting, laser cutting with bending, RTV molding, and prototype injection molding. While I cannot share detailed specifics, the hardware includes automatically actuating rope clamps with significant ergonomic considerations. The images above provide a limited preview.",
    "Testing",
    "Hands-on testing of prototypes has been a critical part of the development process. I am experienced in using an Instron for strength testing, building pneumatic systems for fatigue testing, operating a drop tower, and conducting bench-level “desk testing.” I have also performed field testing, which is invaluable, though it requires discipline to avoid bias and to prioritize feedback from external testers over personal assumptions.",
  ],
} as const;
