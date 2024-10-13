import { forwardRef } from "react";
import useAvatar from "./useAvatar";
import styles from "./avatar.module.css";
interface AvatarItemProps {
  size: number;
}

const AvatarItem = forwardRef<HTMLDivElement, AvatarItemProps>(
  ({ size }, ref) => {
    const { imgs, attr } = useAvatar();
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
                <img src={item} alt={JSON.stringify(attr)} />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
);

export default AvatarItem;
