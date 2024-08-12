
const Navbar = () => {
  return (
    <nav className=" w-full flex justify-around h-12 items-center text-white">
        <div className="logo text-xl font-bold flex items-center">
            <div className="px-2"><img width={30} src="/eyes.png" alt="" /></div>
            Pass<span className="text-purple-500">Man</span>
            </div>
        <button className="gitbtn hover:bg-purple-500 hover:scale-105 bg-purple-800 px-3 flex gap-2 items-center py-1 rounded-full">
            <img className="invert" width={20} src="/Icons/github (1).png" alt="" />Github</button>
    </nav>
  )
}

export default Navbar
