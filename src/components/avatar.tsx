import useAvatar from "./useAvatar";
import styles from "./avatar.module.css";
interface AvatarItemProps {
  size: number;
}

const AvatarItem: React.FC<AvatarItemProps> = ({ size }) => {
  const { imgs } = useAvatar();
  return (
    <div className={styles.img} style={{ width: size, height: size }}>
      {imgs && imgs.length > 0 && (
        <>
          {imgs.map((item: string, index: number) => (
            <div className={styles.imgbox} key={index}>
              <img src={item} alt="avatar" />
            </div>
          ))}
          <div className={styles.info}>
            {imgs.map((item: string) => (
              <div key={item}>{item.split("/").pop()?.split('=')[0]}:{item.split("/").pop()?.split('=')[1]}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarItem;
