import { IconContext } from "react-icons";

function DashboardCard({ title, value, icon, color = "bg-blue-600" }) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-6
      flex
      justify-between
      items-center"
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>

        <h1 className="text-4xl font-bold mt-2">{value}</h1>
      </div>

      <div
        className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl`}
      >
        <IconContext.Provider value={{ size: "30" }}>
          {icon}
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default DashboardCard;
