import AvatarItem from "./components/avatar";
import { useApp, AppProvider } from "./components/provider";
import styles from "./app.module.css";
interface ValueBlockProps {
  label: string;
  onChange: (value: number) => void;
  value: number;
}

const ValueBlock = ({ label, onChange, value }: ValueBlockProps) => {
  return (
    <div className={styles.block}>
      <div>{label}:</div>
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
  return (
    <AppProvider>
      <div>
        <div className={styles.bar}>
          <ValueBlock
            label="size"
            onChange={(v) => setState({ size: v || 32 })}
            value={size}
          />
          <ValueBlock
            value={amount}
            label="items"
            onChange={(v) => setState({ amount: v })}
          />
        </div>
        <div className={styles.list_wrap}>
          <div
            className={styles.list}
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
            }}
          >
            {new Array(amount || 1).fill(0).map((_, index) => (
              <AvatarItem key={index} size={size} />
            ))}
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
