# Simple Image Inpainting Widget

This project is a simple image inpainting widget built with **react-canvas-draw** and **Next.js**. It allows users to upload an image, draw on it, and generate a mask.

## How to Run the Project Locally

1. Clone the repository to your local machine using ```git clone https://github.com/Vishvsalvi/canvas-assignment.git```.

2. Navigate to the project directory:

3. Run ```npm i``` and ```npm run dev```

4. Open your browser and go to localhost:3000

## Challanges faced

1. React-canvas-draw installation, the project is not maintained anymore so it has to be forced install under react 18.1.0

   Solution: Checked the issues in their github repository
![{637BD924-AEE6-497C-934B-102CC51306C3}](https://github.com/user-attachments/assets/7b1c5f5b-e14f-4475-94e3-bb677fe11339)

2. Getting the masked image, I knew there was application of useRef here but could quite get exact color and orientation of the mask to the image

   Solution: I used AI to figure out the orientation of the mask to the image
