'use client'

import React, { useState, useRef, useEffect } from 'react'
import CanvasDraw from "react-canvas-draw"

export default function SimpleImageInpainting() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [maskImage, setMaskImage] = useState<string | null>(null)
  const [brushSize, setBrushSize] = useState(10)
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 })
  
  const canvasRef = useRef<CanvasDraw | null>(null)
  const combinedImageRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setCanvasSize({ width: img.width, height: img.height })
        }
        img.src = event.target?.result as string
        setBackgroundImage(img.src)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearCanvas = () => {
    canvasRef.current?.clear()
    setMaskImage(null)
  }

  const exportMask = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.canvasContainer.children[1]
      const maskDataUrl = canvas.toDataURL()
      setMaskImage(maskDataUrl)
    }
  }

  useEffect(() => {
    if (backgroundImage && maskImage && combinedImageRef.current) {
      const canvas = combinedImageRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          
          const maskImg = new Image()
          maskImg.onload = () => {
            ctx.globalCompositeOperation = 'source-atop'
            ctx.drawImage(maskImg, 0, 0, img.width, img.height)
          }
          maskImg.src = maskImage
        }
        img.src = backgroundImage
      }
    }
  }, [backgroundImage, maskImage])

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      
      <div className="flex space-x-4 mb-4">
        <label>
          Brush Size:
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="ml-2"
          />
        </label>
        <button onClick={clearCanvas} className="px-4 py-2 bg-red-500 text-white rounded">Clear Mask</button>
        <button onClick={exportMask} className="px-4 py-2 bg-blue-500 text-white rounded">Export Mask</button>
      </div>
      
      <div className="relative">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        )}
        <CanvasDraw
          ref={canvasRef}
          brushColor="white"
          brushRadius={brushSize}
          canvasWidth={canvasSize.width}
          canvasHeight={canvasSize.height}
          className="border border-gray-300"
        />
      </div>
      
      <div className="flex space-x-4 mt-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Original Image</h3>
          {backgroundImage ? (
            <img src={backgroundImage} alt="Original" className="max-w-xs border border-gray-300" />
          ) : (
            <div className="w-[500px] h-[500px] bg-gray-200 flex items-center justify-center border border-gray-300">
              <p className="text-gray-500">Upload an image to start</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Mask Image</h3>
          {backgroundImage && maskImage ? (
            <canvas ref={combinedImageRef} className="max-w-xs border border-gray-300" />
          ) : (
            <div className="w-[500px] h-[500px] bg-gray-200 flex items-center justify-center border border-gray-300">
              <p className="text-gray-500">Mask will appear here after export</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

