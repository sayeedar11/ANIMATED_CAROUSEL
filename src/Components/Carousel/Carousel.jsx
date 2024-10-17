import React, { useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const images = [
    'https://i.pinimg.com/736x/8c/b2/2d/8cb22d8ead9b13c226cbff599b35331c.jpg',
    'https://i.pinimg.com/564x/fc/13/53/fc13532303cfd8f4f32c1c3ed68aa1f2.jpg',
    'https://i.pinimg.com/564x/21/4b/9f/214b9f7f0b4f0bed76cb0863643cfa3b.jpg',
    'https://i.pinimg.com/564x/63/95/91/639591fe09835f63e26b12e380457b51.jpg',
    'https://i.pinimg.com/564x/f1/e0/a7/f1e0a7a79352c0aac4a88bfd5894a759.jpg',
    'https://i.pinimg.com/564x/51/a5/5b/51a55bc62da84e0e9b4795afa185ce79.jpg',
    'https://i.pinimg.com/564x/38/07/17/3807171606bbeeb95d51449691a6686c.jpg',
    'https://wallpaperbat.com/img/907415-artistic-landscape-hd-wallpaper-and-background.png',
    'https://wallpaperbat.com/img/907450-4k-wallpaper-nature-landscape-sunset-valley.png',
    'https://www.pixelstalk.net/wp-content/uploads/images6/Minimalist-Wallpaper-4K-HD-Free-download.jpg'
]

const BUFFER_DRAG = 25;

const Carousel = () => {
    const [dragging, setDragging] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const dragX = useMotionValue(0);

    const onDragStart = () => {
        setDragging(true)
    }
    const onDragEnd = () => {
        setDragging(false)
        const x = dragX.get()
        if (x <= -BUFFER_DRAG && imageIndex < images.length - 1) {
            setImageIndex(pv => pv + 1);
        } else if (x >= BUFFER_DRAG && imageIndex > 0) {
            setImageIndex(pv => pv - 1);
        }
    }

    const leftArrow = () => {
        if (imageIndex > 0) {
            setImageIndex(pv => pv - 1);
        }
    }
    const rightArrow = () => {
        if (imageIndex < images.length - 1) {
            setImageIndex(pv => pv + 1);
        }
    }
    return (
        <div style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100vh',
            backgroundColor: '#000',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        }}>
            <button
                onClick={leftArrow}
                style={{
                    fontSize: '1rem',
                    padding: '10px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '5px',
                    color: '#FFF'
                }}
            >{<i class="fa-solid fa-angle-left"></i>}</button>
            <div
                drag="x"
                style={{
                    display: 'flex',
                    width: '70%',
                    overflow: 'hidden',
                    borderRadius: '10px',
                }}>
                <motion.div
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    animate={{
                        translateX: `${-imageIndex * 100}%`,
                    }}
                    transition={{
                        duration: 0.75,
                    }}
                    style={{
                        display: 'flex',
                        width: '100%',
                        x: dragX,
                    }}

                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                >
                    <Images imageIndex={imageIndex} />
                </motion.div>
            </div>
            <button
                onClick={rightArrow}
                style={{
                    fontSize: '1rem',
                    padding: '10px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '5px',
                    color: '#FFF',
                }}>{<i class="fa-solid fa-angle-right"></i>}</button>


            <Buttons imageIndex={imageIndex} setImageIndex={setImageIndex}/>
        </div>
    )
}

export default Carousel

const Images = ({ imageIndex }) => {
    return (
        <>
            {
                images.map((imageSrc, index) => {
                    return (
                        <motion.div
                            key={index}
                            style={{
                                backgroundImage: `url(${imageSrc})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                minWidth: '100%',
                                aspectRatio: '16/9',
                                borderRadius: '10px',
                                scale: 0.95
                            }}

                            animate={{
                                scale: imageIndex === index ? [0, 1] : [1, .5]
                                // y:imageIndex === index ? 0 : -500,
                            }}

                            transition={{
                                duration: 0.75,
                            }}
                        />
                    )
                })
            }
        </>
    )
}

const Buttons = ({imageIndex, setImageIndex}) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 50,
            display:'flex',
            gap:'.5rem'
        }}>
            {
                images.map((imgSRC, index) => {
                    return (
                        <motion.div
                            animate={{
                                scale: imageIndex === index ? 1.3 : 1,
                                backgroundColor: imageIndex === index ? "white" : "gray",
                             }}
                             transition={{
                                duration:0.3
                             }}
                            style={{
                                height:5,
                                width:5,
                                borderRadius:'50%'
                            }}
                            onClick={() => {setImageIndex(index)}}
                        />
                    )
                })
            }
        </div>
    )
}