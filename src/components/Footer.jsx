// import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-slate-900 w-full flex justify-center absolute bottom-0">
        <span className="flex items-center text-xs text-white">Copyright &copy; {new Date().getFullYear()} |
            <h6 className="font-bold text-sm px-2">
            Pass<span className="text-purple-600">Man</span>
          </h6> | All Rights Reserved
          </span>
    </footer>
      
    </>
  )
}

export default Footer
