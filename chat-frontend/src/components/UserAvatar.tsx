import randomColor from "randomcolor";

interface UserAvatarProps {
  image?: string;
  userName: string;
  size?: "sm" | "md" | "lg";
}

const UserAvatar = ({ image, userName, size = "md" }: UserAvatarProps) => {
  return (
    <div className={`rounded-full overflow-hidden ${size === "md" ? "w-[50px] h-[50px]" : size === "lg" ? "w-[90px] h-[90px]" : "w-[25px] h-[25px]"} flex justify-center items-center bg-mixed-400`} style={{ background: randomColor() }}>
      {image ?
        <img className="object-cover w-full h-full" src={image} alt={userName} /> :
        <b className={`${size === "md" ? "text-2xl" : size === "lg" ? "text-5xl" : "text-lg"}`}>{userName[0]}</b>}
    </div>
  )
}

export default UserAvatar