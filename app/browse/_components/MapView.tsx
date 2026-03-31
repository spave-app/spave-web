import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import styles from "./MapView.module.css";

export default function MapView({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
      <Image
        src="/map_placeholder.png"
        alt="Map"
        fill
        style={{ objectFit: "cover" }}
      />
      <button className={styles.closeBtn} onClick={onClose}>
        Close Map
        <ChevronsRight size={15} className={styles.closeBtnIcon} />
      </button>
    </div>
  );
}
