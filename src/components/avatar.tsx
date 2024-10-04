import { forwardRef } from "react";
import useAvatar from "./useAvatar";
import styles from "./avatar.module.css";
interface AvatarItemProps {
  size: number;
}

const AvatarItem = forwardRef<HTMLDivElement, AvatarItemProps>(
  ({ size }, ref) => {
    const { imgs } = useAvatar();
    return (
      <div
        className={styles.img}
        style={{ width: size, height: size }}
        ref={ref}
      >
        {imgs && imgs.length > 0 && (
          <>
            {imgs.map((item: string, index: number) => (
              <div className={styles.imgbox} key={index}>
                <img src={item} alt="avatar" />
              </div>
            ))}
          </>
        )}
        <div className={styles.info}>
          <div>name:#{+1} </div>

          {imgs.map(item => {
            console.log(`item::`, item);
            return (
              <div key={item} className={styles.img_info}>
                <div>{item && item.split("/").pop()?.split("=")[0]}: </div>
                {item && item.split("/").pop()?.split("=")[1].split(".")[0]}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default AvatarItem;
