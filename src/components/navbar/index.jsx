import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam , handleSubmit } = useContext(GlobalContext);

  console.log(searchParam);

  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0 font-serif">
      <h2 className="text-2xl font-bold text-black">
        <div className="h-20 overflow-hidden rounded-xl group justify-evenly flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1786/1786669.png"
            alt="logo"
            className="w-20 h-20 object-cover block group-hover:scale-105 duration-300"
          />
          <NavLink to={"/"}>Nutritionix</NavLink>
        </div>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
          placeholder="Enter Ingredient"
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
        />
      </form>
      <ul className="flex gap-10">
        <li>
          <NavLink
            to={"/"}
            className="text-black text-2xl font-semibold hover:text-gray-700 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/customized"}
            className="text-black text-2xl font-semibold hover:text-gray-700 duration-300"
          >
            Customized
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}