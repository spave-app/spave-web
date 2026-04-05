"use client";

import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { useT } from "../../i18n/LanguageContext";
import styles from "./MapView.module.css";

export default function MapView({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useT();
  return (
    <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
      <Image
        src="/map_placeholder.png"
        alt="Map"
        fill
        style={{ objectFit: "cover" }}
      />
      <button className={styles.closeBtn} onClick={onClose}>
        {t.map.close}
        <ChevronsRight size={15} className={styles.closeBtnIcon} />
      </button>
    </div>
  );
}
