import { useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [visibale, setVisible] = useState(true)
  return (
    <div className="App">
      <div className='App-header'>
        <motion.button
          drag = "x"
          layout
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: '15deg' }}
          transition={{ type: 'spring', stiffness:400, damping:7 }}
          style={{
            margin: 50,
            padding: 10,
            border: 'none',
            backgroundColor: 'red',
            color: 'white',
          }}
          onClick={() => {
            setVisible(!visibale)
          }}
        >click here</motion.button>
        <div style={{ display: 'flex' }}>
          <AnimatePresence mode='popLayout'>
            {
              visibale && <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                initial={{ rotate: '0deg', scale: 0 }}
                animate={{ rotate: '360deg', scale: 1 }}
                exit={{ rotate: '0deg', scale: 0 }}

                transition={{
                  duration: 1,
                  // type:'spring',
                  ease: 'backInOut'
                }}
                style={{
                  width: 200,
                  height: 200,
                  backgroundColor: '#51e014',
                  transition: 'background-color 1s,border-radius 1s',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <p style={{ color: "black" }}>BOX</p>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
