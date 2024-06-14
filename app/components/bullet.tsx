interface bullet {
  color: string;
}
export function Bullet({ color }: bullet) {
  return (
    <div className="w-8 h-8 rounded-2xl p-2 bg-[#14141714] relative -top-2">
      <span
        className={`w-full h-full rounded-xl block`}
        style={{
          backgroundColor: color,
        }}
      ></span>
    </div>
  );
}
