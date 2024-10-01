import useAvatar from "./useAvatar";
import styles from "./avatar.module.css";

const AvatarItem = ({ size }: { size: number }) => {
  const { imgs } = useAvatar();
  return (
    <div className={styles.img} style={{ width: size, height: size }}>
      {imgs &&
        imgs.length > 0 &&
        imgs.map((item: string, index: number) => (
          <div className={styles.imgbox} key={index}>
            <img src={item} alt="avatar" />
          </div>
        ))}
    </div>
  );
};

export default AvatarItem;
