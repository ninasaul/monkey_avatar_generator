import AvatarItem from "./components/avatar";
import { useApp } from "./components/provider";
import styles from "./app.module.css";
import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import logo from "./assets/logo.png";
interface ValueBlockProps {
  label: string;
  onChange: (value: number) => void;
  value: number;
}

const ValueBlock = ({ label, onChange, value }: ValueBlockProps) => {
  return (
    <div className={styles.block}>
      <div>{label}</div>
      <div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
      </div>
    </div>
  );
};

function App() {
  const { state, setState } = useApp();
  const { size, amount } = state;
  const avatarRefs = useRef<HTMLDivElement[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const captureImages = async () => {
    if (avatarRefs.current && avatarRefs.current.length === 0) return;
    const zip = new JSZip();
    const imgFolder = zip.folder("images");
    setLoading(true);
    for (let i = 0; i < avatarRefs.current.length; i++) {
      if (avatarRefs.current[i]) {
        avatarRefs.current[i].classList.add(styles.capture);
        const canvas = await html2canvas(avatarRefs.current[i]);
        const imgData = canvas.toDataURL("image/png");
        const imgBase64 = imgData.split(",")[1];
        setTotal(i + 1);
        imgFolder?.file(`avatar_${i + 1}.png`, imgBase64, { base64: true });
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    setLoading(false);
    setTotal(1);
    saveAs(zipBlob, "avatars.zip");
  };

  return (
    <>
      {total > 0 && (
        <>
          <div
            className={styles.loadings}
            style={{ width: size + 40, height: size + 40 }}
          />
          <div className={styles.loadings_bg} />
        </>
      )}
      <div className={styles.bar}>
        <div className={styles.bar_title}>
          <h1>
            <AvatarItem size={40} />
          </h1>
          <ValueBlock
            label="size"
            onChange={(v: number) => setState({ size: v || 32 })}
            value={size}
          />
          <ValueBlock
            value={amount}
            label="items"
            onChange={(v: number) => setState({ amount: v })}
          />
        </div>
        <div className={styles.bar_title}>
          {loading ? (
            `In progress....${total}/${amount}...`
          ) : (
            <button onClick={captureImages}>Download</button>
          )}
        </div>
      </div>
      <div className={styles.list_wrap}>
        <div
          className={styles.list}
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
          }}
        >
          {new Array(amount || 1).fill(0).map((_, index) => (
            <div
              key={index}
              className={styles.boxs}
              ref={(el) => (avatarRefs.current[index] = el!)}
            >
              <AvatarItem size={size} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
