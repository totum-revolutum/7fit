import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginModal.module.scss";
import useAuthStore from "@stores/authStore";
import useUIStore from "@stores/uiStore";

const LoginModal = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState("");
  const { login, register, loading, error, user, role } = useAuthStore();
  const closeLogin = useUIStore((state) => state.closeLogin);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Будь ласка, заповніть всі поля.");
      return;
    }

    if (mode === "register" && !agreed) {
      alert("Будь ласка, підтвердіть користувацьку угоду.");
      return;
    }

    if (mode === "login") {
      await login(email, password);
    } else {
      await register(email, password);
    }
  };

  useEffect(() => {
    if (user && role) {
      closeLogin();

      // Перенаправлення залежно від ролі
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate(`/profile/${user.id}`, { replace: true });
      }

      // Очищення форми
      setEmail("");
      setPassword("");
    }
  }, [user, role, closeLogin, navigate]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeLogin();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div ref={modalRef} className={styles.modal}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>
            {mode === "login" ? "Вхід до акаунту" : "Реєстрація"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />

          {mode === "register" && (
            <div className={styles.checkboxAgreement}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              Я погоджуюсь з{" "}
              <Link
                to="/agreement"
                className={styles.checkboxAgreement__link}
                onClick={closeLogin}
              >
                користувацькою угодою
              </Link>
            </div>
          )}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading
              ? "Завантаження..."
              : mode === "login"
              ? "Увійти"
              : "Зареєструватися"}
          </button>

          <p className={styles.switch}>
            {mode === "login" ? (
              <>
                Ще не маєте акаунту?{" "}
                <button type="button" onClick={() => setMode("register")}>
                  Зареєструйтесь
                </button>
              </>
            ) : (
              <>
                Вже маєте акаунт?{" "}
                <button type="button" onClick={() => setMode("login")}>
                  Увійдіть
                </button>
              </>
            )}
          </p>
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="button"
            onClick={closeLogin}
            className={styles.closeButton}
          >
            ×
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
