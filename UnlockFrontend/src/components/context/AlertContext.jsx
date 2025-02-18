import toast from "react-hot-toast";
import { Alert } from "../ui/Alert"; // Import komponen Alert dari Alert.jsx

/**
 * Menampilkan toast menggunakan komponen Alert.
 * @param {string} message - Pesan yang akan ditampilkan.
 * @param {string} variant - Variant Alert (default, destructive, dll).
 * @param {object} options - Opsi tambahan untuk react-hot-toast.
 */
export const showAlertToast = (message, variant = "default", options = {}) => {
  toast.custom(
    (t) => (
      <Alert variant={variant} className="mb-2">
        {message}
      </Alert>
    ),
    options
  );
};